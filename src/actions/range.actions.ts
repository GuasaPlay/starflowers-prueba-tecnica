'use server';

import { db } from '@/lib/db';

export const getRanges = async () => {
	try {
		const ranges = await db.range.findMany({
			// include: {
			// 	samplingRanges: {
			// 		include: {
			// 			sampling: {},
			// 		},
			// 	},
			// },
		});

		return ranges;
	} catch (error) {
		throw new Error('Ocurrió un error al obtener los rangos');
	}
};

export const updateRangeStatus = async ({ id, status }: { id: string; status: boolean }) => {
	const range = await db.range.update({
		where: { id },
		data: { status },
	});

	return range;
};
