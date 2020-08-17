import React, { useState } from 'react';
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validators";
import { signUpApi } from "../../api/auth";

import "./SignUpForm.scss";

export default function SignUpForm(props) {

    const { setShowModal } = props;
    const [formData, setFormData] = useState(initialFormValue());
    const [signUpLoading, setSignUpLoading] = useState(false);

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
            } else if (formData.password !== formData.repeatPassword) {
                toast.warning("Las contraseñas no coinciden");
            } else if (size(formData.password) < 6) {
                toast.warning("Las contraseña debe tener al menos seis caracteres");
            } else {
                setSignUpLoading(true);
                signUpApi(formData).then(response => {
                    if (response.code) {
                        toast.warning(response.message);
                    } else {
                        toast.success("El registro se completó satisfactoriamente");
                        setShowModal(false);
                        setFormData(initialFormValue());
                    }
                }).catch(() => {
                    toast.error("Error en el servidor, inténtelo más tarde");
                }).finally(() => {
                    setSignUpLoading(false);
                });
            }
        }
    }

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="sign-up-form">
            <h2>Crea tu cuenta</h2>
            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Nombres"
                                name="name"
                                defaultValue={formData.name}
                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="Apellidos"
                                name="surname"
                                defaultValue={formData.surname}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Correo electrónico"
                        name="email"
                        defaultValue={formData.email}
                    />
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                defaultValue={formData.password}

                            />
                        </Col>
                        <Col>
                            <Form.Control
                                type="password"
                                placeholder="Repetir contraseña"
                                name="repeatPassword"
                                defaultValue={formData.repeatPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    {!signUpLoading ? "Registrarse" : <Spinner className="spinner-border" animation="border" />}
                </Button>
            </Form>
        </div>
    )
}

function initialFormValue() {
    return {
        name: "",
        surname: "",
        email: "",
        password: "",
        repeatPassword: "",
    }
}