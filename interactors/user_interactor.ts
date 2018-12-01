import { User } from "../types/blog";
import { DataStore } from "../interfaces/datastore";
import * as TokenManager from '../drivers/TokenManager';

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

    static async login(
        dataStore: DataStore,
        loginCreds: object
    ) {
        try {
            const user = await dataStore.findUser(loginCreds);
            if (user != null) {
                const token = TokenManager.generateToken(user);
                return { token, user: user };
            }
            return false;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // TODO: Can probably just remove cookie from within route driver
    static logout() {

    }
}