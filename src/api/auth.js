import { API_HOST } from "../utils/constants";

export function signUpApi(user) {
    const url = `${API_HOST}/register`;
    const userTemp = {
        ...user,
        email: user.email.toLowerCase(),
        birthday: new Date()
    };
    delete userTemp.repeatPassword;
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userTemp),
    };
    return fetch(url, params)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            return { code: 404, message: "Correo electrónico no disponible" }
        }).then(result => {
            return result;
        }).catch(err => {
            return err;
        })
}