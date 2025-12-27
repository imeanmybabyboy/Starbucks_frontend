import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../../features/layout/Layout";
import Home from "../../pages/home/Home";
import Menu from "../../pages/menu/Menu";
import Rewards from "../../pages/rewards/Rewards";
import GiftCards from "../../pages/giftCards/GiftCards";
import SignIn from "../../pages/signin/SignIn";
import StoresMap from "../../pages/storesMap/StoresMap";
export default function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="menu" element={<Menu />} />
                        <Route path="rewards" element={<Rewards />} />
                        <Route path="giftcards" element={<GiftCards />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="storesmap" element={<StoresMap />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
