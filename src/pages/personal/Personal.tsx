import { useContext, useEffect } from "react";
import "./ui/Personal.css";
import AppContext from "../../features/context/authContext/AuthContext";
import LayoutContext from "../../features/context/layoutContext/LayoutContext";
import { useLocation } from "react-router-dom";
import InputValidation from "../shared/InputValidation/InputValidation";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";

function handleProfileEditAlert(json: Record<string, string>) {
    const alertPlaceholder = document.getElementById("live-alert-placeholder");

    const appendAlert = (message: string, type: string) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible text-center fade show p-3 mx-auto" role="alert" style="transition: 1.5s !important; width: fit-content">`,
            `   <div>${message}</div>`,
            "</div>",
        ].join("");

        if (!alertPlaceholder) return;
        alertPlaceholder.append(wrapper);

        const alertElement = wrapper.querySelector(".alert");
        if (!alertElement) return;

        const addProductAlert =
            bootstrap.Alert.getOrCreateInstance(alertElement);
        window.setTimeout(() => {
            addProductAlert.close();
        }, 3000);
    };

    if (json.status.toLowerCase() === "ok") {
        appendAlert(json.message, "success");
    } else if (json.status.toLowerCase() === "error") {
        appendAlert(json.message, "danger");
    } else {
        appendAlert(json.message, "warning");
    }
}

export default function Personal() {
    const location = useLocation();

    const { user, isAuthLoading } = useContext(AppContext)!;
    const { setIsMainShifted } = useContext(LayoutContext)!;

    useEffect(() => {
        // inputs validation
        if (!isAuthLoading && user) {
            for (let input of document.querySelectorAll<HTMLInputElement>(
                "input[type='text']"
            )) {
                let firstFocus = true;
                const label = input.parentElement?.querySelector("label")!;

                InputValidation.handleFilledInput(
                    input,
                    label,
                    input.required ? true : false
                );

                if (input !== null && label !== null) {
                    input.addEventListener("focusin", () => {
                        input.dataset.focused = "true";
                        InputValidation.checkInputFocusIn(
                            input,
                            label,
                            input.required ? true : false,
                            firstFocus
                        );
                    });

                    input.addEventListener("focusout", () => {
                        input.dataset.focused = "false";
                        InputValidation.checkInputFocusOut(
                            input,
                            label,
                            input.required ? true : false
                        );
                    });

                    input.addEventListener("input", () => {
                        InputValidation.checkInputTextChange(
                            input,
                            label,
                            input.required ? true : false
                        );
                    });
                }
            }
        }
    }, [user, isAuthLoading]);

    useEffect(() => {
        setIsMainShifted(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!isAuthLoading && !user) {
            window.location.href = "/";
        }
    }, [user, isAuthLoading]);

    // save button effects
    const mouseDown = (e: HTMLButtonElement) => {
        e.classList.remove("shadow");
        e.classList.add("shadow-sm");
        e.style.setProperty(
            "transform",
            "translateY(calc(-50% + 5px))",
            "important"
        );
    };
    const mouseUp = (e: HTMLButtonElement) => {
        e.classList.remove("shadow-sm");
        e.classList.add("shadow");
        e.style.setProperty("transform", "translateY(-50%)", "important");
    };
    const mouseLeave = (e: HTMLButtonElement) => {
        e.classList.remove("shadow-sm");
        e.classList.add("shadow");
        e.style.setProperty("transform", "translateY(-50%)", "important");
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let form = e.target as HTMLFormElement;
        let changes: Record<string, string> = {};

        const btn = document.getElementById(
            "btn-profile-edit"
        ) as HTMLButtonElement;
        if (!btn) return;
        const spinner = `<div class="spinner-border text-light" style="width: 25px; height: 25px" role="status">
                             <span class="visually-hidden">Loading...</span>
                     </div>`;

        if (!btn.classList.contains("loading")) {
            btn.innerHTML = spinner;
            btn.classList.add("loading");
            btn.disabled = true;
        }

        for (let item of form.querySelectorAll("input")) {
            let oldValue = item.defaultValue;
            let newValue = item.value;

            if (oldValue !== newValue) {
                changes[item.getAttribute("name")!] = newValue;
            }
        }

        setTimeout(() => {
            if (Object.keys(changes).length > 0) {
                for (let item of form.querySelectorAll("input")) {
                    if (
                        item.getAttribute("name") === "Name" ||
                        item.getAttribute("Name") === "Surname"
                    ) {
                        let isValueInvalid = item.value.length === 0;

                        if (isValueInvalid) {
                            item.classList.add("is-invalid");
                            item.classList.remove("is-valid");
                            item.focus();
                            item.style.border = "2px solid #C82014";
                        } else {
                            item.classList.add("is-valid");
                            item.classList.remove("is-invalid");
                            item.style.border = "1px solid #00754A";
                        }
                    }
                }

                fetch("https://localhost:7174/User/ApiUpdate", {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(changes),
                })
                    .then((r) => r.json())
                    .then((j) => {
                        if (j.status.toLowerCase() === "ok") {
                            setTimeout(() => {
                                window.location.reload();
                            }, 500);
                            handleProfileEditAlert(j);
                        } else {
                            handleProfileEditAlert(j);
                        }
                    });
            }

            btn.innerHTML = "Save";
            btn.classList.remove("loading");
            btn.disabled = false;
        }, 500);
    };

    return (
        <div
            className="d-flex m-0 p-0 vh-100 overflow-hidden position-relative"
            id="personal-information-container"
        >
            <div
                className="alert-center z-3 mt-2"
                id="live-alert-placeholder"
            ></div>

            <div
                className="ms-lg-5 ps-lg-5 d-flex align-items-center"
                id="personal-information-header"
            >
                <h4 className="fw-bold">Personal</h4>
            </div>

            <div
                className="d-flex flex-column align-items-center gap-3 h-100 py-lg-6 px-5 overflow-y-auto border-start border-1 position-relative"
                id="personal-information-body"
            >
                <div className="d-flex flex-column gap-3">
                    <h2 className="display-6">
                        {user?.name} {user?.surname}
                    </h2>
                    <div className="d-flex flex-column gap-sm-2">
                        <h6>
                            <span style={{ color: "#007549" }}>*</span>{" "}
                            indicates required fields
                        </h6>

                        <form
                            id="update-form"
                            className="needs-validation d-flex flex-column gap-2"
                            method="post"
                            noValidate
                            onSubmit={(e) => onSubmit(e)}
                        >
                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-first-name"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingFirstName"
                                    required
                                    name="Name"
                                    defaultValue={user?.name}
                                />
                                <label
                                    id="floatingFirstNameLabel"
                                    htmlFor="floatingFirstName"
                                >
                                    * First name
                                </label>

                                <div
                                    className="invalid-feedback ps-2 fs-6 gap-1 align-items-center"
                                    id="validation-container"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-x-octagon-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                                    </svg>
                                    Enter first name.
                                </div>
                            </div>

                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-last-name"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingLastName"
                                    required
                                    name="Surname"
                                    defaultValue={user?.surname}
                                />
                                <label
                                    id="floatingLastNameLabel"
                                    htmlFor="floatingLastName"
                                >
                                    * Last name
                                </label>

                                <div
                                    className="invalid-feedback ps-2 fs-6 gap-1 align-items-center"
                                    id="validation-container"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-x-octagon-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                                    </svg>
                                    Enter last name.
                                </div>
                            </div>

                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-phone"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingPhone"
                                    name="Phone"
                                    defaultValue={user?.phone}
                                />
                                <label
                                    id="floatingPhoneLabel"
                                    htmlFor="floatingPhone"
                                >
                                    Mobile number
                                </label>

                                <div
                                    className="invalid-feedback ps-2 fs-6 gap-1 align-items-center"
                                    id="validation-container"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-x-octagon-fill"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708" />
                                    </svg>
                                    Feedback
                                </div>
                            </div>

                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-address-1"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingAddress1"
                                    name="Address1"
                                    defaultValue={user?.address1}
                                />
                                <label
                                    id="floatingAddress1Label"
                                    htmlFor="floatingAddress1"
                                >
                                    Address line 1
                                </label>
                            </div>

                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-address-2"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingAddress2"
                                    name="Address2"
                                    defaultValue={user?.address1}
                                />
                                <label
                                    id="floatingAddress2Label"
                                    htmlFor="floatingAddress2"
                                >
                                    Address line 2
                                </label>

                                <span className="fs-6 ps-2 ms-1">Optional</span>
                            </div>

                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-city"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingCity"
                                    name="City"
                                    defaultValue={user?.city}
                                />
                                <label
                                    id="floatingCityLabel"
                                    htmlFor="floatingCity"
                                >
                                    City
                                </label>
                            </div>

                            <div
                                className="form-floating mb-3 fs-5 w-100"
                                id="user-zip"
                            >
                                <input
                                    type="text"
                                    className="form-control shadow-none fs-5 py-0"
                                    id="floatingZip"
                                    name="Zip"
                                    defaultValue={user?.zip}
                                />
                                <label
                                    id="floatingZipLabel"
                                    htmlFor="floatingZip"
                                >
                                    Zip code
                                </label>
                            </div>
                        </form>
                    </div>
                </div>

                <button
                    className="position-fixed end-0 translate-middle-x bottom-0 translate-middle-y mb-5 me-5 btn btn-success rounded-pill fs-5 fw-bold p-2 px-3 shadow"
                    type="submit"
                    id="btn-profile-edit"
                    onMouseDown={(e) => {
                        mouseDown(e.target as HTMLButtonElement);
                    }}
                    onMouseUp={(e) => {
                        mouseUp(e.target as HTMLButtonElement);
                    }}
                    onMouseLeave={(e) => {
                        mouseLeave(e.target as HTMLButtonElement);
                    }}
                    form="update-form"
                >
                    Save
                </button>
            </div>
        </div>
    );
}
