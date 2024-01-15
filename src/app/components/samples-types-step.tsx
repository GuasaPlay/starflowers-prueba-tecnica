import { RangePayload } from '@/actions/range.actions';
import { RangeFormType } from '@/schemas/range.schema';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Stack, TextField } from '@mui/material';
import { createId } from '@paralleldrive/cuid2';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface RangeStepProps {
	setActiveStep: (step: any) => void;
	option: 'create' | 'edit' | 'view';
	range?: RangePayload;
}
export const SamplesTypesStep = ({ setActiveStep, option, range }: RangeStepProps) => {
	const { control, trigger, getValues, setValue, getFieldState } = useFormContext<RangeFormType>();

	const { fields, append, remove } = useFieldArray({ control, name: 'samplesTypes' });

	const handleNextStep = () => {
		trigger('samplesTypes');
		setTimeout(() => {
			const fieldState = getFieldState('samplesTypes');

			if (!fieldState.invalid) {
				const ranges = getValues('ranges');

				const samplesTypes = getValues('samplesTypes');

				const newRanges: any = ranges!.map(({ id, maximum, minimum, samplingRange }) => {
					return {
						id,
						maximum,
						minimum,
						samplingRange: samplesTypes!.map((sample) => ({
							id: createId(),
							rangeLabel: `${minimum}-${maximum}`,
							rangeId: id,
							numberSamples:
								range?.samplingRanges.find((sampling) => sampling.sampling.id === sample.id)?.numberSamples ||
								undefined,
							samplingId: sample.id,
							samplingLabel: sample.name,
						})),
					};
				});

				setValue('ranges', newRanges);

				setActiveStep((prevActiveStep: any) => prevActiveStep + 1);
			}
		}, 100);
	};

	return (
		<Box sx={{ marginTop: '24px' }}>
			<Stack spacing={3} width="50%">
				{fields.map((item, index) => (
					<Stack key={item.id} spacing={3} direction="row" display="flex">
						<Controller
							name={`samplesTypes.${index}.name`}
							control={control}
							render={({ field, fieldState }) => (
								<TextField
									{...field}
									disabled={option === 'view'}
									label="Nombre"
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
							{fields.length > 1 && option !== 'view' && (
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
					{option !== 'view' && (
						<Button
							variant="contained"
							color="primary"
							startIcon={<AddIcon />}
							onClick={() =>
								append({
									id: createId(),
									name: '',
								})
							}
						>
							Agregar
						</Button>
					)}
				</Stack>
				<Stack direction="row" spacing={2}>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => setActiveStep((prevActiveStep: any) => prevActiveStep - 1)}
					>
						Volver
					</Button>
					<Button variant="contained" color="primary" onClick={handleNextStep}>
						Siguiente
					</Button>
				</Stack>
			</Box>
		</Box>
	);
};
