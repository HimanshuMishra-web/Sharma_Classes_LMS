import React, {useState} from "react";

import {Dashboard,Login} from "../pages";
import {Routes, Route, Navigate} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import {Slider} from "../components"

export function Router() {

    return (
<Login />
//         <Slider />

        // <Routes>
        //     {/*  this is private routes  */}
        //     <Route path="/" element={<ProtectedRoute/>}>
        //         <Route path="/" element={<Navigate replace to="dashboard"/>}/>
        //         <Route path="/dashboard" element={<Dashboard/>}/>
        //     </Route>
        //
        //     {/* this is public route */}
        //     <Route path="/" element={<PublicRoute/>}>
        //         <Route path="/login" element={<Login/>}/>
        //     </Route>
        // </Routes>
    );
}
