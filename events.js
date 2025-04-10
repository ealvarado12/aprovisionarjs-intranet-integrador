import { getAgreementsProductFromApi } from "./apicalls.js"
import { SwalError } from "./utils.js";
import { renderOptionsProductAgreementsSelect2Dropdown } from "./renders.js";
import { tarjetaVirtual, showLoaderForRequest, hideLoaderForRequest, enableCargarArchivoButton, disableCargarArchivoButton } from "./utils.js";
import { obtainXlsxFileColumns } from "./xlsxUtilities.js";
import { useTableVistaPrevia } from "./tableManager.js";
import { determinarTipoArchivo, validarColumnasXLS, cleanData, actualizarColumnasTabla, ShowErrors } from "./tableHelpers.js";

export const onChangeAgreementsSelect2Dropdown = ({
    agreementSelectId,
    productSelectId,
    formParentId
}) => {
    $(agreementSelectId).on("change", async function () {
        const agreementId = $(this).val();
        const productSelect = $(productSelectId);

        // Reiniciar el select2 de productos
        productSelect.val(null).trigger('change').prop("disabled", true);

        if (!agreementId) {
            productSelect.prop("disabled", true);
            return;
        }

        try {
            const products = await getAgreementsProductFromApi({ agreementId });
            renderOptionsProductAgreementsSelect2Dropdown({
                selectId: productSelectId,
                products,
                parentSelector: formParentId
            });
        } catch (error) {
            console.error('Error al obtener productos:', error);
            productSelect.empty().append(
                '<option value="" disabled selected>Error al cargar productos</option>'
            );
            SwalError({
                title: "Error",
                text: "No se pudieron obtener los productos del convenio"
            });
        }
    });
};

export const onChangeProductAgreementsSelect2Dropdown = ({ productSelectId, tarjetaContainerId }) => {
    $(productSelectId).on("change", function () {
        const productId = $(this).val();
        if (tarjetaVirtual.indexOf(productId) !== -1) {
            $(tarjetaContainerId).show();
        } else {
            $(tarjetaContainerId).hide();
        }

        // validar el tipo de moneda.
        if (productId === '27') {
            $('.btn-usa')
                .find('input[name=moneda]')
                .prop('checked', true);
            $("#btnusd").removeClass("disabled_moneda");
            $('#btnmx').addClass('disabled_moneda');
            $("#btnusd_input").attr("disabled", false)
            $("#btnmx_input").attr("disabled", true)
        } else {
            $('.btn-mx')
                .find('input[name=moneda]')
                .prop('checked', true);
            $("#btnmx").removeClass("disabled_moneda");
            $('#btusd').addClass('disabled_moneda');
            $("#btnusd_input").attr("disabled", true)
            $("#btnmx_input").attr("disabled", false)
        }
    })
}


export const onChangeUploadFileCargarInput = () => {
    const fileInput = $("#file_UploadFile");
    if (fileInput.length === 0) {
        console.error('Elemento #file_UploadFile no encontrado');
        return;
    }

    //Remover cualquier evento change previo para evitar duplicados
    fileInput.off('change');
    // Asignar el nuevo evento
    fileInput.on("change", function (evt) {
        const { loadTableVistaPreviaData, resetTableVistaPrevia } = useTableVistaPrevia();
        showLoaderForRequest();

        const selectedFile = evt.target.files[0];

        const regEx = /\.(xlsx|XLSX)$/i;

        if (!regEx.test(selectedFile.name)) {
            hideLoaderForRequest();
            SwalError({
                title: "Error de formato",
                text: "El archivo seleccionado no es un archivo Excel válido. Por favor, asegúrate de subir un archivo con extensión .xlsx."
            });
            return;
        }

        // Procesar el archivo
        const reader = new FileReader();

        reader.onload = function (event) {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const columns = obtainXlsxFileColumns(workbook)

                // NOTA: aqui estamos llamando una funcion dentro  de useTableVistaPrecia
                // la idea es inicializar eso una vez y luego controlar todo desde esa instancia
                resetTableVistaPrevia();
                const tipoArchivo = determinarTipoArchivo();
                console.log(tipoArchivo);
                const resultadoValidacion = validarColumnasXLS(columns, tipoArchivo);
                console.log(resultadoValidacion);
                if (!resultadoValidacion.valido) {
                    hideLoaderForRequest();
                    disableCargarArchivoButton();
                    const formatoEsperado = resultadoValidacion.formato;
                    SwalError({
                        title: 'Formato incorrecto',
                        text: `El archivo cargado no cumple con el formato requerido. Verifica el formato del archivo, el formato esperado es <b>${formatoEsperado}.</b>`,
                    });
                    return;
                }

                const XL_row_object = XLSX.utils.sheet_to_row_object_array(
                    workbook.Sheets['ALTA_DE_EMPLEADOS']
                );
                const datosXls = cleanData(XL_row_object);

                // Valida que el archivo contenga información.
                if (datosXls.length === 0) {
                    SwalError({
                        title: 'Archivo vacío',
                        text: 'El archivo cargado está vacío. Asegúrate de seleccionar un archivo que tenga datos.',
                    });
                    return;
                }
                actualizarColumnasTabla(tipoArchivo);
                loadTableVistaPreviaData(datosXls);
                $('#contenedor-vista_previa').fadeIn();
                hideLoaderForRequest();
                enableCargarArchivoButton();
                ShowErrors();

            } catch (error) {
                console.error('Error al procesar el archivo:', error);
                hideLoaderForRequest()
                SwalError({
                    title: "Error",
                    text: "Ocurrió un error al procesar el archivo. Por favor, verifica que el archivo no esté corrupto."
                });
            }
        };

        reader.onerror = function () {
            console.error('Error al leer el archivo:', reader.error);
            hideLoaderForRequest()
            SwalError({
                title: "Error de lectura",
                text: "No se pudo leer el archivo. Por favor, inténtalo nuevamente."
            });
        };

        // 8. Leer como ArrayBuffer
        reader.readAsArrayBuffer(selectedFile);
    });
};