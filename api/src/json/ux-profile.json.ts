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
				value: undefined,
			},
			{
				name: "K2",
				nameConnect: "II6",
				value: undefined,
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
				value: undefined,
			},
			{
				name: "K2",
				nameConnect: "II4",
				value: undefined,
			},
			{
				name: "K3",
				nameConnect: "II5",
				value: undefined,
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
				value: undefined,
				metric: {
					name: "IM1",
					nameMetric: "SSGU",
					value: undefined,
					description:
						"success of search of goal by users\nFormulas: SSGU=UI / AU\nPrimitives: UI, AU",
					primitive: {
						formula: "UI / AU",
						primitives: [
							{
								name: "UI",
								value: undefined,
								description:
									"количество пользователей, которые обращают внимание на область интереса",
							},
							{
								name: "AU",
								value: undefined,
								description: "общее количество пользователей",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "IM2",
					nameMetric: "SSGF",
					value: undefined,
					description: "(speed of search of goal in fixations)",
					primitive: {
						formula: "1 / (F + 1)",
						primitives: [
							{
								name: "F",
								value: undefined,
								description: "количество фиксаций до первой фиксации в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "IM3",
					nameMetric: "SSGT",
					value: undefined,
					description: "(speed of search of goal in time)",
					primitive: {
						formula: "1 / (T + 1)",
						primitives: [
							{
								name: "T",
								value: undefined,
								description:
									"время до первой фиксации в области интереса",
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
				value: undefined,
				metric: {
					name: "IM4",
					nameMetric: "TRC",
					value: undefined,
					description: "target recognition complexity",
					primitive: {
						formula: "1 - 1 / (AV + 1)",
						primitives: [
							{
								name: "AV",
								value: undefined,
								description:
									"общее количество посещений в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "IM5",
					nameMetric: "PTRC",
					value: undefined,
					description: "primary target recognition complexity",
					primitive: {
						formula: "1 / (TFF + 1)",
						primitives: [
							{
								name: "TFF",
								value: undefined,
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
				value: undefined,
				metric: {
					name: "IM6",
					nameMetric: "DMCP",
					value: undefined,
					description: "decision making complexity in percentage",
					primitive: {
						formula: "IC / (AC + 1)",
						primitives: [
							{
								name: "IC",
								value: undefined,
								description:
									"количество кликов мышкой на области интереса",
							},
							{
								name: "AC",
								value: undefined,
								description: "общее количество кликов мышкой",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "IM7",
					nameMetric: "DMCC",
					value: undefined,
					description: "decision making complexity in percentage",
					primitive: {
						formula: "T / (IC + 1)",
						primitives: [
							{
								name: "T",
								value: undefined,
								description:
									"время до первого клика мышкой в области интереса",
							},
							{
								name: "IC",
								value: undefined,
								description:
									"количество кликов мышкой в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "IM8",
					nameMetric: "DMR",
					value: undefined,
					description: "decision making recognition",
					primitive: {
						formula: "1 / (T + 1)",
						primitives: [
							{
								name: "T",
								value: undefined,
								description:
									"время до первого клика мышкой в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "IM9",
					nameMetric: "DMSTR",
					value: undefined,
					description: "decision making recognition",
					primitive: {
						formula: "1 / (TFC + 1)",
						primitives: [
							{
								name: "TFC",
								value: undefined,
								description:
									"время от первой фиксации на области интереса до первого клика мышкой в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K5",
				value: undefined,
				metric: {
					name: "IM10",
					nameMetric: "EDM",
					value: undefined,
					description: "easy decision making)",
					primitive: {
						formula: "IC / (IT + 1)",
						primitives: [
							{
								name: "IC",
								value: undefined,
								description:
									"количество кликов мышкой в области интереса",
							},
							{
								name: "IT",
								value: undefined,
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
				value: undefined,
			},
			{
				name: "K2",
				nameConnect: "II8",
				value: undefined,
			},
			{
				name: "K3",
				nameConnect: "II9",
				value: undefined,
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
				value: undefined,
				metric: {
					name: "IM11",
					nameMetric: "CPS",
					value: undefined,
					description: "cognitive processing speed",
					primitive: {
						formula: "AT / (AF + AT)",
						primitives: [
							{
								name: "AT",
								value: undefined,
								description: "общее время",
							},
							{
								name: "AF",
								value: undefined,
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
				value: undefined,
				metric: {
					name: "IM12",
					nameMetric: "GLE",
					value: undefined,
					description: "general level of excitation",
					primitive: {
						formula: "AF / (AT + AF)",
						primitives: [
							{
								name: "AF",
								value: undefined,
								description: "общее количество фиксаций",
							},
							{
								name: "AT",
								value: undefined,
								description: "общее время",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "IM13",
					nameMetric: "LEAI",
					value: undefined,
					description: "level of excitation in area of interest",
					primitive: {
						formula: "IF / (IT + 1)",
						primitives: [
							{
								name: "IF",
								value: undefined,
								description:
									"количество фиксация в области интереса",
							},
							{
								name: "IT",
								value: undefined,
								description: "время в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "IM14",
					nameMetric: "LEOAI",
					value: undefined,
					description: "level of excitation out of  area of interest",
					primitive: {
						formula: "OIF / (OIT + 1)",
						primitives: [
							{
								name: "OIF",
								value: undefined,
								description:
									"количество фиксация вне области интереса",
							},
							{
								name: "OIT",
								value: undefined,
								description: "время вне области интереса",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "IM15",
					nameMetric: "RIEAI",
					value: undefined,
					description:
						"relative increase in excitation in the area of interest",
					primitive: {
						formula: "LEAI / GLE",
						primitives: [
							{
								name: "LEAI",
								value: undefined,
								description:
									"уровень возбуждения в области интереса",
							},
							{
								name: "GLE",
								value: undefined,
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
				value: undefined,
				metric: {
					name: "IM16",
					nameMetric: "ILF",
					value: undefined,
					description: "interest level in fixations",
					primitive: {
						formula: "1 - 1 / (IF + 1)",
						primitives: [
							{
								name: "IF",
								value: undefined,
								description:
									"количество фиксаций в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "IM17",
					nameMetric: "ILT",
					value: undefined,
					description: "level of excitation in area of interest",
					primitive: {
						formula: "1 - 1 / (IT + 1)",
						primitives: [
							{
								name: "IT",
								value: undefined,
								description: "время в области интереса",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "IM18",
					nameMetric: "PTA",
					value: undefined,
					description: "interest level in percentage",
					primitive: {
						formula: "IT / AT",
						primitives: [
							{
								name: "IT",
								value: undefined,
								description: "время в области интереса",
							},
							{
								name: "AT",
								value: undefined,
								description: "общее время",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "IM19",
					nameMetric: "ASAI",
					value: undefined,
					description: "attention sustainability to area of interest",
					primitive: {
						formula: "1 / (VC + 1)",
						primitives: [
							{
								name: "VC",
								value: undefined,
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
