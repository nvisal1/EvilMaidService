import { Blog } from "../types/blog";
import { DataStore } from "../interfaces/datastore";


export class BlogInteractor {

    static getAllBlogs(
        dataStore: DataStore
    ) {

    }

    static getUserBlogs(
        dataStore: DataStore,
        userId: String
    ) {

    }    
    
    static postBlog(
        dataStore: DataStore,
        blog: Blog
    ) {

    }

    static editBlog(
        dataStore: DataStore,
        editBlog: Blog
    ) {

    }

    static deleteBlog(
        dataStore: DataStore,
        blogId: String
    ) {
        
    }
}