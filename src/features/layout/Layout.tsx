import { Link, Outlet, useLocation } from "react-router-dom";
import "./ui/Layout.css";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../context/authContext/AuthContext";
import LayoutContext from "../context/layoutContext/LayoutContext";
import Footer from "../../pages/footer/Footer";

export default function Layout() {
    const location = useLocation();

    // contexts
    const { user, setUser, setIsAuthLoading } = useContext(AppContext)!;
    const { isMainShifted, setIsMainShifted, isHeroPage, setIsHeroPage } =
        useContext(LayoutContext)!;

    const [isNavHidden, setIsNavHidden] = useState<boolean>(false);
    const [isAccountNavOpen, setIsAccountNavOpen] = useState(false);
    const accountDropdownRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        // according to page type and size, add class "container" or remove it
        const handleResize = () => {
            if (
                (window.innerWidth <= 2500 && isHeroPage) ||
                (window.innerWidth <= 1500 && !isHeroPage)
            ) {
                setIsMainShifted(false);
            } else {
                setIsMainShifted(true);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [isHeroPage]);

    useEffect(() => {
        // hide nav bar
        location.pathname.includes("signin") ||
        location.pathname.includes("register")
            ? setIsNavHidden(true)
            : setIsNavHidden(false);

        // set checked page nav styles
        for (let item of document.querySelectorAll(
            "[data-pages-nav]"
        ) as NodeListOf<HTMLAnchorElement>) {
            let currentPage = item.href.slice(item.href.lastIndexOf("/"));
            if (location.pathname.includes(currentPage)) {
                item.classList.add("active-page");
            } else {
                item.classList.remove("active-page");
            }
        }

        // hide account navbar
        if (accountDropdownRef.current) {
            accountDropdownRef.current.classList.remove("show");
            setIsAccountNavOpen(false);
        }

        // set hero page
        if (location.pathname === "/personal") {
            setIsHeroPage(true);
        } else {
            setIsHeroPage(false);
        }
        
        // move to the top of the page when location is changed
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const fetchUser = async () => {
            setIsAuthLoading(true);
            try {
                const res = await fetch(
                    "https://localhost:7174/User/ApiAuthenticate",
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();
                if (data.status?.toLowerCase() === "ok" && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error(`Failed to fatch user: ${error}`);
                setUser(null);
            } finally {
                setIsAuthLoading(false);
            }
        };
        fetchUser();
    }, [setUser]);

    const logout = () => {
        fetch("https://localhost:7174/User/ApiLogout", {
            credentials: "include",
            method: "POST",
        })
            .then((r) => r.json())
            .then((j) => {
                if (j.status.toLowerCase() === "ok") {
                    setUser(null);
                } else {
                    alert(j.error);
                }
            });
    };

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom border-2 py-lg-4 px-lg-4 pe-lg-5">
                    <div className="container-fluid d-flex justify-content-start">
                        <Link
                            to="/"
                            className="navbar-brand"
                            onClick={() => setIsNavHidden(false)}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/297px-Starbucks_Corporation_Logo_2011.svg.png?20170312192423"
                                alt="starbucks logo"
                                style={{ width: "3rem" }}
                            />
                        </Link>

                        {!isNavHidden ? (
                            <div className="f-dlex justify-content-between align-items-center w-100">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target=".navbar-collapse"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>

                                <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                                    <ul className="navbar-nav flex-grow-1">
                                        <li className="nav-item">
                                            <Link
                                                to="menu"
                                                className="nav-link text-dark fw-bold"
                                                data-pages-nav
                                            >
                                                Menu
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="rewards"
                                                className="nav-link text-dark fw-bold"
                                                data-pages-nav
                                            >
                                                Rewards
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link
                                                to="giftcards"
                                                className="nav-link text-dark fw-bold"
                                                data-pages-nav
                                            >
                                                Gift cards
                                            </Link>
                                        </li>
                                    </ul>

                                    <div className="d-flex align-items-center gap-5">
                                        <Link
                                            to="storesmap"
                                            id="find-store"
                                            className="d-flex align-items-center gap-2 fw-bold text-decoration-none"
                                            role="button"
                                            data-pages-nav
                                            style={{ color: "#000" }}
                                        >
                                            <i className="bi bi-geo-alt-fill fs-5"></i>{" "}
                                            Find a store
                                        </Link>

                                        {user !== null ? (
                                            <div className="dropdown">
                                                <div
                                                    className="dropdown d-flex align-items-center gap-2 fw-bold user-select-none position-relative"
                                                    role="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    onClick={() => {
                                                        setIsAccountNavOpen(
                                                            (val) => !val
                                                        );
                                                    }}
                                                >
                                                    <i className="bi bi-person-circle fs-5"></i>
                                                    Account
                                                    <i
                                                        className={`bi bi-chevron-down ${
                                                            isAccountNavOpen
                                                                ? "open"
                                                                : "close"
                                                        }`}
                                                        id="animated-chevron"
                                                    ></i>
                                                </div>

                                                <ul
                                                    className={`dropdown-menu ${
                                                        isAccountNavOpen
                                                            ? "show"
                                                            : null
                                                    }`}
                                                    id="account-dropdown"
                                                    style={{
                                                        backgroundColor:
                                                            "#F9F9F9",
                                                    }}
                                                    ref={accountDropdownRef}
                                                >
                                                    <li>
                                                        <Link
                                                            to="/personal"
                                                            className="dropdown-item"
                                                        >
                                                            Personal info
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Privacy and data
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#"
                                                        >
                                                            Settings
                                                        </a>
                                                    </li>
                                                    <hr className="dropdown-divider w-75 mx-auto" />
                                                    <li>
                                                        <a
                                                            className="dropdown-item"
                                                            href="#!"
                                                            onClick={() => {
                                                                logout();
                                                            }}
                                                        >
                                                            Sign out
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        ) : (
                                            <div
                                                id="authContainer"
                                                className="d-flex align-items-center gap-3"
                                            >
                                                {/* @* sign in button *@ */}
                                                <Link
                                                    to="signin"
                                                    className="btn btn-outline-dark border-1 rounded-pill py-1"
                                                >
                                                    Sign in
                                                </Link>
                                                {/* @* sign up button *@ */}
                                                <Link
                                                    to="register"
                                                    className="btn btn-dark border-1 rounded-pill py-1"
                                                >
                                                    Join now
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </nav>
            </header>
            <main className={`${isMainShifted ? "container" : ""}`}>
                <Outlet />
            </main>

            <footer className={`footer border-top border-2 shadow-sm ${!isHeroPage ? "mt-2" : ""}`}>
                <Footer />
            </footer>
        </>
    );
}
