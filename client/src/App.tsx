import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import {useAppDispatch} from "./store/store";
import {getPosts} from "./features/posts.slice";

import "./assets/styles/global.css";

import {Home} from "./containers/Home/Home";
import {Auth} from "./containers/Auth/Auth";

const App = () => {
    const dispatch = useAppDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const initApp = useCallback(async () => {
        await dispatch(getPosts());
    }, [dispatch]);

    useEffect(() => {
        initApp();
    }, [initApp]);

    return (
        <BrowserRouter>
            <header id="header" className="header">
                <h1>Blog React</h1>
                <ul style={{color: 'blue'}}>
                    <li><NavLink to={"/"}>Home</NavLink></li>
                    <li><NavLink to={"/auth"}>Auth</NavLink></li>
                </ul>
            </header>
            <main id="main" className="main">
                <Routes>
                    <Route path={'/'} element={<Home />}/>
                    <Route path={"/auth/*"} element={<Auth isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}/>
                </Routes>
            </main>
            <footer id="main" className="footer">
                <p>Copyright ©2022 - Alexandre Grodent</p>
            </footer>
        </BrowserRouter>

    );
}

export default App;
