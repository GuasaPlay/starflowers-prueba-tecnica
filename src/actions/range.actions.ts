'use server';

import { db } from '@/lib/db';
import { type Prisma } from '@prisma/client';
export const getRanges = async () => {
	const ranges = await db.range.findMany({
		orderBy: { maximum: 'desc' },
	});

	return ranges;
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

export const deleteSamplingRange = async ({ id }: { id: string }) => {
	const result = await db.range.delete({ where: { id } });

	return result;
};
