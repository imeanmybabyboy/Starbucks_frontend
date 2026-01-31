import { Link, Outlet, useLocation } from "react-router-dom";
import "./ui/Menu.css";
import { useContext, useEffect } from "react";
import LayoutContext from "../../features/context/layoutContext/LayoutContext";

export default function Menu() {
    const { setIsHeroPage } = useContext(LayoutContext)!;
    const location = useLocation();

    useEffect(() => {
        // prevent adding class "container"
        setIsHeroPage(true);
    }, [])

    useEffect(() => {
        for (let item of document.querySelectorAll<HTMLAnchorElement>(
            "[data-menu-nav]"
        )) {
            let sliceFrom = (item.href.slice(item.href.indexOf(item.port))).indexOf("/")
            let currentRoute = item.href.slice(item.href.indexOf(item.port)).slice(sliceFrom)

            if (location.pathname === currentRoute) {
                item.classList.add("active-page")
            } else {
                item.classList.remove("active-page")
            }
                
        }
    }, [location.pathname]);

    return (
        <div>
            <div
                className="py-3 border border-bottom-1 mb-4"
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
                            Menu
                        </Link>
                    </span>
                    <span>
                        <Link
                            className="text-decoration-none link-dark"
                            to="/featured"
                            data-menu-nav
                        >
                            Featured
                        </Link>
                    </span>
                    <span>
                        <Link
                            className="text-decoration-none link-dark"
                            to="previous"
                            data-menu-nav
                        >
                            Previous
                        </Link>
                    </span>
                    <span>
                        <Link
                            className="text-decoration-none link-dark"
                            to="favorites"
                            data-menu-nav
                        >
                            Favorites
                        </Link>
                    </span>
                </div>
            </div>

            <div className="container p-0">
                <Outlet />
            </div>
        </div>
    );
}
