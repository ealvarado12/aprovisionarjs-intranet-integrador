// Carga dinámica de módulos
// debido a deploys en pprod por el /pull/NumPR en la ruta
// Explicacion concreta de porque usar imports dinamicos en el main.js
// main.js necesita rutas absolutas dinámicas porque se carga desde una URL variable(dependiente del PR de Azure).
// Los imports internos(como./ utils.js) funcionan con rutas relativas porque se resuelven desde la ubicación del módulo actual(formSubmissions.js), que ya está en la ruta correcta.

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


