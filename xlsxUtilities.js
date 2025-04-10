export const obtainXlsxFileColumns = (workbook) => {
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const columns = [];

    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = { c: col, r: range.s.r };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        columns.push(worksheet[cellRef]?.v || `Columna ${col + 1}`);
    }
    return columns
}
/**
 * Función para validar si un string es alfanumérico (incluyendo espacios) y no vacío, con un máximo de 50 caracteres.
 * @param {string} input - El string a validar.
 * @returns {Object} - Retorna un objeto con el campo 'valido' y 'mensaje'.
 */
export function validarAlfanumericoNoVacio(input) {
    // Verifica si el string es undefined o está vacío
    if (input === undefined || String(input).trim() === '') {
        return {
            valido: false,
            mensaje: 'El string está vacío o es undefined',
        };
    }

    // Verifica si el string excede los 50 caracteres
    if (String(input).length > 50) {
        return { valido: false, mensaje: 'Excede el máximo de 50 caracteres' };
    }

    // Verifica si el string es alfanumérico (incluyendo espacios)
    const regEx = /^[a-zA-Z0-9 ]{1,50}$/;
    if (!regEx.test(input)) {
        return {
            valido: false,
            mensaje: 'El string contiene caracteres no permitidos',
        };
    }

    return { valido: true };
}
//Valida RFC
export function validaRFC(val) {
    var rfc = new RegExp(
        /^([A-Z&Ñ]{3}|[A-Z][AEIOUX][A-Z]{2})\d{2}((01|03|05|07|08|10|12)(0[1-9]|[12]\d|3[01])|02(0[1-9]|[12]\d)|(04|06|09|11)(0[1-9]|[12]\d|30))([A-Z0-9]{2}[0-9A])?$/
    );
    var valid = rfc.test(val);
    return valid ? true : false;
}
/**
 * Función para convertir un valor a mayúsculas, asegurando que no sea undefined o null.
 * @param {string} value - El valor a convertir.
 * @returns {string} - El valor convertido a mayúsculas o una cadena vacía si el valor es undefined o null.
 */
export function safeToUpperCase(value) {
    if (value === undefined || value === null) {
        return '';
    }
    return value.toString().toUpperCase();
}
/**
 * Función para validar si un string es numérico y tiene exactamente 10 dígitos.
 * @param {string} input - El string a validar.
 * @returns {boolean} - Retorna true si el string es numérico y tiene 10 dígitos.
 */
export function validarCelular(input) {
    const regEx = /^\d{10}$/;
    return regEx.test(input);
}

/**
 * Función para validar si un string es numérico y tiene exactamente 16 dígitos.
 * @param {string} input - El string a validar.
 * @returns {boolean} - Retorna true si el string es numérico y tiene 16 dígitos.
 */
export function validarTarjeta(input) {
    const regEx = /^\d{16}$/;
    return regEx.test(input);
}
/**
 * Función para validar el campo EMPLEADO.
 * @param {string} input - El string a validar.
 * @returns {Object} - Retorna un objeto con el campo 'valido' y 'mensaje'.
 */
export function validarEmpleado(input) {
    // Verifica si el string es undefined o está vacío
    if (input === undefined || String(input).trim() === '') {
        return {
            valido: false,
            mensaje: 'El string está vacío o es undefined',
        };
    }

    // Verifica si el string excede los 20 caracteres
    if (String(input).length > 20) {
        return { valido: false, mensaje: 'Excede el máximo de 20 caracteres' };
    }

    // Verifica si el string es alfanumérico (incluyendo espacios, "-", "_" y "/")
    const regEx = /^[a-zA-Z0-9\-_/ ]{1,20}$/;
    if (!regEx.test(input)) {
        return {
            valido: false,
            mensaje: 'El string contiene caracteres no permitidos',
        };
    }

    return { valido: true };
}
/**
 * Función para validar si un string es alfanumérico (incluyendo espacios), con un máximo de 50 caracteres y puede estar vacío.
 * @param {string} input - El string a validar.
 * @returns {boolean} - Retorna true si el string es alfanumérico (incluyendo espacios), con un máximo de 50 caracteres, o está vacío.
 */
export function validarAlfanumericoPermitidoVacio(input) {
    if (input === undefined || String(input).trim() === '') {
        return true;
    }
    const regEx = /^[a-zA-Z0-9 ]{0,50}$/;
    return regEx.test(input);
}

/**
 * Función para validar si un string es un email válido o está vacío.
 * @param {string} input - El string a validar.
 * @returns {boolean} - Retorna true si el string está vacío o es un email válido, false en caso contrario.
 */
export function validarEmail(input) {
    // Verifica si el string está vacío o es undefined
    if (input === undefined || String(input).trim() === '') {
        return true;
    }
    // Verifica si el string es un email válido
    const regEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regEx.test(input);
}

//valida CURP
export function validaCURP(val) {
    var curp = new RegExp(
        /[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/
    );
    var valid = curp.test(val);
    return valid ? true : false;
}

/**
 * Función para validar si un string es un número de 11 dígitos o está vacío/undefined.
 * @param {string} input - El string a validar.
 * @returns {boolean} - Retorna true si el string está vacío, es undefined o es un número de 11 dígitos.
 */
export function validarNSS(input) {
    // Verifica si el string es undefined o está vacío
    if (input === undefined || String(input).trim() === '') {
        return true;
    }
    // Verifica si el string es un número de 11 dígitos
    const regEx = /^\d{11}$/;
    return regEx.test(input);
}

/**
 * Función para validar si un string es numérico y tiene exactamente 4 dígitos.
 * @param {string | undefined} input - El string a validar.
 * @returns {boolean} - Retorna true si el string es numérico y tiene 4 dígitos, o si es undefined.
 */
export function validarAno(input) {
    if (input === undefined) {
        return true;
    }
    const regEx = /^\d{4}$/;
    return regEx.test(input);
}
/**
 * Función para validar si un string es numérico y tiene máximo 2 dígitos.
 * @param {string | undefined} input - El string a validar.
 * @returns {boolean} - Retorna true si el string es numérico y tiene máximo 2 dígitos, o si es undefined.
 */
export function validarDiaOMes(input) {
    if (input === undefined) {
        return true;
    }
    const regEx = /^\d{1,2}$/;
    return regEx.test(input);
}
