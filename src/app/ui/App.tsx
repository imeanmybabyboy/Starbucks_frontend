import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../../features/layout/Layout";
import Home from "../../pages/home/Home";
import Menu from "../../pages/menu/Menu";
import Rewards from "../../pages/rewards/Rewards";
import GiftCards from "../../pages/giftCards/GiftCards";
import SignIn from "../../pages/signin/SignIn";
import StoresMap from "../../pages/storesMap/StoresMap";
import Register from "../../pages/register/Register";
import AppContext from "../../features/context/AppContext";
import { useState } from "react";
import type IUser from "../../entities/user/model/IUser";
import ForgotPassword from "../../pages/forgotPassword/ForgotPassword";
export default function App() {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <AppContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="rewards" element={<Rewards />} />
                        <Route path="giftcards" element={<GiftCards />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="register" element={<Register />} />
                        <Route path="storesmap" element={<StoresMap />} />
                        <Route path="forgotPassword" element={<ForgotPassword />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}
