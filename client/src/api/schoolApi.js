import axiosClient from "./axiosClient";

const SCHOOL_API_PATH = "schools"

function getSchoolList() {
    return axiosClient.get(SCHOOL_API_PATH);
}

function getSchool(id) {
    return axiosClient.get(SCHOOL_API_PATH + "/" + id);
}

function createSchool(addSchoolContent) {
    return axiosClient.post(SCHOOL_API_PATH, addSchoolContent);
}

function deleteSchool(id) {
    return axiosClient.delete(SCHOOL_API_PATH + "/" + id);
}

function editSchool(id, editSchoolContent) {
    return axiosClient.put(SCHOOL_API_PATH + "/" + id, editSchoolContent);
}

export {
    getSchoolList,
    getSchool,
    createSchool,
    editSchool,
    deleteSchool
}