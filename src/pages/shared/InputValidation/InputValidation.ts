export default class InputValidation {
    static checkInputFocusIn = (
        input: HTMLInputElement,
        label: HTMLLabelElement,
        isRequired: boolean = true,
        firstFocus?: boolean
    ) => {
        if (isRequired) {
            if (input.value.length === 0) {
                if (firstFocus) {
                    label.style.transform =
                        "scale(.85) translateY(-2rem) translateX(.15rem)";
                    input.style.outline = "2px solid #00754A";
                    input.style.outlineOffset = "-2px";
                    firstFocus = false;
                } else {
                    label.style.transform =
                        "scale(.85) translateY(-2rem) translateX(.15rem)";
                    input.style.outline = "2px solid #C82014";
                    input.style.outlineOffset = "-2px";
                    label.style.color = "#C82014";
                }
            } else {
                input.style.outline = "2px solid #00754A";
                input.style.outlineOffset = "-2px";
                label.style.color = "#00754A";
            }
        } else {
            label.style.transform =
                "scale(.85) translateY(-2rem) translateX(.15rem)";
            input.style.outline = "2px solid #00754A";
            input.style.outlineOffset = "-2px";
            label.style.color = "#00754A";
        }
    };

    static checkInputFocusOut = (
        input: HTMLInputElement,
        label: HTMLLabelElement,
        isRequired: boolean = true
    ) => {
        if (isRequired) {
            if (input.value.trim().length === 0) {
                label.style.transform = "scale(1) translateY(0) translateX(0)";
                input.style.outline = "1px solid #C82014";
                input.style.outlineOffset = "-1px";
                input.classList.add("is-invalid");
                label.style.color = "#C82014";
            } else {
                input.style.outline = "1px solid #00754A";
                input.style.outlineOffset = "-1px";
            }
        } else {
            if (input.value.length > 0) {
                input.style.outline = "1px solid #00754A";
                input.style.outlineOffset = "-1px";
            } else {
                label.style.transform = "scale(1) translateY(0) translateX(0)";
                input.style.outline = "1px solid #DEE2E6";
                input.style.outlineOffset = "-1px";
                label.style.color = "grey";
            }
        }
    };

    static checkInputTextChange = (
        input: HTMLInputElement,
        label: HTMLLabelElement,
        isRequired: boolean = true
    ) => {
        if (isRequired) {
            let value = input.value.trim();
            let validationCont = input.parentNode!?.querySelector(
                "[data-validation-container]"
            ) as HTMLElement;

            if (value.length === 0) {
                if (input.dataset.focused === "true") {
                    input.style.outline = "2px solid #C82014";
                    input.style.outlineOffset = "-2px";
                }
                validationCont.style.display = "flex";
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                label.style.color = "#C82014";
            } else {
                if (input.dataset.focused === "true") {
                    input.style.outline = "2px solid #00754A";
                    input.style.outlineOffset = "-2px";
                }
                validationCont.style.display = "none";
                input.classList.remove("is-invalid");
                input.classList.add("is-valid");
                label.style.color = "#00754A";
            }
        }
    };

    static handleFilledInput = (
        input: HTMLInputElement,
        label: HTMLLabelElement,
        isRequired: boolean = true
    ) => {
        if (isRequired) {
            if (input.value.length > 0) {
                label.style.transform =
                    "scale(.85) translateY(-2rem) translateX(.15rem)";
                input.style.outline = "1px solid #00754A";
                input.style.outlineOffset = "-1px";
                label.style.color = "#00754A";
                input.classList.add("is-valid");
            } else {
                label.style.transform = "scale(1) translateY(0) translateX(0)";
                input.style.outline = "1px solid #C82014";
                input.style.outlineOffset = "-1px";
                input.classList.add("is-invalid");
                label.style.color = "#C82014";
            }
        } else {
            if (input.value.length > 0) {
                label.style.transform =
                    "scale(.85) translateY(-2rem) translateX(.15rem)";
                input.style.outline = "1px solid #00754A";
                input.style.outlineOffset = "-1px";
                label.style.color = "#00754A";
            } else {
                label.style.transform = "scale(1) translateY(0) translateX(0)";
                input.style.outline = "1px solid #DEE2E6";
                input.style.outlineOffset = "-1px";
            }
        }
    };
}
