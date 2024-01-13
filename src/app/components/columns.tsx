import { useUpdateStatus } from '@/hooks/range.hook';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Switch } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
	{
		field: 'minimum',
		headerName: 'Minimo',
		flex: 1,
	},
	{
		field: 'maximum',
		headerName: 'Maximo',
		flex: 1,
	},
	{
		field: 'status',
		headerName: 'Estado',
		minWidth: 150,
		renderCell: ({ value, row }) => <SwitchStatus value={value} row={row} />,
	},
	{
		field: 'actions',
		headerName: 'Acciones',
		minWidth: 150,
		type: 'actions',
		getActions: ({}) => {
			return [
				<Button
					sx={{ paddingX: '4px', minWidth: '0px' }}
					size="small"
					variant="contained"
					aria-label="delete"
					key="edit"
					color="primary"
				>
					<EditIcon fontSize="small" />
				</Button>,
				<Button
					sx={{ paddingX: '4px', minWidth: '0px' }}
					size="small"
					variant="contained"
					aria-label="delete"
					key="delete"
					color="error"
				>
					<DeleteIcon fontSize="small" />
				</Button>,
				<Button
					sx={{ paddingX: '4px', minWidth: '0px' }}
					size="small"
					variant="contained"
					aria-label="delete"
					key="view"
					color="info"
				>
					<VisibilityIcon fontSize="small" />
				</Button>,
			];
		},
	},
];

const SwitchStatus = ({ value, row }: any) => {
	const { mutate, isPending } = useUpdateStatus();

	return (
		<Switch
			aria-label="status"
			checked={value}
			disabled={isPending}
			onChange={(e) => {
				mutate({ id: row.id, status: e.target.checked });
			}}
		/>
	);
};
