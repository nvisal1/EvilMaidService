import { User } from "../types/blog";
import { DataStore } from "../interfaces/datastore";

export class UserInteractor {

    static register(
        dataStore: DataStore,
        newUser: User
    ): Promise<void> {
        try {
            dataStore.register(newUser);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static login(
        dataStore: DataStore,
        username: String,
        password: String
    ) {

    }

    // TODO: Can probably just remove cookie from within route driver
    static logout() {

    }
}