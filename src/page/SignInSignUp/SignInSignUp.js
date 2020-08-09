import React from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import LogoTwittor from "../../assets/img/png/logo.png";
import LogoWhiteTwittor from "../../assets/img/png/logo-white.png";
import "./SignInSignUp.scss";;

export default function SignInSignUp() {
    return (
        <Container className="signin-signup" fluid>
            <Row>
                <LeftComponent />
                <RightComponent />
            </Row>
        </Container>
    );
}

function LeftComponent() {
    return (
        <Col className="signin-signup__left" xs={6}>
            <img src={LogoTwittor} alt="Twittor" />
            <div>
                <h2>- Sigue lo que te interesa.</h2>
                <h2>- Entérate de qué está hablando la gente.</h2>
                <h2>- Únete a la conversación.</h2>
            </div>
        </Col>
    );
}

function RightComponent() {
    return (
        <Col className="signin-signup__right" xs={6}>
            <h2>Right Component...</h2>
        </Col>
    );
}
