import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { MyHeader } from "./components/MyHeader";

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { PageRouter } from "./components/PageRouter";
import { Container } from "react-bootstrap";

function App()
{
    return (
        <BrowserRouter>
            <Container id="app" fluid className="d-flex flex-column vh-100 p-0">
                <MyHeader />
                <PageRouter />
            </Container>
        </BrowserRouter>
    );
}

export default App;
