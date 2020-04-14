import IIndex from "src/project/interfaces/index.interface";

export const baseProfile: IIndex[] = [
	{
		name: "I1",
		nameIndex: "SRPQGI",
		description: "Software requirements profile quality generalized index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "I2",
				value: null,
			},
			{
				name: "K2",
				nameConnect: "I8",
				value: null,
			},
		],
	},
	{
		name: "I2",
		nameIndex: "SRPEQGI",
		description:
			"Software requirements profile external quality generalized index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "I3",
				value: null,
			},
			{
				name: "K2",
				nameConnect: "I4",
				value: null,
			},
			{
				name: "K3",
				nameConnect: "I5",
				value: null,
			},
			{
				name: "K4",
				nameConnect: "I6",
				value: null,
			},
			{
				name: "K5",
				nameConnect: "I7",
				value: null,
			},
		],
	},
	{
		name: "I3",
		nameIndex: "SRPSQI",
		description: "Software requirements profile structure quality index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "M1",
					nameMetric: "SRPTN",
					value: null,
					description:
						"software requirements profile taxons number\nFormula: SRPTN = SRPTRN / SRPTRQN\nPrimitives: SRPTRN, SRPTRQN",
					primitive: {
						formula: "SRPTRN / SRPTRQN",
						primitives: [
							{
								name: "SRPTRN",
								value: null,
								description:
									"software requirements profile taxons real number",
							},
							{
								name: "SRPTRQN",
								value: null,
								description:
									"software requirements profile taxons required number",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "M2",
					nameMetric: "SRPCFN",
					value: null,
					description:
						"software requirements profile classification features number\nFormula: SRPCFN = SRPCFRN / SRPCFRQN\nPrimitives: SRPCFRN, SRPCFRQN",
					primitive: {
						formula: "SRPCFRN / SRPCFRQN",
						primitives: [
							{
								name: "SRPCFRN",
								value: null,
								description:
									"software requirements profile classification features real number",
							},
							{
								name: "SRPCFRQN",
								value: null,
								description:
									"software requirements profile classification features required number",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I4",
		nameIndex: "SRPCQI",
		description:
			"Software requirements profile characteristics quality index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "M3",
					nameMetric: "SRPCC",
					value: null,
					description:
						"software requirements profile complete characteristic",
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "M4",
					nameMetric: "SRPCOC",
					value: null,
					description:
						"software requirements profile consistent characteristic",
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "M5",
					nameMetric: "SRPAC",
					value: null,
					description:
						"software requirements profile affordable characteristic",
				},
			},
			{
				name: "K4",
				value: null,
				metric: {
					name: "M6",
					nameMetric: "SRPBC",
					value: null,
					description:
						"software requirements profile bounded characteristic",
				},
			},
			{
				name: "K5",
				value: null,
				metric: {
					name: "M7",
					nameMetric: "SRPFC",
					value: null,
					description:
						"software requirements profile feasible characteristic",
				},
			},
			{
				name: "K6",
				value: null,
				metric: {
					name: "M8",
					nameMetric: "SRPCOMC",
					value: null,
					description:
						"software requirements profile comprehensible characteristic",
				},
			},
			{
				name: "K7",
				value: null,
				metric: {
					name: "M9",
					nameMetric: "SRPCQ",
					value: null,
					description:
						"software requirements profile characteristics quality\nFormula: SRPCQ = SRPPCQ / SRPACQ\nPrimitives: SRPPCQ, SRPACQ",
					primitive: {
						formula: "SRPPCQ / SRPACQ",
						primitives: [
							{
								name: "SRPPCQ",
								value: null,
								description:
									"software requirements profile performed characteristics quantity",
							},
							{
								name: "SRPACQ",
								value: null,
								description:
									"software requirements profile all characteristics quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I5",
		nameIndex: "SRPCFCQI",
		description:
			"Software requirements profile classification features characteristics quality index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "M10",
					nameMetric: "SRPCFAC",
					value: null,
					description:
						"software requirements profile classification features all-sufficient characteristic",
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "M11",
					nameMetric: "SRPCFIC",
					value: null,
					description:
						"software requirements profile classification features indivisibility characteristic",
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "M12",
					nameMetric: "SRPCFFC",
					value: null,
					description:
						"software requirements profile classification features fullness characteristic",
				},
			},
			{
				name: "K4",
				value: null,
				metric: {
					name: "M13",
					nameMetric: "SRPCFACC",
					value: null,
					description:
						"software requirements profile classification features accuracy characteristic",
				},
			},
			{
				name: "K5",
				value: null,
				metric: {
					name: "M14",
					nameMetric: "SRPCFCQ",
					value: null,
					description:
						"software requirements profile classification features characteristics quality\nFormula: SRPCFCQ = SRPCFPCQ / SRPCFACQ\nPrimitives: SRPCFPCQ, SRPCFACQ",
					primitive: {
						formula: "SRPCFPCQ / SRPCFACQ",
						primitives: [
							{
								name: "SRPCFPCQ",
								value: null,
								description:
									"software requirements profile classification features performed characteristics quantity",
							},
							{
								name: "SRPCFACQ",
								value: null,
								description:
									"software requirements profile classification features all characteristics quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I6",
		nameIndex: "SRPAQI",
		description: "Software requirements profile attributes quality index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "M15",
					nameMetric: "SRPVA",
					value: null,
					description:
						"software requirements profile version attribute",
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "M16",
					nameMetric: "SRPCA",
					value: null,
					description:
						"software requirements profile complexity attribute",
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "M17",
					nameMetric: "SRPIA",
					value: null,
					description:
						"software requirements profile independence attribute",
				},
			},
			{
				name: "K4",
				value: null,
				metric: {
					name: "M18",
					nameMetric: "SRPAQ",
					value: null,
					description:
						"software requirements profile attributes quality\nFormula: SRPAQ = SRPPAQ / SRPAAQ\nPrimitives: SRPPAQ, SRPAAQ",
					primitive: {
						formula: "SRPPAQ / SRPAAQ",
						primitives: [
							{
								name: "SRPPAQ",
								value: null,
								description:
									"software requirements profile performed attributes",
							},
							{
								name: "SRPAAQ",
								value: null,
								description:
									"software requirements profile all attributes quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I7",
		nameIndex: "SRPCFAQI",
		description:
			"Software requirements profile classification features attributes quality index",
		coefficients: [
			{
				name: "K1",
				value: null,
				metric: {
					name: "M19",
					nameMetric: "SRPCFSCA",
					value: null,
					description:
						"software requirements profile classification features structure complexity attribute",
				},
			},
			{
				name: "K2",
				value: null,
				metric: {
					name: "M20",
					nameMetric: "SRPCFTTA",
					value: null,
					description:
						"software requirements profile classification features taxonomy type attribute",
				},
			},
			{
				name: "K3",
				value: null,
				metric: {
					name: "M21",
					nameMetric: "SRPCFAQ",
					value: null,
					description:
						"software requirements profile classification features attributes quality\nFormula: SRPCFAQ = SRPCFPAQ / SRPCFAAQ\nPrimitives: SRPCFPAQ, SRPCFAAQ",
					primitive: {
						formula: "SRPCFPAQ / SRPCFAAQ",
						primitives: [
							{
								name: "SRPCFPAQ",
								value: null,
								description:
									"software requirements profile classification features performed attributes quantity",
							},
							{
								name: "SRPCFAAQ",
								value: null,
								description:
									"software requirements profile classification features all attributes quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I8",
		nameIndex: "SRPIQGI",
		description:
			"Software requirements profile internal quality generalized index",
		coefficients: [],
	},
];
