import { getAgreementsFromApi } from "./apicalls.js"
import { SwalError } from "./utils.js";


// NOTA: tenia una funcion donde inciaba el select2() en cada render
// Cambiado por una solucion de Deepseek porque eso era ineficiente al inicializar el select2  varias veces
// por sugerencia usar map en vez de for each , map te renderiza todo el html al iniciar y forEach en bucle uno por uno
// actualizando el DOM una sola vez 
export const renderAgreementOptionsMultipleSelect2Dropdowns = async (selectConfigurations) => {
    try {
        // 1. Validar que hay configuraciones
        if (!selectConfigurations || selectConfigurations.length === 0) {
            throw new Error('No se proporcionaron configuraciones para los selects');
        }

        // 2. Mostrar estado de carga en todos los selects
        selectConfigurations.forEach(config => {
            const select = $(config.selectId);
            if (select.length) {
                select.empty().append(
                    '<option value="" disabled selected>Cargando convenios...</option>'
                );

                // Inicializar Select2 si no está inicializado
                if (!select.hasClass('select2-hidden-accessible')) {
                    select.select2({
                        placeholder: "Selecciona un convenio",
                        allowClear: true,
                        dropdownParent: $(config.select2Parent)
                    });
                }
            }
        });

        // 3. Hacer UNA SOLA petición a la API
        const agreements = await getAgreementsFromApi();

        // 4. Generar HTML de opciones (una sola vez)
        const optionsHTML = agreements.map(item =>
            `<option value="${item.iAgreement}">${item.vcAgreement}</option>`
        ).join('');

        // 5. Actualizar todos los selects
        selectConfigurations.forEach(config => {
            const select = $(config.selectId);
            if (select.length) {
                select.empty().append(`
                    <option value="" disabled selected>Selecciona un convenio</option>
                    ${optionsHTML}
                `).trigger('change.select2');
            }
        });

    } catch (error) {
        console.error('Error en renderMultipleSelect2Dropdowns:', error);

        // Mostrar estado de error en todos los selects
        selectConfigurations.forEach(config => {
            const select = $(config.selectId);
            if (select.length) {
                select.empty().append(
                    '<option value="" disabled selected>Error al cargar convenios</option>'
                );
            }
        });

        // Mostrar notificación al usuario (solo una vez)
        SwalError({
            title: "Error",
            text: "No se pudieron obtener los convenios. Por favor, inténtalo más tarde."
        });
    }
};

export const renderOptionsProductAgreementsSelect2Dropdown = ({
    selectId,
    products,
    parentSelector
}) => {
    const select = $(selectId);

    // 1. Limpiar y preparar opciones
    const options = [
        '<option value="">Seleccione un producto</option>',
        ...products.map(item =>
            `<option value="${item.iProduct}">${item.vcDisplay}</option>`
        )
    ];

    // 2. Actualizar el select
    select.empty().append(options.join(''));

    // 3. Inicializar/Actualizar Select2
    if (!select.hasClass('select2-hidden-accessible')) {
        select.select2({
            placeholder: "Seleccione un producto",
            allowClear: true,
            dropdownParent: $(parentSelector)
        });
    } else {
        select.trigger('change.select2');
    }

    // 4. Habilitar select
    select.prop("disabled", false);
};