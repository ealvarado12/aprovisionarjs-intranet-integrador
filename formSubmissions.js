import { Aprovisionamiento1, Aprovisionamiento2, Aprovisionamiento3, tarjetaVirtual, showLoaderForRequest, hideLoaderForRequest } from "./utils.js";
import { getEmpleadosDataFromTabla } from "./tableHelpers.js";
import { setMultiAssignmentsFromApi } from "./apicalls.js"
import { useTableResultadoAprovisionamiento } from "./tableManager.js";

export const formAprovisionarDescargarOnSubmit = () => {
    $("#formAprovisionarDescargar").on("submit", function (e) {
        e.preventDefault();
        const { tipoTarjeta, producto } = $(this).serializeObject()
        var regEx = /^GAS(\s\w*|(OLINA)$)/g;
        // aqui deberia estar por catalogo de productos, lo que hace es un regex que si empieza
        // por la palabra GAS te mande el aprovisonamiento2
        var productoText = $(
            '#cbProductoAprovisionarDescargar option:selected'
        ).text();

        if (tarjetaVirtual.indexOf(producto) !== -1) {

            if (tipoTarjeta == '1') {
                window.location = Aprovisionamiento1;
            } else {
                window.location = Aprovisionamiento3;
            }
        } else {
            window.location = regEx.test(productoText)
                ? Aprovisionamiento2
                : Aprovisionamiento1;
        }
    })
}

export const formAprovisionarSubmit = () => {
    $("#formAprovisionar").on("submit", function (e) {
        e.preventDefault();
        const formData = $(this).serializeObject();
        const { loadTableResultadosAprovisionamiento, resetTableVistaPrevia } = useTableResultadoAprovisionamiento();
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás realizar cambios!',
            icon: 'warning',
            showCloseButton: true,
            confirmButtonClass: 'btn-primary',
            confirmButtonText: '¡Sí, estoy seguro!',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(async (r) => {
            if (r.isConfirmed) {
                // obtener la informacion de empleados
                const empleadosFromTable = getEmpleadosDataFromTabla();
                console.log(formData);
                // virtual es un bool que solo es true cuando tipoDeTarjeta es 2
                formData.Virtual = formData.tipoTarjeta == "2"
                // resetear tabla por si se sube otro archivo
                resetTableVistaPrevia();
                showLoaderForRequest();

                try {
                    // peticion a la base
                    const postReqForMultiAssignments = await setMultiAssignmentsFromApi({
                        convenio: formData.convenio,
                        empleados: empleadosFromTable,
                        moneda: formData.moneda,
                        producto: formData.producto,
                        Virtual: formData.Virtual,
                    })
                    const postReqForMultiAssignmentsRespose = postReqForMultiAssignments?.result;
                    console.log(postReqForMultiAssignmentsRespose);

                    hideLoaderForRequest();
                    // mostrar un modal con los resultados en una tabla
                    // metodos bv5
                    const resultadosModal = new bootstrap.Modal($('#modal_ResultadoAprovisionamiento'));
                    resultadosModal.show();
                    // cargar la tabla con el modal
                    loadTableResultadosAprovisionamiento(postReqForMultiAssignmentsRespose);

                } catch (error) {
                    hideLoaderForRequest()
                    console.log(error);
                }
            }
            return;
        })
    })
}