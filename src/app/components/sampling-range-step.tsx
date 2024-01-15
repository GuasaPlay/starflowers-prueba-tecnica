import { RangeFormType } from '@/schemas/range.schema';
import { Box, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { Control, Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface SamplingRangeStepProps {
	setActiveStep: (step: any) => void;
	isPending?: boolean;
	option: 'create' | 'edit' | 'view';
}

export const SamplingRangeStep = ({ setActiveStep, isPending, option }: SamplingRangeStepProps) => {
	const { control, formState, trigger } = useFormContext<RangeFormType>();

	const { fields, append, remove } = useFieldArray({ control, name: 'ranges' });

	return (
		<Box sx={{ marginTop: '24px' }}>
			<Stack spacing={3} width="100%">
				{fields.map((item, index) => (
					<Stack key={item.id} spacing={3} direction="row" display="flex" flexWrap="wrap">
						<TextField
							disabled
							label="Rango"
							variant="standard"
							value={`${item.minimum}-${item.maximum}`}
							sx={{ flex: 1 }}
						/>

						<Sampling control={control} nestIndex={index} option={option} />
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
				<Stack direction="row" spacing={2}></Stack>
				<Stack direction="row" spacing={2}>
					<Button
						variant="outlined"
						color="primary"
						onClick={() => setActiveStep((prevActiveStep: any) => prevActiveStep - 1)}
					>
						Volver
					</Button>
					<Box sx={{ m: 1, position: 'relative' }}>
						{option !== 'view' && (
						<Button type="submit" variant="contained" color="primary" disabled={isPending}>
							{option === 'create' && 'Crear'}
							{option === 'edit' && 'Actualizar'}
						</Button>
						)}
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
			</Box>
		</Box>
	);
};

interface RangeStepProps {
	control: Control<RangeFormType>;
	nestIndex: number;
	option: 'create' | 'edit' | 'view';
}

const Sampling = ({ control, nestIndex, option }: RangeStepProps) => {
	const { fields } = useFieldArray({ control, name: `ranges.${nestIndex}.samplingRange` });

	return (
		<>
			{...fields.map((sample, i) => (
				<Controller
					key={sample.id}
					name={`ranges.${nestIndex}.samplingRange.${i}.numberSamples`}
					control={control}
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							disabled={option === 'view'}
							type="number"
							label={sample.samplingLabel}
							variant="standard"
							error={fieldState.invalid}
							// helperText={fieldState.error?.message}
							sx={{ flex: 1 }}
						/>
					)}
				/>
			))}
		</>
	);
};
