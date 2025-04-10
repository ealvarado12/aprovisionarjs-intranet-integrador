import { tarjetaVirtual } from "./utils.js";
import { useTableVistaPrevia } from "./tableManager.js";


/**
 * Función para determinar el tipo de archivo a validar basado en la información del formulario.
 * @returns {number} - El tipo de archivo (1, 2, o 3).
 */
export function determinarTipoArchivo() {
    var formData = $('#formAprovisionar').serializeObject();
    var regEx = /^GAS(\s\w*|(OLINA)$)/g;
    var producto = $('#cbProductoAprovisionarCargar option:selected').text();

    // Verifica si el producto es una tarjeta virtual
    if (tarjetaVirtual.indexOf(formData.producto) !== -1) {
        // Si es tarjeta virtual, verifica el tipo de tarjeta
        if (formData.tipoTarjeta == '1') {
            return 1; // Aprovisionamiento1
        } else {
            return 3; // Aprovisionamiento3
        }
    } else {
        // Si no es tarjeta virtual, verifica si coincide con la expresión regular
        return regEx.test(producto) ? 2 : 1;
    }
};

/**
 * Constantes de los nombres de las columnas requeridas para cada tipo.
 */
//Monederos y Viaticos - Aprovisionamiento1
const COLUMNS_TYPE_1 = [
    'SUCURSAL',
    'TARJETA',
    'EMPLEADO',
    'NOMBRE',
    'AP_PATERNO',
    'AP_MATERNO',
    'RFC',
    'CURP',
    'NSS',
    'FN_AAAA',
    'FN_MM',
    'FN_DD',
    'CELULAR',
    'EMAIL',
    'INFO_1',
    'INFO_2',
    'INFO_3',
    'INFO_4',
    'INFO_5',
    'TIPO_APP',
];
//Gasolina -  Aprovisionamiento2
const COLUMNS_TYPE_2 = [
    'SUCURSAL',
    'TARJETA',
    'EMPLEADO',
    'NOMBRE',
    'AP_PATERNO',
    'AP_MATERNO',
    'Placa',
    'Modelo',
    'Marca',
    'CELULAR',
    'EMAIL',
    'INFO_1',
    'INFO_2',
    'INFO_3',
    'INFO_4',
    'INFO_5',
    'TIPO_APP',
];
//Virtual - Aprovisionamiento3
const COLUMNS_TYPE_3 = [
    'SUCURSAL',
    'EMPLEADO',
    'NOMBRE',
    'AP_PATERNO',
    'AP_MATERNO',
    'RFC',
    'CURP',
    'NSS',
    'FN_AAAA',
    'FN_MM',
    'FN_DD',
    'CELULAR',
    'EMAIL',
    'INFO_1',
    'INFO_2',
    'INFO_3',
    'INFO_4',
    'INFO_5',
    'TIPO_APP',
];

/**
 * Función para validar los nombres de las columnas de un archivo XLS basado en el tipo.
 * @param {Array<string>} columns - Arreglo con los nombres de las columnas del archivo XLS.
 * @param {number} tipo - Tipo de validación (1, 2, o 3).
 * @returns {Object} - Retorna un objeto con 'valido' y 'formato'.
 */
export function validarColumnasXLS(columns, tipo) {

    let requiredColumns;
    let formato;

    switch (tipo) {
        case 1:
            requiredColumns = COLUMNS_TYPE_1;
            formato = 'Aprovisionamiento1';
            break;
        case 2:
            requiredColumns = COLUMNS_TYPE_2;
            formato = 'Aprovisionamiento2';
            break;
        case 3:
            requiredColumns = COLUMNS_TYPE_3;
            formato = 'Aprovisionamiento3';
            break;
        default:
            throw new Error('Tipo inválido. Debe ser 1, 2, o 3.');
    }

    const columnasDiferentesNombres = requiredColumns.filter((col) => !columns.includes(col));

    return {
        valido: columns.length === requiredColumns.length && columnasDiferentesNombres.length === 0,
        formato: formato,
    };
}

/**
 * Función para limpiar datos del archivo Excel.
 * - Elimina espacios al inicio y final de los valores de cadena.
 * - Reemplaza saltos de línea y retornos de carro en las cadenas.
 * - Elimina filas que están completamente vacías.
 *
 * @param {Array<Object>} data - Arreglo de objetos a limpiar.
 * @returns {Array<Object>} - Arreglo de objetos limpiados.
 */
export function cleanData(data) {
    return data
        .map((item) => {
            let cleanedItem = {};
            for (let key in item) {
                if (typeof item[key] === 'string') {
                    // Eliminar espacios al inicio y final, y reemplazar saltos de línea y retornos de carro
                    cleanedItem[key] = item[key].trim().replace(/[\n\r]+/g, '');
                } else {
                    cleanedItem[key] = item[key];
                }
            }
            return cleanedItem;
        })
        .filter((item) => {
            // Verificar si todas las propiedades del objeto están vacías
            return Object.values(item).some((value) => value !== '');
        });
}

export function actualizarColumnasTabla(tipoArchivo) {
    const { hideColumnTableVistaPrevia, showColumnTableVistaPrevia } = useTableVistaPrevia();

    const columnasMostrarTipo1y3 = [
        'FN_AAAA',
        'FN_MM',
        'FN_DD',
        'RFC',
        'CURP',
        'NSS',
    ];
    const columnasOcultarTipo1y3 = ['Placa', 'Modelo', 'Marca'];
    const columnasMostrarTipo2 = ['Placa', 'Modelo', 'Marca'];
    const columnasOcultarTipo2 = [
        'FN_AAAA',
        'FN_MM',
        'FN_DD',
        'RFC',
        'CURP',
        'NSS',
    ];

    // Mostrar u ocultar columnas basado en tipoArchivo
    if (tipoArchivo === 1 || tipoArchivo === 3) {
        columnasMostrarTipo1y3.forEach((columna) =>
            showColumnTableVistaPrevia(columna)
        );
        columnasOcultarTipo1y3.forEach((columna) =>
            hideColumnTableVistaPrevia(columna)
        );
        if (tipoArchivo === 3) {
            hideColumnTableVistaPrevia("TARJETA")
        }
    } else if (tipoArchivo === 2) {
        columnasMostrarTipo2.forEach((columna) =>
            showColumnTableVistaPrevia(columna)
        );
        columnasOcultarTipo2.forEach((columna) =>
            hideColumnTableVistaPrevia(columna)
        );
    }
}


// FUNCION REMOVIDA SEGUN EL REQ OC-SIS-280325-03 Ajuste y mejora de pantalla Aprovisionamiento
// function validarDatosTabla() {
//     const { getTableVistaPreviaData } = useTableVistaPrevia()
//     const data = getTableVistaPreviaData()
//     data.forEach((row, index) => {
//         const tieneCelular = 'CELULAR' in row;
//         const tieneEmail = 'EMAIL' in row;

//         if (!tieneCelular && !tieneEmail) {
//             $(`#row-${index}`).addClass('errorDiv');
//             $(`#row-${index}`).attr(
//                 'title',
//                 'Se requiere ingresar al menos un número de celular o una dirección de correo electrónico.'
//             );
//         }
//     });
// }

export function ShowErrors() {
    // validarDatosTabla();
    const vistaPreviaValida = $('#tablaVistaPrevia .errorDiv').length === 0;

    if (!vistaPreviaValida) {
        $('#btnCargar').prop('disabled', true);
        $('[data-toggle="popover"]').popover();
        $('[data-toggle="tooltip"]').tooltip();
        $('#btnCargar').prop('disabled', true);
    } else {
        $('#btnCargar').prop('disabled', false);
    }
}

export function getEmpleadosDataFromTabla() {
    const { getTableVistaPreviaData } = useTableVistaPrevia();
    const data = getTableVistaPreviaData();
    const tipoArchivo = determinarTipoArchivo();

    // Definición de los formatos por tipo de archivo
    const formatos = {
        1: ['SUCURSAL', 'TARJETA', 'EMPLEADO', 'NOMBRE', 'AP_PATERNO', 'AP_MATERNO',
            'RFC', 'CURP', 'NSS', 'FN_AAAA', 'FN_MM', 'FN_DD', 'CELULAR', 'EMAIL',
            'INFO_1', 'INFO_2', 'INFO_3', 'INFO_4', 'INFO_5'],
        2: ['SUCURSAL', 'TARJETA', 'EMPLEADO', 'NOMBRE', 'AP_PATERNO', 'AP_MATERNO',
            'Placa', 'Modelo', 'Marca', 'CELULAR', 'EMAIL',
            'INFO_1', 'INFO_2', 'INFO_3', 'INFO_4', 'INFO_5'],
        3: ['SUCURSAL', 'CELULAR', 'EMPLEADO', 'NOMBRE', 'AP_PATERNO', 'AP_MATERNO',
            'RFC', 'CURP', 'NSS', 'FN_AAAA', 'FN_MM', 'FN_DD', 'EMAIL',
            'INFO_1', 'INFO_2', 'INFO_3', 'INFO_4', 'INFO_5', 'TIPO_APP']
    };

    // Verificar que el tipo de archivo es válido
    if (!formatos[tipoArchivo]) {
        console.error('Tipo de archivo no válido:', tipoArchivo);
        return [];
    }

    // Función para obtener valores seguros
    const getSafeValue = (value) => value === undefined ? '' : value;

    // Procesar los datos
    const informacionAprovisionar = data.map(empleado => {
        return formatos[tipoArchivo]
            .map(campo => getSafeValue(empleado[campo]))
            .join('|');
    });

    return informacionAprovisionar.join('\n');
}