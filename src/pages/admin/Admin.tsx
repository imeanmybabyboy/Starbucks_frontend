import { useContext, useEffect } from "react";
import "./ui/Admin.css";
import AuthContext from "../../features/context/authContext/AuthContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import LayoutContext from "../../features/context/layoutContext/LayoutContext";

export default function Admin() {
    const { setIsHeroPage } = useContext(LayoutContext)!;
    const { user } = useContext(AuthContext)!;
    const location = useLocation();

    useEffect(() => {
        // prevent adding class "container"
        setIsHeroPage(true);
    }, []);

    useEffect(() => {
        if (user === null || user.roleId.toLowerCase() !== "admin") {
            window.location.href = "/";
        }
    }, [user]);

    useEffect(() => {
        for (let item of document.querySelectorAll<HTMLAnchorElement>(
            "[data-menu-nav]",
        )) {
            let sliceFrom = item.href
                .slice(item.href.indexOf(item.port))
                .indexOf("/");
            let currentRoute = item.href
                .slice(item.href.indexOf(item.port))
                .slice(sliceFrom);

            if (location.pathname === currentRoute) {
                item.classList.add("active-page");
            } else {
                item.classList.remove("active-page");
            }
        }
    }, [location.pathname]);

    return (
        <>
            {user?.roleId.toLowerCase() === "admin" ? (
                <div>
                    <div
                        className="alert-center z-3 mt-2"
                        id="category-add-alert-placeholder"
                    ></div>

                    <div
                        className="py-3 border border-bottom-1 mb-3"
                        style={{ backgroundColor: "#F9F9F9" }}
                    >
                        <div
                            className="container p-0 d-flex gap-4"
                            style={{ fontSize: "0.9rem" }}
                        >
                            <span>
                                <Link
                                    className="text-decoration-none link-dark"
                                    to=""
                                    data-menu-nav
                                >
                                    Categories
                                </Link>
                            </span>
                            <span>
                                <Link
                                    className="text-decoration-none link-dark"
                                    to="subcategories"
                                    data-menu-nav
                                >
                                    Subcategories
                                </Link>
                            </span>
                            <span>
                                <Link
                                    className="text-decoration-none link-dark"
                                    to="products"
                                    data-menu-nav
                                >
                                    Products
                                </Link>
                            </span>
                        </div>
                    </div>

                    <h1
                        className="fs-3 text-center"
                        style={{ color: "#006342" }}
                    >
                        Dashboard
                    </h1>

                    <div className="container p-0">
                        <Outlet />
                    </div>
                </div>
            ) : (
                <div className="alert alert-danger text-center">
                    An error occured
                </div>
            )}
        </>
    );
}
