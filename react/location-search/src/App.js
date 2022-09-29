import React from "react";

// We use Route in order to define the different routes of our application
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from "./LandingPage";
import UserPage from "./UserPage";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<LandingPage/>}/>
                    <Route path = "/user" element = {<UserPage/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;