import axiosClient from "./axiosClient";

class TestRoom {
    constructor() {
        this.api = "test-room/";
    }


    add = (data) => {
        const url = `${this.api}add`;

        return axiosClient.post(url, data);
    };
    // detail = (id) => {
    //     const url = `${this.api}detail`;
    //     const body = {id: id};
    //     return axiosClient.post(url, id);
    // };
    // update = (body) => {
    //     const url = `${this.api}update`;
    //     // const body = { id: id };
    //     return axiosClient.post(url, body);
    // };
    //
    // approve(id) {
    //     const url = `${this.api}approve`;
    //     // const body = { id: id };
    //     return axiosClient.post(url, {
    //         id: id
    //     });
    // };
}

const testRoom = new TestRoom();

export default testRoom;
