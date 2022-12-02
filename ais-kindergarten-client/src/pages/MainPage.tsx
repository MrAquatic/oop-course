import React from "react";
import { Alert, Container } from "react-bootstrap";

export const MainPage: React.FC = () =>
{
    return (
        <Container className="d-flex flex-column h-100 justify-content-center">
            <Alert variant="success">
                <Alert.Heading>Добро пожаловать в АИС "Сад"</Alert.Heading>
                <p>
                    Вы находитесь на главной странице системы.
                    <br />Чтобы воспользоваться её функционалом, воспользуйтесь меню сверху экрана.
                </p>
                <hr />
                <p className="mb-0">
                    С уважением, разработчик системы.
                </p>
            </Alert>
        </Container>
    );
};