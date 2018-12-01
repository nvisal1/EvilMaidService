import { Blog, User } from "../types/blog";

export interface DataStore {
    fetchSearchResults(query: object): Promise<Blog[]>;
    createBlog(blog: Blog): Promise<void>;
    editBlog(blogId:String, blog: Blog): Promise<void>;
    deleteBlog(blogId: String): Promise<void>;
    getBlogs(): Promise<Blog[]>;
    getUserBlogs(username: String): Promise<Blog[]>;
    getBlog(blogId: String): Promise<Blog>;
    register(User: User): Promise<void>;
    findUser(loginCreds: object): Promise<User>;
}