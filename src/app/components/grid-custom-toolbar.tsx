import { useSetting, useUpdateSetting } from '@/hooks/setting.hook';
import AddIcon from '@mui/icons-material/Add';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Box, Button, FormControlLabel, FormGroup, Popover, Switch, Typography } from '@mui/material';
import {
	GridToolbarColumnsButton,
	GridToolbarContainer,
	GridToolbarDensitySelector,
	GridToolbarExport,
	GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { RangeForm } from './range-form';

export const GridCustomToolbar = () => {
	const [open, setOpen] = useState(false);

	const { data, isSuccess } = useSetting();

	const [permission, setPermission] = useState({
		isEdit: false,
		isView: false,
		isDelete: false,
		isComment: false,
	});

	useEffect(() => {
		if (isSuccess && data) {
			setPermission({
				isEdit: data.isEdit,
				isView: data.isView,
				isDelete: data.isDelete,
				isComment: data.isComment,
			});
		}
	}, [data, isSuccess]);

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const openPopper = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const { mutate, isPending } = useUpdateSetting();

	useEffect(() => {
		mutate({ settingId: data?.id || '', ...permission }, { onSuccess: () => {} });

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mutate, permission]);

	return (
		<>
			<RangeForm open={open} setOpen={setOpen} option="create" range={undefined} />
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
					<>
						<Button size="small" startIcon={<FingerprintIcon />} aria-describedby={id} onClick={handleClick}>
							Permisos
						</Button>
						<Popover
							id={id}
							open={openPopper}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
						>
							<Box sx={{ position: 'relative' }}>
								<Typography sx={{ padding: '10px' }}>Permitir a los usuarios:</Typography>

								<Box sx={{ padding: '10px' }}>
									<FormGroup>
										<FormControlLabel
											control={
												<Switch
													checked={permission.isEdit}
													onChange={(e) => setPermission({ ...permission, isEdit: e.target.checked })}
												/>
											}
											label="Editar"
										/>
										<FormControlLabel
											control={
												<Switch
													checked={permission.isView}
													onChange={(e) => setPermission({ ...permission, isView: e.target.checked })}
												/>
											}
											label="Visualizar"
										/>
										<FormControlLabel
											control={
												<Switch
													checked={permission.isDelete}
													onChange={(e) => setPermission({ ...permission, isDelete: e.target.checked })}
												/>
											}
											label="Eliminar"
										/>
										<FormControlLabel
											control={
												<Switch
													checked={permission.isComment}
													onChange={(e) => setPermission({ ...permission, isComment: e.target.checked })}
												/>
											}
											label="Comentar"
										/>
									</FormGroup>
								</Box>
							</Box>
						</Popover>
					</>
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
