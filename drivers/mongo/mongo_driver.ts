import { DataStore } from "../../interfaces/datastore";
import { Blog } from "../../types/blog";


export class MongoDriver implements DataStore {
    createBlog(): Promise<void> {
        throw new Error("Method not implemented.");
    }    
    editBlog(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteBlog(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getBlogs(): Promise<Blog[]> {
        throw new Error("Method not implemented.");
    }
    getBlog(): Promise<Blog> {
        throw new Error("Method not implemented.");
    }


}