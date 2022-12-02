import React from "react";
import { Alert, Container } from "react-bootstrap";

export const ContractsPage: React.FC = () =>
{
    return (
        <Container className="d-flex flex-column h-100 justify-content-center">
            <Alert variant="success">
                <Alert.Heading>Контракты</Alert.Heading>
                <span>
                    Тут должны быть контракты.
                </span>
            </Alert>
        </Container>
    );
};