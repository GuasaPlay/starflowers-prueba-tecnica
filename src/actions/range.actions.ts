'use server';

import { db } from '@/lib/db';
import { type Prisma } from '@prisma/client';
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

interface CreateRangeInput {
	samplingRange: Prisma.SamplingRangeUncheckedCreateInput[];
	sampling: Prisma.SamplingCreateInput[];
	range: Prisma.RangeCreateInput[];
}
export const createSamplingRange = async ({ range, sampling, samplingRange }: CreateRangeInput) => {
	const transaction = await db.$transaction([
		db.range.createMany({ data: range }),
		db.sampling.createMany({ data: sampling }),
		db.samplingRange.createMany({ data: samplingRange }),
	]);

	return transaction;
};

export const createSampling = async (data: Prisma.SamplingCreateInput) => {
	const sampling = await db.sampling.createMany({
		data: [data],
	});

	return sampling;
};

export const createRange = async (data: Prisma.RangeCreateInput) => {
	const range = await db.range.create({
		data,
	});
	return range;
};
