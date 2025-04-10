import {
    formatoAlfanumericoNoVacio,
    formatoAno,
    formatoApellidoMaterno,
    formatoApellidos,
    formatoCURP,
    formatoCelular,
    formatoDiaOMes,
    formatoEmail,
    formatoEmpleado,
    formatoGasolina,
    formatoNSS,
    formatoRFC,
    formatoTarjeta
} from "./tableFormaters.js";

let tablaInstance = null;
export const useTableVistaPrevia = () => {
    // Verificar si ya existe el DOM y la tabla
    if (!tablaInstance && $('#tablaVistaPrevia').length) {
        tablaInstance = $('#tablaVistaPrevia').bootstrapTable({
            columns: [{
                field: 'SUCURSAL',
                title: 'Sucursal',
                formatter: formatoAlfanumericoNoVacio
            }, {
                field: 'TARJETA',
                title: 'Tarjeta',
                formatter: formatoTarjeta
            }, {
                field: 'EMPLEADO',
                title: 'Empleado',
                formatter: formatoEmpleado
            }, {
                field: 'NOMBRE',
                title: 'Nombre',
                formatter: formatoAlfanumericoNoVacio
            }, {
                field: 'AP_PATERNO',
                title: 'Apellido Paterno',
                formatter: formatoApellidos
            }, {
                field: 'AP_MATERNO',
                title: 'Apellido Materno',
                formatter: formatoApellidoMaterno
            }, {
                field: 'RFC',
                title: 'RFC',
                formatter: formatoRFC
            }, {
                field: 'CURP',
                title: 'CURP',
                formatter: formatoCURP
            }, {
                field: 'NSS',
                title: 'NSS',
                formatter: formatoNSS,
                class: "columna-nss"
            }, {
                field: 'FN_AAAA',
                title: 'FN_AAAA',
                formatter: formatoAno,
                titleTooltip: 'Año de Nacimiento'
            }, {
                field: 'FN_MM',
                title: 'FN_MM',
                formatter: formatoDiaOMes,
                titleTooltip: 'Mes de Nacimiento'
            }, {
                field: 'FN_DD',
                title: 'FN_DD',
                formatter: formatoDiaOMes,
                titleTooltip: 'Día de Nacimiento'
            }, {
                field: 'Placa',
                title: 'Placa',
                formatter: formatoGasolina
            }, {
                field: 'Modelo',
                title: 'Modelo',
                formatter: formatoGasolina
            }, {
                field: 'Marca',
                title: 'Marca',
                formatter: formatoGasolina
            }, {
                field: 'CELULAR',
                title: 'Celular',
                formatter: formatoCelular
            }, {
                field: 'EMAIL',
                title: 'Email',
                formatter: formatoEmail
            }, {
                field: 'INFO_1',
                title: 'Info 1'
            }, {
                field: 'INFO_2',
                title: 'Info 2'
            }, {
                field: 'INFO_3',
                title: 'Info 3'
            }, {
                field: 'INFO_4',
                title: 'Info 4'
            }, {
                field: 'INFO_5',
                title: 'Info 5'
            }, {
                field: 'TIPO_APP',
                title: 'Tipo App'
            }],
            search: true,
            pagination: true,
            pageSize: 100,
            rowAttributes: (row, index) => ({
                id: 'row-' + index,
                'data-toggle': 'tooltip',
                'data-placement': 'top'
            })
        });
    }

    return {
        tabla: tablaInstance,
        getTableVistaPreviaData: () => tablaInstance?.bootstrapTable('getData'),
        loadTableVistaPreviaData: (data) => tablaInstance?.bootstrapTable('load', data),
        resetTableVistaPrevia: () => tablaInstance?.bootstrapTable('load', []),
        hideColumnTableVistaPrevia: (columna) => tablaInstance?.bootstrapTable('hideColumn', columna),
        showColumnTableVistaPrevia: (columna) => tablaInstance?.bootstrapTable('showColumn', columna)
    };
};

let tableResultadosAprovisionamiento = null;
export const useTableResultadoAprovisionamiento = () => {
    if (!tableResultadosAprovisionamiento && $('#tblResAprovisionamiento').length) {
        tableResultadosAprovisionamiento = $('#tblResAprovisionamiento').bootstrapTable({
            columns: [{
                field: 'vcCard',
                title: 'Tarjeta',
            }, {
                field: 'vcResult',
                title: 'Resultados',
            }],
            search: true,
            pagination: true,
            pageSize: 15,
            pageList: [10, 30, 50, 75, 100],
        });
    }
    return {
        tabla: tableResultadosAprovisionamiento,
        loadTableResultadosAprovisionamiento: (data) => tableResultadosAprovisionamiento?.bootstrapTable('load', data),
        resetTableVistaPrevia: () => tableResultadosAprovisionamiento?.bootstrapTable('load', []),
    };

}