export default class InputValidation {
    static checkInputFocusIn = (
        input: HTMLInputElement,
        label: HTMLLabelElement,
        firstFocus: boolean
    ) => {
        if (input.value.length === 0) {
            if (firstFocus) {
                label.style.transform =
                    "scale(.75) translateY(-2rem) translateX(.15rem)";
                input.style.border = "2px solid #00754A";
                firstFocus = false;
            } else {
                label.style.transform =
                    "scale(.75) translateY(-2rem) translateX(.15rem)";
                input.style.border = "2px solid #C82014";
                label.style.color = "#C82014";
            }
        } else {
            input.style.border = "2px solid #00754A";
            label.style.color = "#00754A";
        }
    };

    static checkInputFocusOut = (input: HTMLInputElement, label: HTMLLabelElement) => {
        if (input.value.length === 0) {
            label.style.transform = "scale(1) translateY(0) translateX(0)";
            input.style.border = "1px solid #C82014";
            input.classList.add("is-invalid");
            label.style.color = "#C82014";
        } else {
            input.style.border = "1px solid #00754A";
        }
    };

    static checkInputTextChange = (
        input: HTMLInputElement,
        label: HTMLLabelElement
    ) => {
        let value = input.value;
        if (value !== null) {
            let validationCont = input.parentNode!?.querySelector(
                ".invalid-feedback"
            ) as HTMLElement;
            if (validationCont !== null) {
                if (value.length === 0) {
                    if (input.dataset.focused === "true") {
                        input.style.border = "2px solid #C82014";
                    }
                    validationCont.style.display = "flex";
                    input.classList.add("is-invalid");
                    input.classList.remove("is-valid");
                    label.style.color = "#C82014";
                } else {
                    if (input.dataset.focused === "true") {
                        input.style.border = "2px solid #00754A";
                    }
                    validationCont.style.display = "none";
                    input.classList.remove("is-invalid");
                    input.classList.add("is-valid");
                    label.style.color = "#00754A";
                }
            }
        }
    };

    static handleFilledInput = (input: HTMLInputElement, label: HTMLLabelElement) => {
        if (input.value.length > 0) {
            label.style.transform =
                "scale(.75) translateY(-2rem) translateX(.15rem)";
            input.style.border = "1px solid #00754A";
            label.style.color = "#00754A";
            input.classList.add("is-valid");
        }
    };
}
