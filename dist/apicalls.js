import { getAntiForgeryTokenFromHtml, connectionUrl } from "./utils.js"

export const getAgreementsFromApi = () => {
    const apiUrl = connectionUrl + "Onboarding/Aprovisionar/GetAgreements"
    const formData = new FormData();
    formData.append('__RequestVerificationToken', getAntiForgeryTokenFromHtml());

    return fetch(apiUrl, {
        method: "POST",
        body: formData,
    }).then((response) => {
        if (response.redirected) {
            window.location.href = Server + "Account/Login?ReturnUrl=" + encodeURIComponent(window.location.pathname + window.location.search);
        }
        if (!response.ok) {
            throw new Error("error de peticions")
        }
        return response.json()
    })
}

export const getAgreementsProductFromApi = ({ agreementId }) => {
    const apiUrl = connectionUrl + "Onboarding/Aprovisionar/GetProducts"
    const formData = new FormData();
    formData.append("convenio", agreementId)
    formData.append('__RequestVerificationToken', getAntiForgeryTokenFromHtml());

    return fetch(apiUrl, {
        method: "POST",
        body: formData,
    }).then((response) => {
        if (response.redirected) {
            window.location.href = Server + "Account/Login?ReturnUrl=" + encodeURIComponent(window.location.pathname + window.location.search);
        }
        if (!response.ok) {
            throw new Error("error de peticions")
        }
        return response.json()
    })
}

export const setMultiAssignmentsFromApi = ({ convenio, producto, empleados, moneda, Virtual }) => {
    const apiUrl = connectionUrl + "Onboarding/Aprovisionar/SetMultiAssignments"

    const formData = new FormData();
    formData.append("convenio", convenio);
    formData.append("producto", producto);
    formData.append("empleados", empleados);
    formData.append("moneda", moneda);
    formData.append("Virtual", Virtual);

    formData.append('__RequestVerificationToken', getAntiForgeryTokenFromHtml());

    return fetch(apiUrl, {
        method: "POST",
        body: formData,
    }).then((response) => {
        if (response.redirected) {
            window.location.href = Server + "Account/Login?ReturnUrl=" + encodeURIComponent(window.location.pathname + window.location.search);
        }
        if (!response.ok) {
            throw new Error("error de peticions")
        }
        return response.json()
    })
}