import axiosClient from "./axiosClient";

class ChapterApi {
    constructor() {
        this.api = "chapter/";
    }

    search = (subjectId, classId, keyword, page, limit) => {
        const url = `${this.api}search`;
        const body = {
            keyword: keyword || "",
            page: page || 1,
            limit: limit || 32,
            subjectId: subjectId || null,
            classId: classId,
        };
        return axiosClient.post(url, body);
    };
    delete = async (id, set) => {
        const url = `${this.api}delete`;
        const body = {id: id};
        try {
            const res = await axiosClient.post(url, body);
            set(res);
            return res;
        } catch (error) {
            return error;
        }
    };
    add = async (subjectId, name, code, units) => {
        const url = `${this.api}add`;
        const body = {subjectId: subjectId, name: name, code: code, units: units};
        return await axiosClient.post(url, body);
    };

    detail = (id) => {
        const url = `${this.api}detail`;
        const body = {id: id};
        return axiosClient.post(url, body);
    };
    update = (id, name) => {
        const url = `${this.api}update`;
        const body = {id: id, name: name};
        return axiosClient.post(url, body);
    };

    async allCount(subjectId, classId, keyword, page, limit) {
        const url = `${this.api}all-count`;
        const body = {
            keyword: keyword || "",
            page: page || 1,
            limit: limit || 32,
            subjectId: subjectId || null,
            classId: classId,
        };
        return axiosClient.post(url, body);
    };
}

const chapterApi = new ChapterApi();

export default chapterApi;
