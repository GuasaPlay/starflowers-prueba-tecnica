import { RangePayload } from '@/actions/range.actions';
import { useCreateSamplingRange, useUpdateSamplingRange } from '@/hooks/range.hook';
import { RangeFormType, RangeSchema } from '@/schemas/range.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Fade, IconButton, Modal, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { createId } from '@paralleldrive/cuid2';
import { detailedDiff } from 'deep-object-diff';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RangeStep } from './range-step';
import { SamplesTypesStep } from './samples-types-step';
import { SamplingRangeStep } from './sampling-range-step';

interface RangeFormProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	option: 'create' | 'edit' | 'view';
	range?: RangePayload;
}

const isSuccess = false;

export const RangeForm = ({ open, setOpen, option, range }: RangeFormProps) => {
	const title = option === 'create' ? 'Crear rango' : option === 'edit' ? 'Editar rango' : 'Visualizar rango';

	const [activeStep, setActiveStep] = useState(0);

	const handleClose = () => {
		setOpen(false);
		setActiveStep(0);
	};

	const defaultValues: RangeFormType = {
		ranges: [{ minimum: undefined as any, maximum: undefined as any, id: createId(), samplingRange: [] }],
		samplesTypes: [{ name: '', id: createId() }],
	};

	const formValues = useMemo<RangeFormType>(
		() =>
			(option === 'edit' || option === 'view') && range
				? {
						ranges: [
							{
								id: range.id,
								minimum: range.minimum,
								maximum: range.maximum,
								samplingRange: range.samplingRanges.map((sampling) => ({
									id: sampling.id,
									rangeId: range.id,
									rangeLabel: `${range.minimum}-${range.maximum}`,
									numberSamples: sampling.numberSamples,
									samplingId: sampling.sampling.id,
									samplingLabel: sampling.sampling.name,
								})),
							},
						],
						samplesTypes: range.samplingRanges.map((sampling) => ({
							id: sampling.sampling.id,
							name: sampling.sampling.name,
						})),
				  }
				: defaultValues,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[option, range]
	);

	const form = useForm<RangeFormType>({
		resolver: yupResolver(RangeSchema),
		values: formValues,
		mode: 'all',
	});

	const { mutate: mutateCreate, isPending: isPendingCreate } = useCreateSamplingRange();

	const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateSamplingRange();

	const onSubmit = async ({ ranges, samplesTypes }: RangeFormType) => {
		const rangeData = ranges!.map((range) => {
			return {
				status: true,
				minimum: range.minimum,
				maximum: range.maximum,
				id: range.id,
			};
		});

		const samplingData = samplesTypes!.map((sample) => ({
			name: sample.name,
			id: sample.id,
		}));

		const samplingRangeData = ranges!
			.map((range) => {
				return range.samplingRange!.map((sampling) => {
					return {
						id: sampling.id,
						numberSamples: sampling.numberSamples,
						rangeId: range.id,
						samplingId: sampling.samplingId,
					};
				});
			})
			.flat();

		if (option === 'create') {
			mutateCreate(
				{
					range: rangeData,
					sampling: samplingData,
					samplingRange: samplingRangeData,
				},
				{
					onSuccess: () => {
						setOpen(false);
						setActiveStep(0);
						form.reset();
					},
				}
			);
		}

		if (option === 'edit') {
			if (!range) return;

			const rangeData = ranges![0];

			const oldSamplesTypesCleaned = range.samplingRanges.map((sample) => ({
				id: sample.sampling.id,
				name: sample.sampling.name,
			}));

			const samplesTypesDiff = detailedDiff(oldSamplesTypesCleaned, samplesTypes!);

			const addedArray = Object.values(samplesTypesDiff.added);

			const oldSamplingRangeCleaned = range.samplingRanges.map((sampling) => ({
				id: sampling.id,
				numberSamples: sampling.numberSamples,
				rangeId: sampling.rangeId,
				samplingId: sampling.sampling.id,
			}));

			const samplingRangeDiff = detailedDiff(oldSamplingRangeCleaned, samplingRangeData);

			const addedSamplingRangeArray = Object.values(samplingRangeDiff.added);

			const samplingData = addedArray.map((sample) => ({
				name: sample.name,
				id: sample.id,
			}));

			const samplingRangeDataToCreate = addedSamplingRangeArray.map((sampling) => ({
				id: sampling.id,
				numberSamples: sampling.numberSamples,
				rangeId: sampling.rangeId,
				samplingId: sampling.samplingId,
			}));

			const updatedSamplingRangeArray = Object.values(samplingRangeDiff.updated);

			const samplingRangeDataToUpdate = updatedSamplingRangeArray.map((sampling) => ({
				id: sampling.id,
				numberSamples: sampling.numberSamples,
			}));

			mutateUpdate(
				{
					rangeId: rangeData.id,
					range: {
						maximum: rangeData.maximum,
						minimum: rangeData.minimum,
					},
					sampling: samplingData,
					samplingRangeToCreate: samplingRangeDataToCreate,
					samplingRangeToUpdate: samplingRangeDataToUpdate,
				},
				{
					onSuccess: () => {
						setOpen(false);
						setActiveStep(0);
						form.reset();
					},
				}
			);
		}
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Fade in={open}>
				<div className="min-w-[80%] max-w-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-lg shadow-lg p-4">
					<Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
						<Typography variant="h6" component="h2">
							{title}
						</Typography>

						<IconButton
							aria-label="delete"
							onClick={() => setOpen(false)}
							disabled={isPendingCreate || isPendingUpdate}
						>
							<CloseIcon />
						</IconButton>
					</Box>

					<Box sx={{ width: '100%', marginTop: '24px' }}>
						<Stepper activeStep={activeStep}>
							<Step key={0} completed>
								<StepLabel>Rango</StepLabel>
							</Step>
							<Step key={1}>
								<StepLabel>Tipo de muestra</StepLabel>
							</Step>
							<Step key={2}>
								<StepLabel>Rango de muestreo</StepLabel>
							</Step>
						</Stepper>
						<FormProvider {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								{activeStep === 0 && <RangeStep setActiveStep={setActiveStep} option={option} />}
								{activeStep === 1 && (
									<SamplesTypesStep setActiveStep={setActiveStep} option={option} range={range} />
								)}
								{activeStep === 2 && (
									<SamplingRangeStep
										setActiveStep={setActiveStep}
										option={option}
										isPending={isPendingCreate || isPendingUpdate}
									/>
								)}
							</form>
						</FormProvider>
					</Box>
				</div>
			</Fade>
		</Modal>
	);
};
