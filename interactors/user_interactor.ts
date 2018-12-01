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
    ): Promise<any> {
        try {
            const user = await dataStore.findUser(loginCreds);
            if (user === false) {
                return false;
            } else {
                const token = TokenManager.generateToken(user);
                delete user.password;
                delete user['_id'];
                return { token: token, user: user };
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // TODO: Can probably just remove cookie from within route driver
    static logout() {

    }
}