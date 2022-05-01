import axiosClient from "./axiosClient";
import { SCHOOL_API_PATH } from "./schoolApi";

function getSchoolUserList(schoolId) {
    const url = SCHOOL_API_PATH + "/" + schoolId + "/users";
    return axiosClient.get(url);
}

function addSchoolUser(schoolId, userParam) {
    const url = SCHOOL_API_PATH + "/" + schoolId + "/users";
    return axiosClient.post(url, userParam);
}

function removeSchoolUser(schoolId, userId) {
    const url = SCHOOL_API_PATH + "/" + schoolId + "/users/" + userId;
    return axiosClient.delete(url);
}

function updateSchoolUser(schoolId, userId, userParam) {
    const url = SCHOOL_API_PATH + "/" + schoolId + "/users/" + userId;
    return axiosClient.put(url, userParam);
}

export {
    getSchoolUserList,
    addSchoolUser,
    updateSchoolUser,
    removeSchoolUser
}