import React from "react";
import { NavLink } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from "react-bootstrap/Nav";

export const MyHeader: React.FC = () =>
{
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>АИС "Сад"</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/">Главная</Nav.Link>
                        <Nav.Link as={NavLink} to="/contracts">Контракты</Nav.Link>
                        <Nav.Link as={NavLink} to="/journal">Журнал</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};