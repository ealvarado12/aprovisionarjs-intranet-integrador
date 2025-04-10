
// Cargar Css de los plugins porque no deja hacer import de un archivo de css
function loadCSS(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}
loadCSS('./styles/select2.min.css');

// libs
// se tiene que hacer esto porque no encontre la version de modules de xlsx.full.min.js
import './lib/xlsx.full.min.js'; // Carga el script pero no captura export
await new Promise(resolve => {
    if (window.XLSX) resolve();
    const check = setInterval(() => {
        if (window.XLSX) {
            clearInterval(check);
            resolve();
        }
    }, 100);
});
const XLSX = window.XLSX;
// se añaden a Jquery
import './lib/select2.min.js';
import './lib/bootstrap-table-all.js';
import './lib/bootstrap-table-es-ES.js'


import { renderAgreementOptionsMultipleSelect2Dropdowns } from "./renders.js";
import { onChangeAgreementsSelect2Dropdown, onChangeProductAgreementsSelect2Dropdown, onChangeUploadFileCargarInput } from "./events.js";
import { formAprovisionarDescargarOnSubmit, formAprovisionarSubmit } from "./formSubmissions.js";
import { useTableVistaPrevia, useTableResultadoAprovisionamiento } from "./tableManager.js";

$(document).ready(async function () {

    // renders at initialization
    await renderAgreementOptionsMultipleSelect2Dropdowns([
        {
            selectId: "#cbConvenioAprovisionarDescargar",
            select2Parent: "#formAprovisionarDescargar"
        },
        {
            selectId: "#cbConvenioAprovisionarCargar",
            select2Parent: "#formAprovisionar"
        }
    ]);
    // inicializar tabla Vista Previa;
    useTableVistaPrevia();
    // inicializar tabla Resultados Aprovisionamiento;
    useTableResultadoAprovisionamiento();

    // Events 
    onChangeAgreementsSelect2Dropdown({
        agreementSelectId: "#cbConvenioAprovisionarDescargar",
        productSelectId: "#cbProductoAprovisionarDescargar",
        formParentId: "#formAprovisionarDescargar"
    });
    onChangeAgreementsSelect2Dropdown({
        agreementSelectId: "#cbConvenioAprovisionarCargar",
        productSelectId: "#cbProductoAprovisionarCargar",
        formParentId: "#formAprovisionar"
    });
    onChangeProductAgreementsSelect2Dropdown({
        productSelectId: "#cbProductoAprovisionarDescargar",
        tarjetaContainerId: "#tipoTarjetaContainer"
    });
    onChangeProductAgreementsSelect2Dropdown({
        productSelectId: "#cbProductoAprovisionarCargar",
        tarjetaContainerId: "#tipoTarjetaContainer2"
    });
    onChangeUploadFileCargarInput();

    // Submissions
    formAprovisionarDescargarOnSubmit();
    formAprovisionarSubmit()
})


