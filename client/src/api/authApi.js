import axiosClient from "./axiosClient";

class AuthApi {
    constructor() {
        this.api = "user/";
    }

    login = async (username, password) => {
        try {
            const url = `${this.api}login`;
            const body = {
                username: username,
                password: password,
            };
            return await axiosClient.post(url, body);
        } catch (error) {
            return error;
        }

    };
}

const authApi = new AuthApi();

export default authApi;
