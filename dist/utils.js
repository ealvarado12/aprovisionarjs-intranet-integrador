export let connectionUrl = Server

export const getAntiForgeryTokenFromHtml = () => {
    let value = $(
        "input[name=__RequestVerificationToken]"
    ).val();
    return value;
};

export const SwalError = ({ title, text }) => {
    return Swal.fire({
        icon: 'warning',
        title: title,
        text: text,
        confirmButtonText: "OK"
    });
};

export const showLoaderForRequest = () => {
    showLoader()
}
export const hideLoaderForRequest = () => {
    hideLoader()
}
export const enableCargarArchivoButton = () => {
    $("#btnCargar").attr("disabled", false)
}
export const disableCargarArchivoButton = () => {
    $("#btnCargar").attr("disabled", true)
}

// Contexts

export var tarjetaVirtual = ['4', '32', '43', '50'];

// file links
export let Aprovisionamiento1 = Server + 'Documents/Aprovisionamiento/Aprovisionamiento1.xlsx';
export let Aprovisionamiento2 = Server + 'Documents/Aprovisionamiento/Aprovisionamiento2.xlsx';
export let Aprovisionamiento3 = Server + 'Documents/Aprovisionamiento/Aprovisionamiento3.xlsx';

// CDN UTILS
export const BASECDNPATH = "https://ealvarado12.github.io/aprovisionarjs-intranet-integrador"
export function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}
