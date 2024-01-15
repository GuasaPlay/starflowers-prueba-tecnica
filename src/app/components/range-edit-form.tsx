import { Box, Fade, Modal, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

interface RangeEditFormProps {
	open: boolean;
	setOpen: (open: boolean) => void;
}
export const RangeEditForm = ({ open, setOpen }: RangeEditFormProps) => {
	const [activeStep, setActiveStep] = useState(0);

	const handleClose = () => setOpen(false);

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
					</Box>
				</div>
			</Fade>
		</Modal>
	);
};
