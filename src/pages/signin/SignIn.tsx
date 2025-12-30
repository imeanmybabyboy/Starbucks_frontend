import { useContext, useEffect } from "react";
import "./ui/SignIn.css";
import InputValidation from "../shared/InputValidation/InputValidation";
import Base64 from "../shared/base64/Base64";
import AppContext from "../../features/context/AppContext";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import { Link } from "react-router-dom";

function handleInvalidSignin(message?: string, type?: string) {
    const alertPlaceholder = document.getElementById("live-alert-placeholder");
    if (!alertPlaceholder) return;

    alertPlaceholder.innerHTML = "";

    if (message && type) {
        const appendAlert = (message: string, type: string) => {
            const wrapper = document.createElement("div");
            wrapper.innerHTML = [
                `<div class="alert alert-${type} alert-dismissible text-dark p-3" role="alert" style="border-color: #C82014; background-color: #FDF6F6">`,
                `   <div class="d-flex align-items-center justify-content-between">`,
                `       <h3>Sign in is unsuccessfull.</h3>`,
                `       <i class="bi bi-exclamation-circle-fill text-danger"></i>`,
                `   </div>`,
                `   <div>${message}</div>`,
                "</div>",
            ].join("");
            alertPlaceholder.append(wrapper);
        };

        appendAlert(message, type);
    }
}

export default function SignIn() {
    const { setUser } = useContext(AppContext)!;

    const onMouseDown = (e: React.MouseEvent) => {
        const btn = e.target as HTMLButtonElement;
        if (!btn) return;

        btn.classList.remove("shadow");
        btn.classList.add("shadow-sm");
        btn.style.transform = "translateY(5px)";
    };
    const onMouseUp = (e: React.MouseEvent) => {
        const btn = e.target as HTMLButtonElement;
        if (!btn) return;

        btn.classList.remove("shadow-sm");
        btn.classList.add("shadow");
        btn.style.transform = "translateY(0)";
    };
    const onMouseLeave = (e: React.MouseEvent) => {
        const btn = e.target as HTMLButtonElement;
        if (!btn) return;

        btn.classList.remove("shadow-sm");
        btn.classList.add("shadow");
        btn.style.transform = "translateY(0)";
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const formData = new FormData(form);
        const email = formData.get("user-email");
        const password = formData.get("user-password");

        let emailInvalid = email!.toString().trim().length === 0;
        let passwordInvalid = password!.toString().length === 0;

        const emailInput = form.querySelector(
            "input[name='user-email']"
        ) as HTMLInputElement;
        const emailLabel = emailInput.parentElement?.querySelector(
            "label"
        ) as HTMLLabelElement;

        const passwordInput = form.querySelector(
            "input[name='user-password']"
        ) as HTMLInputElement;
        const passwordLabel = passwordInput.parentElement?.querySelector(
            "label"
        ) as HTMLLabelElement;

        // check email validation
        if (emailInvalid) {
            emailInput.classList.add("is-invalid");
            emailInput.classList.remove("is-valid");
            emailLabel.style.color = "#C82014";
            emailInput.focus();
            emailInput.style.border = "2px solid #C82014";
        } else if (passwordInvalid) {
            // check password validation
            passwordInput.classList.add("is-invalid");
            passwordInput.classList.remove("is-valid");
            passwordLabel.style.color = "#C82014";
            passwordInput.focus();
            passwordInput.style.border = "2px solid #C82014";
        } else {
            emailInput.classList.add("is-valid");
            passwordInput.classList.add("is-valid");
            const userPass = email + ":" + password;
            const basicCredentials = Base64.encode(userPass);

            const submitBtn = document.getElementById("submit-btn");
            if (!submitBtn) return;

            const spinner = `<div class="spinner-border text-light" style="width: 25px; height: 25px" role="status">
                                <span class="visually-hidden">Loading...</span>
                             </div>`;

            if (!submitBtn.classList.contains("loading")) {
                submitBtn.innerHTML = spinner;
                submitBtn.classList.add("loading");
            }

            handleInvalidSignin();

            setTimeout(() => {
                fetch("https://localhost:7174/User/ApiAuthenticate", {
                    method: "POST",
                    headers: {
                        Authorization: "Basic " + basicCredentials,
                    },
                })
                    .then((r) => r.json())
                    .then((j) => {
                        submitBtn.innerHTML = "Sign in";
                        submitBtn.classList.remove("loading");

                        if (j.status.toString().toLowerCase() === "ok") {
                            // window.location.href = "/";
                            setUser(j.user);
                        } else {
                            handleInvalidSignin(j.error, "danger");
                        }
                    });
            }, 500);
        }
    };

    // button styles
    useEffect(() => {
        for (let input of document.querySelectorAll<HTMLInputElement>(
            "input[type='text'], input[type='password']"
        )) {
            let firstFocus = true;
            const label = input.parentElement?.querySelector("label")!;
            InputValidation.handleFilledInput(input, label);

            if (input !== null && label !== null) {
                input.addEventListener("focusin", () => {
                    input.dataset.focused = "true";
                    InputValidation.checkInputFocusIn(input, label, firstFocus);
                });
                input.addEventListener("focusout", () => {
                    firstFocus = false;
                    InputValidation.checkInputFocusOut(input, label);
                });
                input.addEventListener("input", () => {
                    InputValidation.checkInputTextChange(input, label);
                });
            }
        }
    }, []);

    // popovers
    useEffect(() => {
        const popoverDetails = new bootstrap.Popover("#details", {
            container: "body",
        });

        popoverDetails.setContent({
            ".popover-body":
                "Checking this box will reduce the number of times you’re asked to sign in. To keep your account secure, use this option only on your personal devices.",
        });

        const popoverForgotUsername = new bootstrap.Popover(
            "#forgot-username",
            {
                container: "body",
            }
        );

        popoverForgotUsername.setContent({
            ".popover-body":
                "You can now use your email instead of a username.",
        });
    }, []);

    return (
        <div className="row d-flex flex-column align-items-center gap-lg-5 mt-5 w-100">
            <div className="text-center col">
                <h3 className="fw-bold fs-2">Sign in or create account</h3>
            </div>

            <div
                className="col border p-4 d-flex flex-column align-items-start gap-lg-4 rounded-3 box-shadow shadow gap-3"
                style={{ width: "fit-content" }}
            >
                <h6>* indicates required field</h6>

                <div id="live-alert-placeholder"></div>

                <form
                    id="auth-form"
                    className="d-flex flex-column gap-3 needs-validation"
                    method="post"
                    noValidate
                    onSubmit={(e) => onSubmit(e)}
                >
                    <div
                        className="form-floating mb-3 fs-5 rounded-cirlce"
                        id="user-email"
                    >
                        <input
                            type="text"
                            className="form-control shadow-none fs-5 py-0"
                            id="floatingEmail"
                            placeholder=""
                            required
                            name="user-email"
                            defaultValue="jack.daniel@example.com"
                        />
                        <label id="floatingEmailLabel" htmlFor="floatingEmail">
                            * Username or email address
                        </label>

                        <div className="invalid-feedback ps-2 fs-6 gap-1 align-items-center">
                            <svg
                                xmlns="http:www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-x-octagon-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                            </svg>
                            Enter an email/username.
                        </div>
                    </div>
                    <div
                        className="form-floating mb-3 fs-5 rounded-cirlce"
                        id="password"
                    >
                        <input
                            type="password"
                            className="form-control shadow-none fs-5 py-0"
                            id="floatingPassword"
                            placeholder=""
                            required
                            name="user-password"
                            defaultValue="User"
                        />
                        <label
                            id="floatingPasswordLabel"
                            htmlFor="floatingPassword"
                        >
                            * Password
                        </label>

                        <div className="invalid-feedback ps-2 fs-6 gap-1 align-items-center">
                            <svg
                                xmlns="http:www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="bi bi-x-octagon-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                            </svg>
                            Enter a password.
                        </div>
                    </div>

                    <div className="form-check d-flex gap-2 align-items-center">
                        <input
                            className="form-check-input shadow-none"
                            type="checkbox"
                            value=""
                            id="checkChecked"
                            defaultChecked
                        />
                        <label
                            className="form-check-label"
                            htmlFor="checkChecked"
                        >
                            Keep me signed in.
                        </label>
                        <span
                            id="details"
                            className="fw-bold text-decoration-underline user-select-none"
                            role="button"
                            data-bs-container="body"
                            data-bs-toggle="popover"
                            data-bs-placement="top"
                            data-bs-content="content"
                        >
                            Details
                        </span>
                    </div>
                </form>

                <div className="d-flex flex-column gap-2">
                    <div
                        id="forgot-username"
                        className="fw-bold text-decoration-underline user-select-none"
                        role="button"
                        data-bs-container="body"
                        data-bs-toggle="popover"
                        data-bs-placement="top"
                        data-bs-content="content"
                    >
                        Forgot your username?
                    </div>
                    <Link to="/forgotPassword"
                        id="forgot-password"
                        className="fw-bold text-decoration-underline user-select-none"
                        asp-controller="User"
                        asp-action="ForgotPassword"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <button
                    className="btn btn-success rounded-pill fs-5 fw-bold p-3 px-4 shadow"
                    id="submit-btn"
                    form="auth-form"
                    onMouseDown={(e) => onMouseDown(e)}
                    onMouseUp={(e) => onMouseUp(e)}
                    onMouseLeave={(e) => onMouseLeave(e)}
                >
                    Sign in
                </button>
            </div>

            <div className="d-flex flex-column align-items-center my-5">
                <h6
                    className="text-uppercase fw-bold"
                    style={{ color: "#00754A", letterSpacing: "0.10rem" }}
                >
                    Join Starbucks® Rewards
                </h6>
                <p
                    className="text-center"
                    style={{
                        width: "23rem",
                        fontWeight: 500,
                        color: "#212121",
                    }}
                >
                    As a member, start earning free food and drinks, unlock our
                    best offers and celebrate your birthday with a treat from
                    us. Best of all, it's free to join.
                </p>
                <Link to="/register"
                    asp-controller="User"
                    asp-action="Create"
                    id="sign-up"
                    className="btn btn-outline-success border-1 rounded-pill py-1 fw-bold"
                >
                    Join now
                </Link>
            </div>
        </div>
    );
}
