import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function checkFollowApi(idUser) {
    const url = `${API_HOST}/consult_relation?id=${idUser}`;
    const params = {
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function followUserApi(idUser) {
    const url = `${API_HOST}/high_relation?id=${idUser}`;
    const params = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}

export function unfollowUserApi(idUser) {
    const url = `${API_HOST}/low_relation?id=${idUser}`;
    const params = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params)
        .then(response => {
            return response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        });
}