import { useCreateSamplingRange } from '@/hooks/range.hook';
import { RangeFormType, RangeSchema } from '@/schemas/range.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Fade, Modal, Step, StepLabel, Stepper } from '@mui/material';
import { createId } from '@paralleldrive/cuid2';
import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RangeStep } from './range-step';
import { SamplesTypesStep } from './samples-types-step';
import { SamplingRangeStep } from './sampling-range-step';

interface RangeFormProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const isSuccess = false;

export const RangeForm = ({ open, setOpen }: RangeFormProps) => {
	const handleClose = () => setOpen(false);
	const [activeStep, setActiveStep] = useState(0);

	const defaultValues: RangeFormType = {
		ranges: [{ minimum: undefined as any, maximum: undefined as any, id: createId(), samplingRange: [] }],
		samplesTypes: [{ name: '', id: createId() }],
	};

	const formValues = useMemo<RangeFormType>(() => (isSuccess ? defaultValues : defaultValues), []);

	const form = useForm<RangeFormType>({
		resolver: yupResolver(RangeSchema),
		values: formValues,
		mode: 'all',
	});

	const { mutate, isPending } = useCreateSamplingRange();

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
						numberSamples: sampling.numberSamples,
						rangeId: range.id,
						samplingId: sampling.samplingId,
					};
				});
			})
			.flat();

		mutate(
			{
				range: rangeData,
				sampling: samplingData,
				samplingRange: samplingRangeData,
			},
			{
				onSuccess: () => {
					setOpen(false);
				},
			}
		);
	};

	return (
		<Modal open={open} onClose={handleClose}>
			<Fade in={open}>
				<div className="min-w-[80%] max-w-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white rounded-lg shadow-lg p-4">
					<Box sx={{ width: '100%' }}>
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
								{activeStep === 0 && <RangeStep setActiveStep={setActiveStep} />}
								{activeStep === 1 && <SamplesTypesStep setActiveStep={setActiveStep} />}
								{activeStep === 2 && <SamplingRangeStep setActiveStep={setActiveStep} isPending={isPending} />}
							</form>
						</FormProvider>
					</Box>
				</div>
			</Fade>
		</Modal>
	);
};
