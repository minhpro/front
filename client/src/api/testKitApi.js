import axiosClient from "./axiosClient";

class TestKitApi {
    constructor() {
        this.api = "test-kit/";
    }

    add = (body) => {
        const url = `${this.api}add`;
        return axiosClient.post(url, body);
    };

    delete = (id) => {
        const url = `${this.api}delete`;
        return axiosClient.post(url, {id: id});
    };
    generate = (testId, numberOfQuestions, numberOfTests) => {
        const url = `${this.api}generate`;
        const body = {
            testId: testId,
            numberOfQuestions: numberOfQuestions,
            numberOfTests: numberOfTests,
        };

        return axiosClient.post(url, body);
    };
    search = (
        keyword,
        page,
        limit,
        testTypeId,
        testMatrixId,
        classId,
        subjectId,
        from,
        to
    ) => {
        const url = `${this.api}search`;
        const body = {
            keyword,
            page,
            limit,
            testTypeId,
            testMatrixId,
            classId,
            subjectId,
            updateTime: {
                from,
                to,
            },
        };
        return axiosClient.post(url, body);
    };

    getExam = (id) => {
        const url = `${this.api}get-exam-questions`;
        return axiosClient.get(url, {params: {id: id}});
    };
    checking = (body) => {
        const url = `${this.api}submit`;
        return axiosClient.post(url, body);
    };

    async getDetail(id) {
      const url = `${this.api}detail`;
      return axiosClient.get(url, {params: {id: id}});
    }
}

const testKitApi = new TestKitApi();

export default testKitApi;
