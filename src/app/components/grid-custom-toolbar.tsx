import AddIcon from '@mui/icons-material/Add';
import { Box, Button } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';

export const GridCustomToolbar = () => {
	return (
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
				<Button size="small" startIcon={<AddIcon />} onClick={() => alert('You clicked me!')}>
					Nuevo
				</Button>
			</Box>
		</Box>
	);
};
