import * as yup from 'yup';

// model Range {
//     id             String          @id @default(cuid())
//     maximum        Int
//     minimum        Int
//     status         Boolean
//     samplingRanges SamplingRange[]
// }

// model SamplingRange {
//     id            String   @id @default(cuid())
//     numberSamples Int
//     range         Range    @relation(fields: [rangeId], references: [id])
//     rangeId       String
//     sampling      Sampling @relation(fields: [samplingId], references: [id])
//     samplingId    String
// }

// model Sampling {
//     id             String          @id @default(cuid())
//     name           String
//     samplingRanges SamplingRange[]
// }

export const RangeSchema = yup.object({
	ranges: yup.array().of(
		yup.object({
			id: yup.string().required('El id es requerido').typeError('El id debe ser una cadena de texto'),
			minimum: yup
				.number()
				.required('El valor mínimo es requerido')
				.typeError('El valor mínimo debe ser un número')
				.test('sequential', 'El valor mínimo debe ser sequencial', function (value) {
					const ranges = this.from![1].value.ranges;

					if (this.path === 'ranges[0].minimum') return true;

					const lastRange = ranges[ranges.length - 2];

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
