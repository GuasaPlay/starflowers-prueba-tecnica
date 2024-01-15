'use server';

import { db } from '@/lib/db';
import { type Prisma } from '@prisma/client';

export type RangePayload = Prisma.RangeGetPayload<{
	include: { samplingRanges: { include: { sampling: true } } };
}>;

export const getRanges = async (): Promise<RangePayload[]> => {
	const ranges = await db.range.findMany({
		orderBy: { maximum: 'desc' },
		include: {
			samplingRanges: {
				include: {
					sampling: true,
				},
			},
		},
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

interface UpdateRangeInput {
	samplingRangeToCreate: Prisma.SamplingRangeUncheckedCreateInput[];
	samplingRangeToUpdate: Prisma.SamplingRangeUpdateInput[];
	sampling: Prisma.SamplingCreateInput[];
	range: Prisma.RangeUpdateInput;
	rangeId: string;
}
export const updateSamplingRange = async ({
	range,
	sampling,
	samplingRangeToCreate,

	rangeId,
}: UpdateRangeInput) => {
	const transaction = await db.$transaction([
		db.range.update({ where: { id: rangeId }, data: range }),
		db.sampling.createMany({ data: sampling }),
		db.samplingRange.createMany({ data: samplingRangeToCreate }),
	]);

	return transaction;
};

export const deleteSamplingRange = async ({ id }: { id: string }) => {
	const result = await db.range.delete({ where: { id } });
	return result;
};

export const getLastRange = async () => {
	const lastRange = await db.range.findFirst({ orderBy: { maximum: 'desc' } });
	return lastRange;
};
