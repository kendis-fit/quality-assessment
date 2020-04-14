import IIndex from "src/project/interfaces/index.interface";

export const uxProfile: IIndex[] = [
	{
		name: "II1",
		nameIndex: "INQUI",
		description: "Interaction quality index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "II2",
				value: null,
			},
			{
				name: "K2",
				nameConnect: "II6",
				value: null,
			},
		],
	},
	{
		name: "II2",
		nameIndex: "CMDI",
		description: "Complex making decision index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "II3",
				value: null,
			},
			{
				name: "K2",
				nameConnect: "II4",
				value: null,
			},
			{
				name: "K3",
				nameConnect: "II5",
				value: null,
			},
		],
	},
	{
		name: "II3",
		nameIndex: "VFTI",
		description: "Visibility and finding targets index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "IM1",
					nameMetric: "SSGU",
					value: null,
					description:
						"success of search of goal by users\nFormulas: SSGU=UI / AU\nPrimitives: UI, AU",
					primitive: {
						formula: "UI / AU",
						primitives: [
							{
								name: "UI",
								value: null,
								description:
									"количество пользователей, которые обращают внимание на область интереса",
							},
							{
								name: "AU",
								value: null,
								description: "общее количество пользователей",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "IM2",
					nameMetric: "GLE",
					value: null,
					description: "general level of excitation",
					primitive: {
						formula: "AF / AT",
						primitives: [
							{
								name: "AF",
								value: null,
								description: "общее количество фиксаций",
							},
							{
								name: "AT",
								value: null,
								description: "общее время",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "IM3",
					nameMetric: "LEAI",
					value: null,
					description: "level of excitation in area of interest",
					primitive: {
						formula: "IF / (IT + 1)",
						primitives: [
							{
								name: "IF",
								value: null,
								description:
									"количество фиксация в области интереса",
							},
							{
								name: "IT",
								value: null,
								description: "время в области интереса",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "II4",
		nameIndex: "RETAI",
		description: "Recognition target index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "IM4",
					nameMetric: "TRC",
					value: null,
					description: "target recognition complexity",
					primitive: {
						formula: "1 - 1 / (AV + 1)",
						primitives: [
							{
								name: "AV",
								value: null,
								description:
									"общее количество посещений в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "IM5",
					nameMetric: "PTRC",
					value: null,
					description: "primary target recognition complexity",
					primitive: {
						formula: "1 / (TFF + 1)",
						primitives: [
							{
								name: "TFF",
								value: null,
								description:
									"продолжительность первой фиксации в области интереса",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "II5",
		nameIndex: "MADEI",
		description: "Making decision index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "IM6",
					nameMetric: "DMCP",
					value: null,
					description: "decision making complexity in percentage",
					primitive: {
						formula: "IC / (AC + 1)",
						primitives: [
							{
								name: "IC",
								value: null,
								description:
									"количество кликов мышкой на области интереса",
							},
							{
								name: "AC",
								value: null,
								description: "общее количество кликов мышкой",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "IM7",
					nameMetric: "DMCC",
					value: null,
					description: "decision making complexity in percentage",
					primitive: {
						formula: "T / (IC + 1)",
						primitives: [
							{
								name: "T",
								value: null,
								description:
									"время до первого клика мышкой в области интереса",
							},
							{
								name: "IC",
								value: null,
								description:
									"количество кликов мышкой в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "IM8",
					nameMetric: "DMR",
					value: null,
					description: "decision making recognition",
					primitive: {
						formula: "1 / (T + 1)",
						primitives: [
							{
								name: "T",
								value: null,
								description:
									"время до первого клика мышкой в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: null,
				metric: {
					name: "IM9",
					nameMetric: "DMSTR",
					value: null,
					description: "decision making recognition",
					primitive: {
						formula: "1 / (TFC + 1)",
						primitives: [
							{
								name: "TFC",
								value: null,
								description:
									"время от первой фиксации на области интереса до первого клика мышкой в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K5",
				value: null,
				metric: {
					name: "IM10",
					nameMetric: "EDM",
					value: null,
					description: "easy decision making)",
					primitive: {
						formula: "IC / (IT + 1)",
						primitives: [
							{
								name: "IC",
								value: null,
								description:
									"количество кликов мышкой в области интереса",
							},
							{
								name: "IT",
								value: null,
								description: "время в области интереса",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "II6",
		nameIndex: "INATI",
		description: "Interaction attention index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "II7",
				value: null,
			},
			{
				name: "K2",
				nameConnect: "II8",
				value: null,
			},
			{
				name: "K3",
				nameConnect: "II9",
				value: null,
			},
		],
	},
	{
		name: "II7",
		nameIndex: "COPRI",
		description: "Cognitive processing index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "IM11",
					nameMetric: "CPS",
					value: null,
					description: "cognitive processing speed",
					primitive: {
						formula: "AT / AF",
						primitives: [
							{
								name: "AT",
								value: null,
								description: "общее время",
							},
							{
								name: "AF",
								value: null,
								description: "общее количество фиксаций",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "II8",
		nameIndex: "EMARI",
		description: "Emotional arousal index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "IM12",
					nameMetric: "GLE",
					value: null,
					description: "general level of excitation",
					primitive: {
						formula: "AF / AT",
						primitives: [
							{
								name: "AF",
								value: null,
								description: "общее количество фиксаций",
							},
							{
								name: "AT",
								value: null,
								description: "общее время",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "IM13",
					nameMetric: "LEAI",
					value: null,
					description: "level of excitation in area of interest",
					primitive: {
						formula: "IF / (IT + 1)",
						primitives: [
							{
								name: "IF",
								value: null,
								description:
									"количество фиксация в области интереса",
							},
							{
								name: "IT",
								value: null,
								description: "время в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "IM14",
					nameMetric: "LEOAI",
					value: null,
					description: "level of excitation out of  area of interest",
					primitive: {
						formula: "OIF / (OIT + 1)",
						primitives: [
							{
								name: "OIF",
								value: null,
								description:
									"количество фиксация вне области интереса",
							},
							{
								name: "OIT",
								value: null,
								description: "время вне области интереса",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: null,
				metric: {
					name: "IM15",
					nameMetric: "RIEAI",
					value: null,
					description:
						"relative increase in excitation in the area of interest",
					primitive: {
						formula: "LEAI / GLE",
						primitives: [
							{
								name: "LEAI",
								value: null,
								description:
									"уровень возбуждения в области интереса",
							},
							{
								name: "GLE",
								value: null,
								description: "общий уровень возбуждения",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "II9",
		nameIndex: "AAOII",
		description: "Attention in AOI index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "IM16",
					nameMetric: "ILF",
					value: null,
					description: "interest level in fixations",
					primitive: {
						formula: "1 - 1 / (IF + 1)",
						primitives: [
							{
								name: "IF",
								value: null,
								description:
									"количество фиксаций в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "IM17",
					nameMetric: "ILT",
					value: null,
					description: "level of excitation in area of interest",
					primitive: {
						formula: "1 - 1 / (IT + 1)",
						primitives: [
							{
								name: "IT",
								value: null,
								description: "время в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "IM18",
					nameMetric: "PTA",
					value: null,
					description: "interest level in percentage",
					primitive: {
						formula: "IT / AT",
						primitives: [
							{
								name: "IT",
								value: null,
								description: "время в области интереса",
							},
							{
								name: "AT",
								value: null,
								description: "общее время",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: null,
				metric: {
					name: "IM19",
					nameMetric: "ASAI",
					value: null,
					description: "attention sustainability to area of interest",
					primitive: {
						formula: "1 / (VC + 1)",
						primitives: [
							{
								name: "VC",
								value: null,
								description:
									"количество посещений в области интереса",
							},
						],
					},
				},
			},
		],
	},
];
