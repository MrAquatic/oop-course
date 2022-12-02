import React from "react";
import { Route, Routes } from "react-router-dom";

import { MainPage } from "../pages/MainPage";
import { ContractsPage } from "../pages/ContractsPage";
import { JournalPage } from "../pages/JournalPage";

export const PageRouter: React.FC = () =>
{
    return (
        <Routes>
            <Route element={<MainPage />} path="/" />
            <Route path="/contracts">
                <Route element={<ContractsPage />} path="" />
            </Route>
            <Route path="/journal">
                <Route element={<JournalPage />} path="" />
            </Route>
        </Routes>
    );
};

