import { createSamplingRange, deleteSamplingRange, getRanges, updateRangeStatus } from '@/actions/range.actions';
import { RANGES_KEY } from '@/utils/query-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useRanges = () => {
	return useQuery({
		queryKey: [RANGES_KEY],

		queryFn: () => getRanges(),
	});
};

export const useUpdateStatus = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateRangeStatus,

		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: [RANGES_KEY] });
		},
	});
};

export const useCreateSamplingRange = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createSamplingRange,

		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: [RANGES_KEY] });
		},
	});
};

export const useDeleteSamplingRange = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteSamplingRange,
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: [RANGES_KEY] });
		},
	});
};
