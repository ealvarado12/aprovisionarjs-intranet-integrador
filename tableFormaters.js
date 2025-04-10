import {
    safeToUpperCase,
    validaRFC,
    validarAlfanumericoNoVacio,
    validarAlfanumericoPermitidoVacio,
    validarCelular,
    validarEmail,
    validarEmpleado,
    validarTarjeta,
    validaCURP,
    validarNSS,
    validarAno,
    validarDiaOMes
} from "./xlsxUtilities.js"
import { determinarTipoArchivo } from "./tableHelpers.js";

export function formatoAlfanumericoNoVacio(value) {
    if (value === undefined || value === '') {
        return `<div class='errorDiv' title='Este campo es obligatorio.' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
    }

    const validaNombre = validarAlfanumericoNoVacio(value);
    if (validaNombre.valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='${validaNombre.mensaje}' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}

export function formatoTarjeta(value) {
    const valido = validarTarjeta(value);

    if (valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}


// Función de formato para la columna EMPLEADO
export function formatoEmpleado(value) {
    if (value === undefined || value === '') {
        return `<div class='errorDiv' title='Este campo es obligatorio.' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
    }

    const validaNombre = validarEmpleado(value);
    if (validaNombre.valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='${validaNombre.mensaje}' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}


export function formatoApellidos(value) {
    const producto = $('#cbProductoAprovisionarCargar option:selected').text();
    const productosApellidoObligatorio = [
        'MONEDERO VALE DESPENSA',
        'VIATICOS y GASTOS',
        'ABIERTO(CREDITO)',
        'MASTER CARD BLACK MX',
        'MASTER CARD BLACK DLLS',
        'VIATICOS y GASTOS CHIP',
        'MONEDERO VALE DESPENSA CHIP',
        'MASTER CARD CHIP',
        'CREDITOS CARNET',
        'CREDITOS MASTERCARD',
        'CREDITOS VISA',
    ];

    const validaObligatorio =
        productosApellidoObligatorio.indexOf(producto) !== -1;

    if (validaObligatorio) {
        if (value === undefined || value === '') {
            return `<div class='errorDiv' title='Este campo es obligatorio para el producto ${producto}' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    const valido = validarAlfanumericoPermitidoVacio(value);

    if (valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}


export function formatoApellidoMaterno(value) {
    const producto = $('#cbProductoAprovisionarCargar option:selected').text();
    const productosApellidoObligatorio = [
        'MONEDERO VALE DESPENSA',
        'VIATICOS y GASTOS',
        //'ABIERTO(CREDITO)',
        'MASTER CARD BLACK MX',
        'MASTER CARD BLACK DLLS',
        'VIATICOS y GASTOS CHIP',
        'MONEDERO VALE DESPENSA CHIP',
        'MASTER CARD CHIP',
        'CREDITOS CARNET',
        'CREDITOS MASTERCARD',
        'CREDITOS VISA',
    ];

    const validaObligatorio =
        productosApellidoObligatorio.indexOf(producto) !== -1;

    // Si el valor es " " (espacio), es válido
    if (value === ' ') {
        return `<div data-toggle='tooltip' data-placement='right'>&nbsp;</div>`;
    }

    // Validación de obligatoriedad para productos específicos
    if (validaObligatorio) {
        if (value === undefined || value === '') {
            return `<div class='errorDiv' title='Este campo es obligatorio para el producto ${producto}' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    // Validación general de alfanuméricos permitidos y vacíos
    const valido = validarAlfanumericoPermitidoVacio(value);

    if (valido) {
        // Si el valor es undefined, devolvemos una cadena vacía
        const safeValue = value === undefined ? '' : value;
        return `<div data-toggle='tooltip' data-placement='right'>${safeValue}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}


export function formatoRFC(value) {
    const producto = $('#cbProductoAprovisionarCargar option:selected').text();
    const productosApellidoObligatorio = [
        'MONEDERO VALE DESPENSA',
        'MONEDERO VALE DESPENSA CHIP',
    ];

    const validaObligatorio =
        productosApellidoObligatorio.indexOf(producto) !== -1;

    if (validaObligatorio) {
        if (value === '' || value === undefined) {
            return `<div class='errorDiv' title='Este campo es obligatorio para el producto ${producto}' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    if (value === undefined) {
        return `<div data-toggle='tooltip' data-placement='right'>&nbsp;</div>`;
    }

    value = safeToUpperCase(value);
    const valido = validaRFC(value);

    if (valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}

export function formatoCURP(value) {
    const producto = $('#cbProductoAprovisionarCargar option:selected').text();
    const productosApellidoObligatorio = [
        'MONEDERO VALE DESPENSA',
        'MONEDERO VALE DESPENSA CHIP',
    ];

    const validaObligatorio =
        productosApellidoObligatorio.indexOf(producto) !== -1;

    if (validaObligatorio) {
        if (value === '' || value === undefined) {
            return `<div class='errorDiv' title='Este campo es obligatorio para el producto ${producto}' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    if (value === undefined) {
        return `<div data-toggle='tooltip' data-placement='right'>&nbsp;</div>`;
    }

    value = safeToUpperCase(value);
    const valido = validaCURP(value);

    if (valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}

export function formatoGasolina(value) {
    const tipoArchivo = determinarTipoArchivo();

    if (tipoArchivo === 2) {
        if (value === undefined || value === '') {
            return `<div class='errorDiv' title='El campo está vacío. Por favor, ingrese un valor.' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
}

export function formatoNSS(value) {
    if (value === undefined) {
        return `<div data-toggle='tooltip' data-placement='right'>&nbsp;</div>`;
    }

    const nssValido = validarNSS(value);

    if (nssValido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}

export function formatoAno(value) {
    const tipoArchivo = determinarTipoArchivo();
    if (tipoArchivo === 2) {
        return '';
    }

    const producto = $('#cbProductoAprovisionarCargar option:selected').text();
    const productosApellidoObligatorio = [
        'ABIERTO(CREDITO)',
        'VIATICOS y GASTOS',
        'MASTER CARD BLACK MX',
        'MASTER CARD BLACK DLLS',
        'VIATICOS y GASTOS CHIP',
        'MASTER CARD CHIP',
        'CREDITOS CARNET',
        'CREDITOS MASTERCARD',
        'CREDITOS VISA',
        'UTILES ESCOLARES',
    ];

    const validaObligatorio =
        productosApellidoObligatorio.indexOf(producto) !== -1;

    if (validaObligatorio) {
        if (value === '') {
            return `<div class='errorDiv' title='Este campo es obligatorio para el producto ${producto}' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    const valido = validarAno(value);

    if (valido) {
        value = value || '';

        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        value = value || '&nbsp;';

        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}

export function formatoDiaOMes(value) {
    const tipoArchivo = determinarTipoArchivo();
    if (tipoArchivo === 2) {
        return '';
    }

    const producto = $('#cbProductoAprovisionarCargar option:selected').text();
    const productosApellidoObligatorio = [
        'ABIERTO(CREDITO)',
        'VIATICOS y GASTOS',
        'MASTER CARD BLACK MX',
        'MASTER CARD BLACK DLLS',
        'VIATICOS y GASTOS CHIP',
        'MASTER CARD CHIP',
        'CREDITOS CARNET',
        'CREDITOS MASTERCARD',
        'CREDITOS VISA',
        'UTILES ESCOLARES',
    ];

    const validaObligatorio =
        productosApellidoObligatorio.indexOf(producto) !== -1;

    if (validaObligatorio) {
        if (value === '') {
            return `<div class='errorDiv' title='Este campo es obligatorio para el producto ${producto}' data-toggle='tooltip' data-placement='left'>&nbsp;</div>`;
        }
    }

    const valido = validarDiaOMes(value);

    if (valido) {
        value = value || '';

        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        value = value || '&nbsp;';

        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}



export function formatoCelular(value) {
    if (value === undefined) {
        return `<div data-toggle='tooltip' data-placement='right'>&nbsp;</div>`;
    }

    const telefonoSinEspacios = String(value).replace(/\D/g, '');
    const valido = validarCelular(telefonoSinEspacios);

    if (valido) {
        return `<div data-toggle='tooltip' data-placement='right'>${telefonoSinEspacios}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${telefonoSinEspacios}</div>`;
    }
}



export function formatoEmail(value) {
    if (value === undefined) {
        return `<div data-toggle='tooltip' data-placement='right'>&nbsp;</div>`;
    }

    const emailValido = validarEmail(value);

    if (emailValido) {
        return `<div data-toggle='tooltip' data-placement='right'>${value}</div>`;
    } else {
        return `<div class='errorDiv' title='Formato Incorrecto.' data-toggle='tooltip' data-placement='left'>${value}</div>`;
    }
}