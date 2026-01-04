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
import AuthContext from "../../features/context/authContext/AuthContext";
import LayoutContext from "../../features/context/layoutContext/LayoutContext";
import { useState } from "react";
import type IUser from "../../entities/user/model/IUser";
import ForgotPassword from "../../pages/forgotPassword/ForgotPassword";
import Privacy from "../../pages/privacy/Privacy";
import Personal from "../../pages/personal/Personal";

export default function App() {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const [isMainShifted, setIsMainShifted] = useState(true);

    return (
        <AuthContext.Provider
            value={{ user, setUser, isAuthLoading, setIsAuthLoading }}
        >
            <LayoutContext.Provider value={{ isMainShifted, setIsMainShifted }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Home />} />
                            {/* header navs */}
                            <Route path="menu" element={<Menu />} />
                            <Route path="rewards" element={<Rewards />} />
                            <Route path="giftcards" element={<GiftCards />} />

                            {/* header buttons */}
                            <Route path="signin" element={<SignIn />} />
                            <Route path="register" element={<Register />} />
                            <Route path="storesmap" element={<StoresMap />} />

                            {/* account nav links */}
                            <Route path="personal" element={<Personal />} />

                            <Route
                                path="forgotPassword"
                                element={<ForgotPassword />}
                            />

                            {/* footer */}
                            <Route path="privacy" element={<Privacy />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </LayoutContext.Provider>
        </AuthContext.Provider>
    );
}
