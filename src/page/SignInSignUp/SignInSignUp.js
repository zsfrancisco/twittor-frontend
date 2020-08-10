import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUsers, faComment } from "@fortawesome/free-solid-svg-icons";
import "./SignInSignUp.scss"; import BasicModal from '../../components/Modal/BasicModal/BasicModal';
import LogoTwittor from "../../assets/img/png/logo.png";
import LogoWhiteTwittor from "../../assets/img/png/logo-white.png";
import SignUpForm from '../../components/SignUpForm';
;

export default function SignInSignUp() {

    const [showModal, setShowModal] = useState(false);
    const [contentModal, setContentModal] = useState(null);

    const openModal = content => {
        setShowModal(true);
        setContentModal(content);
    }

    return (
        <>
            <Container className="signin-signup" fluid>
                <Row>
                    <LeftComponent />
                    <RightComponent
                        openModal={openModal}
                        setShowModal={setShowModal}
                    />
                </Row>
            </Container>
            <BasicModal
                show={showModal}
                setShow={setShowModal}
            >
                {contentModal}
            </BasicModal>
        </>
    );
}

function LeftComponent() {
    return (
        <Col className="signin-signup__left" xs={6}>
            <img src={LogoTwittor} alt="Twittor" />
            <div>
                <h2>
                    <FontAwesomeIcon icon={faSearch} />
                    Sigue lo que te interesa.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faUsers} />
                    Entérate de qué está hablando la gente.
                </h2>
                <h2>
                    <FontAwesomeIcon icon={faComment} />
                    Únete a la conversación.
                </h2>
            </div>
        </Col>
    );
}

function RightComponent(props) {
    const { openModal, setShowModal } = props;
    return (
        <Col className="signin-signup__right" xs={6}>
            <div>
                <img src={LogoWhiteTwittor} alt="Twittor" />
                <h2>Mira lo que está pasando en el mundo en este momento.</h2>
                <h3>Únete a Twitter hoy mismo.</h3>
                <Button
                    variant="primary"
                    onClick={() => openModal(<SignUpForm setShowModal={setShowModal} />)}
                >
                    Regístrate
                </Button>
                <Button
                    variant="outline-primary"
                    onClick={() => openModal(<h2>Formulario de Login</h2>)}
                >
                    Iniciar sesión
                </Button>
            </div>
        </Col>
    );
}
