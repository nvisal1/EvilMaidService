import { Blog } from "../types/blog";

export interface DataStore {
    createBlog(): Promise<void>;
    editBlog(): Promise<void>;
    deleteBlog(): Promise<void>;
    getBlogs(): Promise<Blog[]>;
    getBlog(): Promise<Blog>;
}