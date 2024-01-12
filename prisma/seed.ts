import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const data = [
	{
		id: 'EiR64S7jIwPgPakG9z2hKeOWm',
		maximum: 8,
		minimum: 1,
		status: true,
		samplingRanges: [
			{
				id: 'oXhSrVO8dr3Ucwg34G8hPCrdV',
				numberSamples: 2,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: 'EiR64S7jIwPgPakG9z2hKeOWm',
			},
			{
				id: 'CvT2pQQj3G1lU2xVJANB8yIgr',
				numberSamples: 2,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: 'EiR64S7jIwPgPakG9z2hKeOWm',
			},
		],
	},
	{
		id: 'r0e8d6I7cXBy1FCa6HFKU0eoG',
		maximum: 15,
		minimum: 9,
		status: true,
		samplingRanges: [
			{
				id: 'vW6284gsqCN1CBvz1NmuONes3',
				numberSamples: 3,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: 'r0e8d6I7cXBy1FCa6HFKU0eoG',
			},
			{
				id: 'NS3KhfYDQZVVhHHhyrrC6blfD',
				numberSamples: 2,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: 'r0e8d6I7cXBy1FCa6HFKU0eoG',
			},
		],
	},
	{
		id: '0RxsGexAo5smjJ9NUFAYaWVX4',
		maximum: 25,
		minimum: 16,
		status: true,
		samplingRanges: [
			{
				id: '7QmpeHsiAsqSYJWZtpECh4wFp',
				numberSamples: 5,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: '0RxsGexAo5smjJ9NUFAYaWVX4',
			},
			{
				id: 'sejrkO3ycCxif1pOhRAaa3BqS',
				numberSamples: 3,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: '0RxsGexAo5smjJ9NUFAYaWVX4',
			},
		],
	},
	{
		id: '2BKujnbQpS27T3SXxU4gsPA66',
		maximum: 50,
		minimum: 26,
		status: true,
		samplingRanges: [
			{
				id: 'Crr8ixtYjPEbwhdvtIhFPUkT8',
				numberSamples: 8,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: '2BKujnbQpS27T3SXxU4gsPA66',
			},
			{
				id: 'KpEk7WacWNRc8pC0uPGHhHXNS',
				numberSamples: 5,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: '2BKujnbQpS27T3SXxU4gsPA66',
			},
		],
	},
	{
		id: 'oQMzV2pyWaGSut6oZMM2sbN6h',
		maximum: 90,
		minimum: 51,
		status: true,
		samplingRanges: [
			{
				id: 'na2OLn2eNCwdbe9NluX4zU87E',
				numberSamples: 13,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: 'oQMzV2pyWaGSut6oZMM2sbN6h',
			},
			{
				id: 'HL2QkXoLdwZoTPRk3PeuAiYi3',
				numberSamples: 5,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: 'oQMzV2pyWaGSut6oZMM2sbN6h',
			},
		],
	},
	{
		id: 'c9fOTE9Lu8gcidzF1Ytv9GxEP',
		maximum: 150,
		minimum: 91,
		status: true,
		samplingRanges: [
			{
				id: 'B8ysdyw2B02xTRIBSZpVH5JKm',
				numberSamples: 20,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: 'c9fOTE9Lu8gcidzF1Ytv9GxEP',
			},
			{
				id: 'T8iEHsn9cQiAecIuidd6AGEVx',
				numberSamples: 8,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: 'c9fOTE9Lu8gcidzF1Ytv9GxEP',
			},
		],
	},
	{
		id: '4sX58qj270104VGqWPF8BkrTT',
		maximum: 280,
		minimum: 151,
		status: true,
		samplingRanges: [
			{
				id: 'kElv6Q699obNfb9RZNRHDqvpg',
				numberSamples: 32,
				sampling: {
					id: '8GRWLI6oMm7tMd3QOHugmYYwL',
					name: 'Segundo nivel',
				},
				rangeId: '4sX58qj270104VGqWPF8BkrTT',
			},
			{
				id: 'l7zY2tELkRbHuK8qj0Nuzp52T',
				numberSamples: 13,
				sampling: {
					id: 'clldv9wed000lulhp0mansjxn',
					name: 'Primer nivel',
				},
				rangeId: '4sX58qj270104VGqWPF8BkrTT',
			},
		],
	},
];

const main = async () => {
	for (const range of data) {
		const { id, maximum, minimum, status, samplingRanges } = range;
		await prisma.range.upsert({
			where: {
				id,
			},
			update: {},
			create: {
				id,
				maximum,
				minimum,
				status,
			},
		});
	}

	const samplingRanges = data.map((item) => item.samplingRanges).flat();

	const notRepeatedSampling = samplingRanges
		.map((item) => item.sampling)
		.filter((item, index, self) => self.findIndex((t) => t.id === item.id) === index);

	for (const sampling of notRepeatedSampling) {
		await prisma.sampling.upsert({
			where: {
				id: sampling.id,
			},
			update: {},
			create: {
				id: sampling.id,
				name: sampling.name,
			},
		});
	}

	for (const samplingRange of samplingRanges) {
		const { id, numberSamples } = samplingRange;

		await prisma.samplingRange.upsert({
			where: {
				id,
			},
			update: {},
			create: {
				id,
				numberSamples,
				rangeId: samplingRange.rangeId,
				samplingId: samplingRange.sampling.id,
			},
		});
	}
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
