import { useDeleteSamplingRange, useUpdateStatus } from '@/hooks/range.hook';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
	Box,
	Button,
	CircularProgress,
	DialogProps,
	Fade,
	IconButton,
	Modal,
	Stack,
	Switch,
	Typography,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useState } from 'react';
import { RangeEditForm } from './range-edit-form';

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
		getActions: ({ row }) => {
			return ButtonsActions({ row });
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

const ButtonsActions = ({ row }: any) => {
	return [...UpdateWrapper({ row }), <DeleteWrapper row={row} key="delete" />];
};

const UpdateWrapper = ({ row }: any) => {
	const [open, setOpen] = useState(false);

	return [
		<Button
			sx={{ paddingX: '4px', minWidth: '0px' }}
			size="small"
			variant="contained"
			aria-label="delete"
			key="edit"
			color="primary"
			onClick={() => setOpen(true)}
		>
			<EditIcon fontSize="small" />
		</Button>,
		<RangeEditForm open={open} setOpen={setOpen} key="edit-form" />,
		<Button
			sx={{ paddingX: '4px', minWidth: '0px' }}
			size="small"
			variant="contained"
			aria-label="delete"
			key="view"
			color="info"
			onClick={() => setOpen(true)}
		>
			<VisibilityIcon fontSize="small" />
		</Button>,
	];
};

const DeleteWrapper = ({ row }: any) => {
	const [open, setOpen] = useState(false);

	const { mutate, isPending } = useDeleteSamplingRange();

	const handleClose: DialogProps['onClose'] = (event, reason) => {
		if (reason && reason === 'backdropClick' && isPending) return;
		setOpen(false);
	};

	const handleDelete = () => {
		mutate(
			{ id: row.id },
			{
				onSuccess: () => {
					setOpen(false);
				},
			}
		);
	};

	return (
		<>
			<Button
				sx={{ paddingX: '4px', minWidth: '0px' }}
				size="small"
				variant="contained"
				aria-label="delete"
				key="delete"
				color="error"
				onClick={() => setOpen(true)}
			>
				<DeleteIcon fontSize="small" />
			</Button>

			<Modal open={open} onClose={handleClose} disableEscapeKeyDown>
				<Fade in={open}>
					<div className="min-w-[50%] max-w-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-lg shadow-lg p-4">
						<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
							<Typography variant="h6" component="h2">
								Eliminar rango
							</Typography>

							<IconButton aria-label="delete" onClick={() => setOpen(false)} disabled={isPending}>
								<CloseIcon />
							</IconButton>
						</Box>

						<Box sx={{ width: '100%' }}>
							<Typography variant="body1" component="p">
								¿Estas seguro de eliminar el rango {row.minimum} - {row.maximum}?
							</Typography>
						</Box>

						<Stack
							spacing={2}
							direction="row"
							sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '30px' }}
						>
							<Button variant="outlined" onClick={() => setOpen(false)} disabled={isPending}>
								Cancelar
							</Button>

							<Box sx={{ m: 1, position: 'relative' }}>
								<Button variant="contained" color="error" onClick={handleDelete} disabled={isPending}>
									Eliminar
								</Button>
								{isPending && (
									<CircularProgress
										size={24}
										sx={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											marginTop: '-12px',
											marginLeft: '-12px',
										}}
									/>
								)}
							</Box>
						</Stack>
					</div>
				</Fade>
			</Modal>
		</>
	);
};
