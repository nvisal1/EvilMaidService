import { Blog } from "../types/blog";

export interface DataStore {
    createBlog(blog: Blog): Promise<void>;
    editBlog(blogId:String, blog: Blog): Promise<void>;
    deleteBlog(blogId: String): Promise<void>;
    getBlogs(): Promise<Blog[]>;
    getUserBlogs(username: String): Promise<Blog[]>;
    getBlog(blogId: String): Promise<Blog>;
}