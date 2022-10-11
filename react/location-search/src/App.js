import React from "react";

// We use Route in order to define the different routes of our application
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import LandingPage from "./LandingPage";
import UserPage from "./UserPage";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<LandingPage/>}/>
                    <Route path={"/user"} element={localStorage.getItem('token') === "true" ? <UserPage/> : <Navigate to={"/"}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;