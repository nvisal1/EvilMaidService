import { Blog } from "../types/blog";
import { DataStore } from "../interfaces/datastore";


export class BlogInteractor {

    /**
     * INJECTION DATA FLOWS THROUGH HERE!
     * @param dataStore 
     * @param query THIS IS THE INJECTION QUERY
     */
    static getAllBlogs(
        dataStore: DataStore,
        query?: String
    ): Promise<Blog[]> {
        try {
            dataStore.getBlogs();
        } catch (error) {
            return Promise.reject(error);
        }
    }   

    static getUserBlogs(
        dataStore: DataStore,
        userId: String
    ): Promise<Blog[]> {
        try {
            dataStore.getUserBlogs(userId);
        } catch (error) {
            return Promise.reject(error);
        }
    }    
    
    static postBlog(
        dataStore: DataStore,
        blog: Blog
    ): Promise<void> {
        try {
            dataStore.createBlog(blog);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static editBlog(
        dataStore: DataStore,
        blog: Blog
    ): Promise<void> {
        try {
            const blogId = blog['id'];
            dataStore.editBlog(blogId, blog);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static deleteBlog(
        dataStore: DataStore,
        blogId: String
    ): Promise<void> {
        try {
            dataStore.deleteBlog(blogId);
        } catch (error) {
            return Promise.reject(error);
        }
    }
}