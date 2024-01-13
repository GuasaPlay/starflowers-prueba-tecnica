'use client';

import { useRanges } from '@/hooks/range.hook';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './columns';
import { GridCustomLoading } from './grid-custom-loading';
import { GridCustomToolbar } from './grid-custom-toolbar';
import { gridLocaleText } from './grid-locale-text';

export const RangesClient = () => {
	const { data, isFetching } = useRanges();

	return (
		<Box sx={{ marginTop: '50px' }}>
			<Box sx={{ height: 400, width: '100%' }}>
				<DataGrid
					loading={isFetching}
					rows={data || []}
					columns={columns}
					editMode="row"
					localeText={gridLocaleText}
					slots={{ toolbar: GridCustomToolbar, loadingOverlay: GridCustomLoading }}
					pageSizeOptions={[5, 10, 20]}
					sx={{ backgroundColor: 'Background' }}
					initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
				/>
			</Box>
		</Box>
	);
};
