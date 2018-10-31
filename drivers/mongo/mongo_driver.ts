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
            this.mongoClient = await MongoClient.connect(dbURI);
            this.db = this.mongoClient.db();
        } catch (e) {
            return Promise.reject(
                'Problem connecting to database at ' + dbURI + ':\n\t' + e,
            );
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

    async getBlogs(): Promise<Blog[]> {
        try {
            // Fetch every blog from the blogs collection
            const blogsCursor = await this.db.collection<Blog>('blogs').find();
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
            await this.db.collection<User>('user').insert(user);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}