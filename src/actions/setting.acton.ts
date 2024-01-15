'use server';

import { db } from '@/lib/db';

export const getSetting = async ({ name }: { name: string }) => {
	const setting = await db.setting.findFirst({
		where: { name },
	});

	return setting;
};

export const updateSetting = async ({
	settingId,
	isCreate,
	isEdit,
	isView,
	isDelete,
	isComment,
}: {
	settingId: string;
	isCreate?: boolean;
	isEdit?: boolean;
	isView?: boolean;
	isDelete?: boolean;
	isComment?: boolean;
}) => {
	const setting = await db.setting.update({
		where: { id: settingId },
		data: {
			isCreate,
			isEdit,
			isView,
			isDelete,
			isComment,
		},
	});

	return setting;
};
