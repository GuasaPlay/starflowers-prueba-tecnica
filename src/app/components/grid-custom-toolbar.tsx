import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { useState } from 'react';
import { RangeForm } from './range-form';

export const GridCustomToolbar = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<RangeForm open={open} setOpen={setOpen} />
			<Box
				sx={{
					marginTop: '4px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<GridToolbarContainer>
					<GridToolbarColumnsButton />
					<GridToolbarFilterButton />
					<GridToolbarDensitySelector />
					<GridToolbarExport />
				</GridToolbarContainer>

				<Box
					sx={{
						paddingX: '4px',
						paddingTop: '4px',
					}}
				>
					<Button size="small" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
						Nuevo rango
					</Button>
				</Box>
			</Box>
		</>
	);
};
