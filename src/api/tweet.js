import { API_HOST } from "../utils/constants";
import { getTokenApi } from "./auth";

export function addTweetApi(message) {
    const url = `${API_HOST}/tweet`;
    const data = {
        message
    };
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getTokenApi()}`,
        },
        body: JSON.stringify(data)
    };
    return fetch(url, params)
        .then((response) => {
            return response.status >= 200 && response.status < 300 ?
                { code: response.status, message: "Tweet enviado" } :
                { code: 500, message: "Error del servidor" };
        })
        .catch((err) => {
            return err;
        });
}

export function getUserTweetApi(idUser, page) {
    const url = `${API_HOST}/read_tweets?id=${idUser}&page=${page}`;
    const params = {
        headers: {
            "Content-Type": "application-json",
            Authorization: `Bearer ${getTokenApi()}`
        }
    }
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return err;
        });
}

export function getTweetsFollowersApi(page = 1) {
    const url = `${API_HOST}/read_followers_tweets?page=${page}`;
    const params = {
        headers: {
            "Content-Type": "application-json",
            Authorization: `Bearer ${getTokenApi()}`,
        }
    };
    return fetch(url, params)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            return err;
        })
}