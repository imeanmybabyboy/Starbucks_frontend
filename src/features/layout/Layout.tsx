import { Link, Outlet } from "react-router-dom";
import "./ui/Layout.css";
import { useState } from "react";

export default function Layout() {
    const [user, setUser] = useState(null);

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom border-2 py-lg-4 px-lg-4 pe-lg-5">
                    <div className="container-fluid d-flex justify-content-start">
                        <Link to="/" className="navbar-brand">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/sco/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/297px-Starbucks_Corporation_Logo_2011.svg.png?20170312192423"
                                alt="starbucks logo"
                                style={{ width: "3rem" }}
                            />
                        </Link>

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
                                        >
                                            Menu
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="rewards"
                                            className="nav-link text-dark fw-bold"
                                        >
                                            Rewards
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="giftcards"
                                            className="nav-link text-dark fw-bold"
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
                                            >
                                                <i className="bi bi-person-circle fs-5"></i>
                                                Account
                                                <i
                                                    className="bi bi-chevron-down"
                                                    id="animated-chevron"
                                                ></i>
                                            </div>

                                            <ul
                                                className="dropdown-menu"
                                                id="account-dropdown"
                                                style={{
                                                    backgroundColor: "#F9F9F9",
                                                }}
                                            >
                                                <li>
                                                    <a
                                                        className="dropdown-item"
                                                    >
                                                        Personal info
                                                    </a>
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
                                                        href="?logout"
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
                                                asp-controller="User"
                                                asp-action="Create"
                                                className="btn btn-dark border-1 rounded-pill py-1"
                                            >
                                                Join now
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className="container">
                <Outlet />
            </main>
            <footer className="border-top footer text-muted">
                <div className="container">
                    &copy; 2025 - ASP_Starbucks -{" "}
                    <Link to="Privacy">Privacy</Link>
                </div>
            </footer>{" "}
        </>
    );
}
