import { DataStore } from "../../interfaces/datastore";
import { Blog, User } from "../../types/blog";
import { MongoClient, Db } from "mongodb";

export class MongoDriver implements DataStore {

    private mongoClient: MongoClient;
    private db: Db;

    
    constructor(dburi: string) {
        this.connect(dburi)
    }

    private async connect(dbURI: string) {
        try {
            this.mongoClient = await MongoClient.connect(dbURI, { useNewUrlParser: true });
            this.db = this.mongoClient.db();
        } catch (e) {
            return Promise.reject(
                'Problem connecting to database at ' + dbURI + ':\n\t' + e,
            );
        }
    }

    async fetchSearchResults(
        query: Object
    ): Promise<Blog[]> {
        try {
            const blogsCursor = await this.db.collection<Blog>('blogs').find({query});
            const blogs = blogsCursor.toArray();
            return blogs;
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async createBlog(
        blog: Blog
    ): Promise<void> {
        try {
            await this.db.collection('blogs').insert(blog);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    
    async editBlog(
        blogId: String,
        blog: Blog
    ): Promise<void> {
        try {
            await this.db.collection('blogs').updateOne({_id: blogId}, blog);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async deleteBlog(
        blogId: String
    ): Promise<void> {
        try {
            await this.db.collection('blogs').deleteOne({_id: blogId});
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * 
     * @param query: Object - This is where our query will be injected!
     * THIS IS OUR VULNERABLE ROUTE!
     */
    async getBlogs(
        query?: Object
    ): Promise<Blog[]> {
        let blogsCursor;
        try {
            if (query) {
                // If the malicious query exists, inject it!
                blogsCursor = await this.db.collection<Blog>('blogs').find(query);
            } else {
                // Fetch every blog from the blogs collection
                blogsCursor = await this.db.collection<Blog>('blogs').find();
            }
            const blogs = blogsCursor.toArray();
            return blogs;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getUserBlogs(
        userId: String
    ): Promise<Blog[]> {
        try {
            const blogsCursor = await this.db.collection<Blog>('blogs').find({author: userId});
            const blogs = await blogsCursor.toArray();
            return blogs;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async getBlog(
        blogId: String
    ): Promise<Blog> {
        try {
            const blogCursor = await this.db.collection<Blog>('blogs').find({_id: blogId});
            const blogArray = await blogCursor.toArray();
            const blog = blogArray[0];
            return blog;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async register(
        user: User
    ): Promise<void> {
        try {
            await this.db.collection<User>('users').insert(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findUser(
        user: object
    ): Promise<any> {
        try {
            const result  = await this.db.collection<User>('users').find(
                {
                    username: user['username'], 
                    password: user['password']
                }
            ).toArray();

            if (result.length > 0) {
                return result[0];
            }
            return false;
            
        } catch (error) {
            return Promise.reject(error);
        }
    }
}