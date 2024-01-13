import { GridLocaleText } from '@mui/x-data-grid';

export const gridLocaleText: Partial<GridLocaleText> = {
	toolbarColumns: 'Columnas',
	toolbarFilters: 'Filtros',
	toolbarDensity: 'Densidad',
	toolbarDensityComfortable: 'Confortable',
	toolbarDensityCompact: 'Compacto',
	toolbarDensityStandard: 'Estandar',
	toolbarExport: 'Exportar',
	toolbarExportCSV: 'Exportar a CSV',
	toolbarExportPrint: 'Imprimir',
	MuiTablePagination: {
		labelRowsPerPage: 'Filas por página:',
		labelDisplayedRows({ from, to, count }) {
			return `${from}-${to} de ${count}`;
		},
	},
	footerRowSelected: (count) =>
		count !== 1 ? `${count.toLocaleString()} filas seleccionadas` : `${count.toLocaleString()} fila seleccionada`,
};
