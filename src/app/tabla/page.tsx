'use client';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Fade, Modal, Stack, Typography } from '@mui/material';
import {
	DataGrid,
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
	GridToolbarQuickFilter,
	useGridApiContext,
	useGridRootProps,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { GridInitialState } from '@mui/x-data-grid-premium';
import { useState } from 'react';

function GridCustomToolbar({ syncState }: { syncState: (stateToSave: GridInitialState) => void }) {
	const rootProps = useGridRootProps();
	const apiRef = useGridApiContext();

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				<GridToolbarDensitySelector />
				<GridToolbarExport />
				<GridToolbarQuickFilter />
			</GridToolbarContainer>

			<Box
				sx={{
					paddingX: '4px',
					paddingTop: '4px',
				}}
			>
				<Button
					size="small"
					startIcon={<AddIcon />}
					onClick={() => alert('You clicked me!')}
					{...rootProps.slotProps?.baseButton}
				>
					Nuevo
				</Button>
			</Box>
		</Box>
	);
}

export default function Home() {
	const [nbRows, setNbRows] = useState(3);
	const removeRow = () => setNbRows((x) => Math.max(0, x - 1));
	const addRow = () => setNbRows((x) => Math.min(100, x + 1));

	const { data } = useDemoData({
		dataSet: 'Commodity',
		rowLength: 100,
		maxColumns: 6,
	});

	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<main>
			<Box sx={{ width: '100%' }}>
				<Stack direction="row" spacing={1} sx={{ mb: 1 }}>
					<Button size="small" onClick={removeRow}>
						Remove a row
					</Button>
					<Button size="small" onClick={addRow}>
						Add a row
					</Button>
				</Stack>
				<DataGrid
					localeText={{
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
							count !== 1
								? `${count.toLocaleString()} filas seleccionadas`
								: `${count.toLocaleString()} fila seleccionada`,
					}}
					autoHeight
					{...data}
					rows={data.rows.slice(0, nbRows)}
					slots={{ toolbar: GridCustomToolbar }}
				/>
			</Box>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Fade in={open}>
					<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white rounded-lg shadow-lg p-4">
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Text in a modal
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
					</div>
				</Fade>
			</Modal>
		</main>
	);
}
