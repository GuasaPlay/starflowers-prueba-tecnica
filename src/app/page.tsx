import { getRanges } from '@/actions/range.actions';
import { Container } from '@mui/material';
import { RangesClient } from './components/client';

const RangesPage = async () => {
	const ranges = await getRanges();

	return (
		<Container maxWidth="md">
			{/* <Box>
				{ranges?.map((range) => (
					<div key={range.id}>
						{range.maximum} - {range.minimum}
					</div>
				))}
			</Box> */}

			<RangesClient />
		</Container>
	);
};

export default RangesPage;
