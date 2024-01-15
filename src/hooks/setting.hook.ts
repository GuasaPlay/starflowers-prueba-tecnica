import { getSetting, updateSetting } from '@/actions/setting.acton';
import { SETTING_KEY } from '@/utils/query-keys';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useSetting = () => {
	return useQuery({
		queryKey: [SETTING_KEY],

		queryFn: () => getSetting({ name: 'RANGE' }),
	});
};

export const useUpdateSetting = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateSetting,

		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: [SETTING_KEY] });
		},
	});
};
