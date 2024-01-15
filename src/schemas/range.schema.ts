import * as yup from 'yup';

export const RangeSchema = yup.object({
	ranges: yup.array().of(
		yup.object({
			id: yup.string().required('El id es requerido').typeError('El id debe ser una cadena de texto'),
			minimum: yup
				.number()
				.required('El valor mínimo es requerido')
				.typeError('El valor mínimo debe ser un número')
				.test('sequential', 'El valor mínimo debe ser sequencial', async function (value) {
					const ranges = this.from![1].value.ranges;

					// if (this.path === 'ranges[0].minimum') {
					// 	const lastRangeOfDb = await getLastRange();

					// 	if (lastRangeOfDb === null) return true;

					// 	const currentValue = value;

					// 	if (currentValue === lastRangeOfDb.maximum + 1) return true;

					// 	return false;
					// }

					if (this.path === 'ranges[0].minimum') return true;

					const currentIndex = parseInt(this.path.match(/\d+/g)![0]);

					const lastRange = ranges[currentIndex - 1];

					const currentValue = value;

					if (currentValue === parseInt(lastRange.maximum) + 1) return true;

					return false;
				}),
			maximum: yup
				.number()
				.required('El valor máximo es requerido')
				.typeError('El valor máximo debe ser un número')
				.test('is-greater-than-minimum', 'El valor máximo debe ser mayor al valor mínimo', function (value) {
					const range = this.parent;
					const minimum = range.minimum;

					if (value === undefined) return true;

					if (minimum === undefined) return true;

					return value > minimum;
				}),

			samplingRange: yup.array().of(
				yup.object({
					id: yup.string().required('El id es requerido').typeError('El id es requerido'),
					rangeLabel: yup.string().required('El rango es requerido').typeError('El rango es requerido'),
					rangeId: yup.string().required('El id es requerido').typeError('El id es requerido'),
					numberSamples: yup
						.number()
						.required('El número de muestras es requerido')
						.typeError('El número de muestras debe ser un número'),
					samplingId: yup.string().required('El id es requerido').typeError('El id es requerido'),
					samplingLabel: yup.string().required('El nombre es requerido').typeError('El nombre es requerido'),
				})
			),
		})
	),
	samplesTypes: yup.array().of(
		yup.object({
			id: yup.string().required('El id es requerido').typeError('El id debe ser una cadena de texto'),
			name: yup.string().required('El nombre es requerido').typeError('El nombre debe ser una cadena de texto'),
		})
	),
});

export type RangeFormType = yup.InferType<typeof RangeSchema>;
