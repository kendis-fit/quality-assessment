import IIndex from "../project/interfaces/index.interface";

export const profile: IIndex[] = [
	{
		name: "I9",
		nameIndex: "SRPQIRGI",
		description:
			"Software requirements profile quality individual requirement generalized index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "I10",
				value: undefined,
			},
			{
				name: "K2",
				nameConnect: "I15",
				value: undefined,
			},
		],
	},
	{
		name: "I10",
		nameIndex: "SRPEQIRGI",
		description:
			"Software requirements profile external quality individual requirement generalized index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "I11",
				value: undefined,
			},
			{
				name: "K2",
				nameConnect: "I12",
				value: undefined,
			},
			{
				name: "K3",
				nameConnect: "I13",
				value: undefined,
			},
			{
				name: "K4",
				nameConnect: "I14",
				value: undefined,
			},
		],
	},
	{
		name: "I11",
		nameIndex: "SRPCQIRI",
		description:
			"Software requirements profile characteristics quality individual requirement index",
		coefficients: [
			{
				name: "K1",
				value: undefined,
				metric: {
					name: "M22",
					nameMetric: "SRPSRAC",
					value: undefined,
					description:
						"software requirements profile software requirement accuracy characteristic",
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "M23",
					nameMetric: "SRPSRCC",
					value: undefined,
					description:
						"software requirements profile software requirement completeness characteristic",
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "M24",
					nameMetric: "SRPSRCOC",
					value: undefined,
					description:
						"software requirements profile software requirement consistency characteristic",
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "M25",
					nameMetric: "SRPSRCRC",
					value: undefined,
					description:
						"software requirements profile software requirement credibility characteristic",
				},
			},
			{
				name: "K5",
				value: undefined,
				metric: {
					name: "M26",
					nameMetric: "SRPSRCUC",
					value: undefined,
					description:
						"software requirements profile software requirement currentness characteristic",
				},
			},
			{
				name: "K6",
				value: undefined,
				metric: {
					name: "M27",
					nameMetric: "SRPSRACC",
					value: undefined,
					description:
						"software requirements profile software requirement accessibility characteristic",
				},
			},
			{
				name: "K7",
				value: undefined,
				metric: {
					name: "M28",
					nameMetric: "SRPSRACOMC",
					value: undefined,
					description:
						"software requirements profile software requirement compliance characteristic",
				},
			},
			{
				name: "K8",
				value: undefined,
				metric: {
					name: "M29",
					nameMetric: "SRPSRACONC",
					value: undefined,
					description:
						"software requirements profile software requirement confidentiality characteristic",
				},
			},
			{
				name: "K9",
				value: undefined,
				metric: {
					name: "M30",
					nameMetric: "SRPSRTC",
					value: undefined,
					description:
						"software requirements profile software requirement traceability characteristic",
				},
			},
			{
				name: "K10",
				value: undefined,
				metric: {
					name: "M31",
					nameMetric: "SRPSRUC",
					value: undefined,
					description:
						"software requirements profile software requirement understandability characteristic",
				},
			},
			{
				name: "K11",
				value: undefined,
				metric: {
					name: "M32",
					nameMetric: "SRPSRNC",
					value: undefined,
					description:
						"software requirements profile software requirement necessary characteristic",
				},
			},
			{
				name: "K12",
				value: undefined,
				metric: {
					name: "M33",
					nameMetric: "SRPSRIFC",
					value: undefined,
					description:
						"software requirements profile software requirement implementation free characteristic",
				},
			},
			{
				name: "K13",
				value: undefined,
				metric: {
					name: "M34",
					nameMetric: "SRPSUNC",
					value: undefined,
					description:
						"software requirements profile software requirement unambiguous characteristic",
				},
			},
			{
				name: "K14",
				value: undefined,
				metric: {
					name: "M35",
					nameMetric: "SRPSRSH",
					value: undefined,
					description:
						"software requirements profile software requirement singular characteristic",
				},
			},
			{
				name: "K15",
				value: undefined,
				metric: {
					name: "M36",
					nameMetric: "SRPSRFH",
					value: undefined,
					description:
						"software requirements profile software requirement feasible characteristic",
				},
			},
			{
				name: "K16",
				value: undefined,
				metric: {
					name: "M37",
					nameMetric: "SRPSRVH",
					value: undefined,
					description:
						"software requirements profile software requirement verifiable characteristic",
				},
			},
			{
				name: "K17",
				value: undefined,
				metric: {
					name: "M38",
					nameMetric: "SRPSRAH",
					value: undefined,
					description:
						"software requirements profile software requirement appropriate characteristic",
				},
			},
			{
				name: "K18",
				value: undefined,
				metric: {
					name: "M39",
					nameMetric: "SRPSRCORC",
					value: undefined,
					description:
						"software requirements profile software requirement correct characteristic",
				},
			},
			{
				name: "K19",
				value: undefined,
				metric: {
					name: "M40",
					nameMetric: "SRPSRCC",
					value: undefined,
					description:
						"software requirements profile software requirement conforming characteristic\nFormula: SRPSRCC  = REQCGSP / GQRE\nPrimitives: REQCGSP, GQRE",
					primitive: {
						formula: "REQCGSP / GQRE",
						primitives: [
							{
								name: "REQCGSP",
								value: undefined,
								description:
									"requirement elements quantity conforming for general spelling pattern",
							},
							{
								name: "GQRE",
								value: undefined,
								description:
									"general quantity of requirement elements",
							},
						],
					},
				},
			},
			{
				name: "K20",
				value: undefined,
				metric: {
					name: "M41",
					nameMetric: "SRPSRCQ",
					value: undefined,
					description:
						"software requirements profile software requirement characteristics quality\nFormula: SRPSRCQ = SRPSRPCQ / SRPSRACQ\nPrimitives: SRPSRPCQ, SRPSRACQ",
					primitive: {
						formula: "SRPSRPCQ / SRPSRACQ",
						primitives: [
							{
								name: "SRPSRPCQ",
								value: undefined,
								description:
									"software requirements profile software requirement performed characteristics quantity",
							},
							{
								name: "SRPSRACQ",
								value: undefined,
								description:
									"software requirements profile software requirement all characteristics quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I12",
		nameIndex: "SRPCFCQIRI",
		description:
			"Software requirements profile classification feature characteristics quality individual requirement index",
		coefficients: [
			{
				name: "K1",
				value: undefined,
				metric: {
					name: "M42",
					nameMetric: "SRPSRCFEC",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature evidence characteristic",
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "M43",
					nameMetric: "SRPSRCFSC",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature stability characteristic",
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "M44",
					nameMetric: "SRPSRCFAC",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature accuracy characteristic",
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "M45",
					nameMetric: "SRPSRCFCC",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature compliance characteristic",
				},
			},
			{
				name: "K5",
				value: undefined,
				metric: {
					name: "M46",
					nameMetric: "SRPSRCFUC",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature understandability characteristic",
				},
			},
			{
				name: "K6",
				value: undefined,
				metric: {
					name: "M47",
					nameMetric: "SRPSRCFUNC",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature univocacy characteristic",
				},
			},
			{
				name: "K7",
				value: undefined,
				metric: {
					name: "M48",
					nameMetric: "SRPCFSRCQ",
					value: undefined,
					description:
						"software requirements profile classification feature software requirement characteristics quality\nFormula: SRPCFSRCQ = SRPCFSRPCQ / SRPCFSRACQ\nPrimitives: SRPCFSRPCQ, SRPCFSRACQ",
					primitive: {
						formula: "SRPCFSRPCQ / SRPCFSRACQ",
						primitives: [
							{
								name: "SRPCFSRPCQ",
								value: undefined,
								description:
									"software requirements profile classification feature software requirement performed characteristics quantity",
							},
							{
								name: "SRPCFSRACQ",
								value: undefined,
								description:
									"software requirements profile classification feature software requirement all characteristics quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I13",
		nameIndex: "SRPAQIRI",
		description:
			"Software requirements profile attributes quality individual requirement index",
		coefficients: [
			{
				name: "K1",
				value: undefined,
				metric: {
					name: "M49",
					nameMetric: "SRPSRCFUNC",
					value: undefined,
					description:
						"software requirements profile software requirement identification attribute",
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "M50",
					nameMetric: "SRPSRSPA",
					value: undefined,
					description:
						"software requirements profile software requirement stakeholder priority attribute\nFormula: SRPSRSPA = RSQ / PSGQ\nPrimitives: RSQ, RSGQ",
					primitive: {
						formula: "RSQ / PSGQ",
						primitives: [
							{
								name: "RSQ",
								value: undefined,
								description: "requirement stakeholder quantity",
							},
							{
								name: "PSGQ",
								value: undefined,
								description:
									"project stakeholder general quantity",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "M51",
					nameMetric: "SRPSRRAA",
					value: undefined,
					description:
						"software requirements profile software requirement risks assessment attribute\nFormula: SRPSRRAA = RRQ /  RRGQ\nPrimitives: RRQ, RRGQ",
					primitive: {
						formula: "RRQ /  RRGQ",
						primitives: [
							{
								name: "RRQ",
								value: undefined,
								description: "requirement risks quantity,",
							},
							{
								name: "RRGQ",
								value: undefined,
								description:
									"project stakeholder general quantity",
							},
						],
					},
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "M52",
					nameMetric: "SRPSRCFUNC",
					value: undefined,
					description:
						"software requirements profile software requirement source attribute",
				},
			},
			{
				name: "K5",
				value: undefined,
				metric: {
					name: "M53",
					nameMetric: "SRPSRRA",
					value: undefined,
					description:
						"software requirements profile software requirement rationale attribute",
				},
			},
			{
				name: "K6",
				value: undefined,
				metric: {
					name: "M54",
					nameMetric: "SRPSRDA",
					value: undefined,
					description:
						"software requirements profile software requirement difficulty attribute",
				},
			},
			{
				name: "K7",
				value: undefined,
				metric: {
					name: "M55",
					nameMetric: "SRPSRTA",
					value: undefined,
					description:
						"software requirements profile software requirement type attribute",
				},
			},
			{
				name: "K8",
				value: undefined,
				metric: {
					name: "M56",
					nameMetric: "SRPSRVNA",
					value: undefined,
					description:
						"software requirements profile software requirement version number attribute",
				},
			},
			{
				name: "K9",
				value: undefined,
				metric: {
					name: "M57",
					nameMetric: "SRPSRAQ",
					value: undefined,
					description:
						"software requirements profile software requirement attributes quality\nFormula: SRPSRAQ = SRPSRPAQ / SRPSRAAQ\nPrimitives: SRPSRPAQ, SRPSRAAQ",
					primitive: {
						formula: "SRPSRPAQ / SRPSRAAQ",
						primitives: [
							{
								name: "SRPSRPAQ",
								value: undefined,
								description:
									"software requirements profile software requirement performed attributes quantity",
							},
							{
								name: "SRPSRAAQ",
								value: undefined,
								description:
									"software requirements profile software requirement all attributes quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I14",
		nameIndex: "SRPCFAQIRI",
		description:
			"Software requirements profile classification feature attributes quality individual requirement index",
		coefficients: [
			{
				name: "K1",
				value: undefined,
				metric: {
					name: "M58",
					nameMetric: "SRPSRCFTSTA",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature taxonomic structure type attribute",
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "M59",
					nameMetric: "SRPSRCFIA",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature identification attribute",
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "M60",
					nameMetric: "SRPSRCFDA",
					value: undefined,
					description:
						"software requirements profile software requirement classification feature dependency attribute",
				},
			},
			{
				name: "K4",
				value: undefined,
				metric: {
					name: "M61",
					nameMetric: "SRPSRCFAQ",
					value: undefined,
					description:
						"software requirements profile software requirement classification features attributes quality\nFormula: SRPSRCFAQ = SRPSRCFPAQ / SRPSRCFAAQ\nPrimitives: SRPSRCFPAQ, SRPSRCFAAQ",
					primitive: {
						formula: "SRPSRCFPAQ / SRPSRCFAAQ",
						primitives: [
							{
								name: "SRPSRCFPAQ",
								value: undefined,
								description:
									"software requirements profile software requirement classification features performed attributes quantity",
							},
							{
								name: "SRPSRCFAAQ",
								value: undefined,
								description:
									"software requirements profile software requirement classification features all attributes quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I15",
		nameIndex: "SRPIQIRGI",
		description:
			"Software requirements profile internal quality individual requirement generalized index",
		coefficients: [
			{
				name: "K1",
				nameConnect: "I16",
				value: undefined,
			},
			{
				name: "K2",
				nameConnect: "I17",
				value: undefined,
			},
		],
	},
	{
		name: "I16",
		nameIndex: "SRPSQIRI",
		description:
			"Software requirements profile syntax quality individual requirement index",
		coefficients: [
			{
				name: "K1",
				value: undefined,
				metric: {
					name: "M62",
					nameMetric: "SRPSRSSPE",
					value: undefined,
					description:
						"software requirements profile software requirement syntactical structure permanent elements\nFormula: SRPSRSSPE = RPSSEQ / 2\nPrimitives: RPSSEQ",
					primitive: {
						formula: "RPSSEQ / 2",
						primitives: [
							{
								name: "RPSSEQ",
								value: undefined,
								description:
									"requirement permanent syntactical structure elements quantity",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "M63",
					nameMetric: "SRPSRSSVE",
					value: undefined,
					description:
						"software requirements profile software requirement syntactical structure variable elements\nFormula: SRPSRSSVE = 1 / 1 + RVSSEQ\nPrimitives: RVSSEQ",
					primitive: {
						formula: "1 / 1 + RVSSEQ",
						primitives: [
							{
								name: "RVSSEQ",
								value: undefined,
								description:
									"requirement variable syntactical structure elements quantity",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "M64",
					nameMetric: "SRPSRSSAE",
					value: undefined,
					description:
						"software requirements profile software requirement syntactical structure all elements\nFormula: SRPSRSSAE = RASSEQ / 6\nPrimitives: RASSEQ",
					primitive: {
						formula: "RASSEQ / 6",
						primitives: [
							{
								name: "RASSEQ",
								value: undefined,
								description:
									"requirement all syntactical structure elements quantity",
							},
						],
					},
				},
			},
		],
	},
	{
		name: "I17",
		nameIndex: "SRPSEQIRI",
		description:
			"Software requirements profile semantics quality individual requirement index",
		coefficients: [
			{
				name: "K1",
				value: undefined,
				metric: {
					name: "M65",
					nameMetric: "SRPSRMSS",
					value: undefined,
					description:
						"software requirements profile software requirement mandatory semantic structures\nFormula: SRPSRMSS  = 1 - 1 / (1 + MSSQ)\nPrimitives: MSSQ",
					primitive: {
						formula: "1 - 1 / (1 + MSSQ)",
						primitives: [
							{
								name: "MSSQ",
								value: undefined,
								description:
									"mandatory semantic structures quantity",
							},
						],
					},
				},
			},
			{
				name: "K2",
				value: undefined,
				metric: {
					name: "M66",
					nameMetric: "SRPSRASS",
					value: undefined,
					description:
						"software requirements profile software requirement admissible semantic structures\nFormula: SRPSRASS = 1 - 1 / (1 + ASSQ)\nPrimitives: ASSQ",
					primitive: {
						formula: "1 - 1 / (1 + ASSQ)",
						primitives: [
							{
								name: "ASSQ",
								value: undefined,
								description:
									"mandatory semantic structures quantity",
							},
						],
					},
				},
			},
			{
				name: "K3",
				value: undefined,
				metric: {
					name: "M67",
					nameMetric: "SRPSRUSS",
					value: undefined,
					description:
						"software requirements profile software requirement undesirable semantic structures\nFormula: SRPSRUSS = 1 - USSQ\nPrimitives: USSQ",
					primitive: {
						formula: "1 - USSQ",
						primitives: [
							{
								name: "USSQ",
								value: undefined,
								description:
									"undesirable semantic structures quantity",
							},
						],
					},
				},
			},
		],
	},
];
