import React, { useState } from 'react'
import { Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validators";
import { signInApi, setTokenApi } from "../../api/auth";

import "./SignInForm.scss";

export default function SignInForm(props) {

    const { setShowModal, setRefreshCheckLogin } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signInLoading, setSignInLoading] = useState(false);

    const onSubmit = event => {
        event.preventDefault();
        let validCount = 0;
        values(formData).some(value => {
            value && validCount++;
            return null;
        });
        if (validCount !== size(formData)) {
            toast.warning("Complete todos los campos del formulario");
        } else {
            if (!isEmailValid(formData.email)) {
                toast.warning("Correo electrónico no válido");
            } else {
                setSignInLoading(true);
                signInApi(formData).then(response => {
                    if (response.message) {
                        toast.warning(response.message);
                    } else {
                        setTokenApi(response.token);
                        setShowModal(false);
                        setFormData(initialFormValue());
                        setRefreshCheckLogin(true);
                    }
                }).catch(err => {
                    // console.log(err);
                    toast.error("Error en el servidor, inténtelo más tarde");
                }).finally(() => {
                    setSignInLoading(false);
                });
            }
        }
    };

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <div className="sign-in-form">
            <h2>Ingresar</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        name="password"
                        defaultValue={formData.password}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    { !signInLoading ? "Iniciar sesión" : <Spinner animation="border" /> }
                </Button>
            </Form>
        </div>
    );
}

function initialFormValue() {
    return {
        email: "",
        password: "",
    }
}