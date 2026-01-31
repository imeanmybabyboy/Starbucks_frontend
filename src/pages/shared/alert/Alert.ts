import * as bootstrap from "bootstrap";

export default class Alert {
    static handleAlert = (json: Record<string, string>, placeholderId: string) => {
        const alertPlaceholder = document.getElementById(placeholderId);
        
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
}