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
import Previous from "../../pages/previous/Previous";
import Favorites from "../../pages/favorites/Favorites";
import Featured from "../../pages/featured/Featured";
import MainMenu from "../../pages/mainMenu/MainMenu";
import Admin from "../../pages/admin/Admin";
import Categories from "../../pages/categories/Categories";
import Subcategories from "../../pages/subcategories/Subcategories";
import Products from "../../pages/products/Products";
import AppContext from "../../features/context/appContext/AppContext";
import type ICategory from "../../entities/category/model/ICategory";

export default function App() {
    const [user, setUser] = useState<IUser | null>(null);
    const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
    const [isMainShifted, setIsMainShifted] = useState(true);
    const [isHeroPage, setIsHeroPage] = useState<boolean>(false);
    const [categories, setCategories] = useState<Array<ICategory> | null>(null);

    return (
        <AuthContext.Provider
            value={{ user, setUser, isAuthLoading, setIsAuthLoading }}
        >
            <LayoutContext.Provider
                value={{
                    isMainShifted,
                    setIsMainShifted,
                    isHeroPage,
                    setIsHeroPage,
                }}
            >
                <AppContext.Provider value={{ categories, setCategories }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                {/* header navs */}
                                <Route index element={<Home />} />
                                <Route path="rewards" element={<Rewards />} />
                                <Route
                                    path="giftcards"
                                    element={<GiftCards />}
                                />

                                {/* menu nav links */}
                                <Route path="menu" element={<Menu />}>
                                    <Route index element={<MainMenu />} />
                                    <Route
                                        path="previous"
                                        element={<Previous />}
                                    />
                                    <Route
                                        path="favorites"
                                        element={<Favorites />}
                                    />
                                </Route>
                                <Route path="featured" element={<Featured />} />

                                {/* admin nav links */}
                                <Route path="admin" element={<Admin />}>
                                    <Route index element={<Categories />} />
                                    <Route
                                        path="subcategories"
                                        element={<Subcategories />}
                                    />
                                    <Route
                                        path="products"
                                        element={<Products />}
                                    />
                                </Route>

                                {/* header buttons */}
                                <Route path="signin" element={<SignIn />} />
                                <Route path="register" element={<Register />} />
                                <Route
                                    path="storesmap"
                                    element={<StoresMap />}
                                />

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
                </AppContext.Provider>
            </LayoutContext.Provider>
        </AuthContext.Provider>
    );
}
