import IIndex from "src/project/interfaces/index.interface";

export const faultsInjectionProfile: IIndex[] = [
    {
        name: "DD",
        nameIndex: "",
        description: "Defects Detection",
        coefficients: [
            {
                name: "K1",
                nameConnect: "IDD",
                value: undefined
            },
            {
                name: "K2",
                nameConnect: "NDD",
                value: undefined
            }
        ]
    },
    {
        name: "IDD",
        nameIndex: "",
        description: "Injected Defects Detection",
        coefficients: [
            {
                name: "K1",
                value: undefined,
                metric: {
                    name: "IM1",
					nameMetric: "IM1",
					value: undefined,
					description: "метрика отношения дефектов засеваемого профиля дефектов к дефектам профиля всех обнаруженных дефектов ПО",
					primitive: {
						formula: "IPD / (IPD + PADD)",
						primitives: [
							{
								name: "IPD",
								value: undefined,
								description: "",
							},
							{
								name: "PADD",
								value: undefined,
								description: "",
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
					nameMetric: "IM2",
					value: undefined,
					description: "метрика отношения дефектов профиля засеянных и обнаруженных дефектов к дефектам профиля засеваемых дефектов ПО",
					primitive: {
						formula: "PDID / IPD",
						primitives: [
							{
								name: "PDID",
								value: undefined,
								description: "",
							},
							{
								name: "IPD",
								value: undefined,
								description: "",
							},
						],
					},
                }
            },
            {
                name: "K3",
                value: undefined,
                metric: {
                    name: "IM3",
					nameMetric: "IM3",
					value: undefined,
					description: "метрика отношения дефектов профиля засеянных и необнаруженных дефектов к дефектам профиля засеваемых дефектов ПО",
					primitive: {
						formula: "PNDID / IPD",
						primitives: [
							{
								name: "PNDID",
								value: undefined,
								description: "",
							},
							{
								name: "IPD",
								value: undefined,
								description: "",
							},
						],
					},
                }
            },
            {
                name: "K4",
                value: undefined,
                metric: {
                    name: "IM4",
					nameMetric: "IM4",
					value: undefined,
					description: "метрика отношения дефектов профиля засеянных и обнаруженных дефектов к дефектам профиля засеянных и необнаруженных дефектов",
					primitive: {
						formula: "PDID / (PDID + PNDID)",
						primitives: [
							{
								name: "PDID",
								value: undefined,
								description: "",
							},
							{
								name: "PNDID",
								value: undefined,
								description: "",
							},
						],
					},
                }
            }
        ]
    },
    {
        name: "NDD",
        nameIndex: "",
        description: "Injected Defects Detection",
        coefficients: [
            {
                name: "K1",
                value: undefined,
                metric: {
                    name: "IM5",
					nameMetric: "IM5",
					value: undefined,
					description: "метрика отношения дефектов засеваемого профиля дефектов к дефектам профиля новых дефектов ПО",
					primitive: {
						formula: "IPD / (IPD + PNDD)",
						primitives: [
							{
								name: "IPD",
								value: undefined,
								description: "",
							},
							{
								name: "PNDD",
								value: undefined,
								description: "",
							},
						],
					},
                }
            },
            {
                name: "K2",
                value: undefined,
                metric: {
                    name: "IM6",
					nameMetric: "IM6",
					value: undefined,
					description: "метрика отношения дефектов профиля засеянных и обнаруженных дефектов к дефектам профиля новых дефектов ПО",
					primitive: {
						formula: "PDID / (PDID + PNDD)",
						primitives: [
							{
								name: "PDID",
								value: undefined,
								description: "",
							},
							{
								name: "PNDD",
								value: undefined,
								description: "",
							},
						],
					},
                }
            },
            {
                name: "K3",
                value: undefined,
                metric: {
                    name: "IM7",
					nameMetric: "IM7",
					value: undefined,
					description: "метрика отношения дефектов профиля засеянных и обнаруженных дефектов к дефектам профиля новых дефектов ПО",
					primitive: {
						formula: "PNDD / PADD",
						primitives: [
							{
								name: "PNDD",
								value: undefined,
								description: "",
							},
							{
								name: "PADD",
								value: undefined,
								description: "",
							},
						],
					},
                }
            },
        ]
    },
];