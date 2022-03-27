import axiosClient from "./axiosClient";

class MatrixApi {
    constructor() {
        this.api = "test-matrix/";
    }

    search = (data) => {
        const url = `${this.api}search`;
        return axiosClient.post(url, data);
    };
    delete = async (id) => {
        try {
            const url = `${this.api}delete`;
            const body = {id: id};
            return await axiosClient.post(url, body);
        } catch (error) {
            return Promise.reject(error?.response?.data)
        }

    };

    add = async (data) => {
        try {
            const url = `${this.api}add`;
            return await axiosClient.post(url, data);
        } catch (error) {
            console.log("erorr day nay")
            console.log(error?.response?.data)
            return Promise.reject(error?.response?.data);
        }

    };
}

const matrixApi = new MatrixApi();

export default matrixApi;
