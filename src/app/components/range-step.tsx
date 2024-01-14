import { RangeFormType } from '@/schemas/range.schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, TextField } from '@mui/material';
import { createId } from '@paralleldrive/cuid2';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface RangeStepProps {
	setActiveStep: (step: any) => void;
}
export const RangeStep = ({ setActiveStep }: RangeStepProps) => {
	const { control, formState, trigger } = useFormContext<RangeFormType>();

	const { fields, append, remove } = useFieldArray({ control, name: 'ranges' });

	const handleNextStep = () => {
		trigger('ranges');
		setTimeout(() => {
			if (formState.isDirty && !formState.errors.ranges) {
				setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
			}
		}, 100);
	};

	return (
		<Box sx={{ marginTop: '24px' }}>
			<Stack spacing={3} width="70%">
				{fields.map((item, index) => (
					<Stack key={item.id} spacing={3} direction="row" display="flex">
						<Controller
							name={`ranges.${index}.minimum`}
							control={control}
							render={({ field, fieldState }) => (
								<TextField
									{...field}
									type="number"
									label="Valor mínimo"
									variant="standard"
									error={fieldState.invalid}
									helperText={fieldState.error?.message}
									sx={{ width: '100%' }}
								/>
							)}
						/>
						<Controller
							name={`ranges.${index}.maximum`}
							control={control}
							render={({ field, fieldState }) => (
								<TextField
									{...field}
									type="number"
									label="Valor máximo"
									variant="standard"
									error={fieldState.invalid}
									helperText={fieldState.error?.message}
									sx={{ width: '100%' }}
								/>
							)}
						/>
						<Box
							sx={{
								alignSelf: 'center',
							}}
						>
							{fields.length > 1 && (
								<Button
									sx={{ paddingX: '6px', minWidth: '0px' }}
									variant="contained"
									aria-label="delete"
									key="delete"
									color="error"
									onClick={() => remove(index)}
								>
									<DeleteIcon />
								</Button>
							)}
						</Box>
					</Stack>
				))}
			</Stack>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					mt: '24px',
				}}
			>
				<Stack direction="row" spacing={2}>
					<Button
						variant="contained"
						color="primary"
						startIcon={<AddIcon />}
						onClick={() =>
							append({
								minimum: undefined as any,
								maximum: undefined as any,
								id: createId(),
							})
						}
					>
						Agregar
					</Button>
				</Stack>
				<Stack direction="row" spacing={2}>
					<Button variant="contained" color="primary" onClick={handleNextStep}>
						Siguiente
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};
