import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "./BasicLayout.scss";
import LeftMenu from '../../components/LeftMenu';

export default function BasicLayout(props) {
    const { className, children, setRefreshCheckLogin } = props;
    // console.log(props);
    return (
        <Container className={`basic-layout ${className}`}>
            <Row>
                <Col xs={3} className="basic-layout__menu">
                    <LeftMenu setRefreshCheckLogin={setRefreshCheckLogin} />
                </Col>
                <Col xs={9} className="basic-layout__content">
                    {children}
                </Col>
            </Row>
        </Container>
    )
}
