import IIndex from "src/project/interfaces/index.interface";

export const verbalProfile: IIndex[] = [
    {
        name: "VP1",
        nameIndex: "",
        description: "Вербальное оценивание",
        coefficients: [
            {
                name: "K1",
                nameConnect: "VP2",
                value: undefined
            },
            {
                name: "K2",
                nameConnect: "VP3",
                value: undefined
            }
        ]
    },
    {
        name: "VP2",
        nameIndex: "",
        description: "Отзывы респондентов",
        coefficients: [
            {
                name: "K1",
                value: undefined,
                metric: {
                    name: "VPM1",
                    nameMetric: "PF",
                    value: undefined,
                    description: "positive feedbacks",
                    primitive: {
                        formula: "1 - 1 / (CPF + 1)",
                        primitives: [
                            {
                                name: "CPF",
                                description: "количество положительных отзывов респондентов",
                                value: undefined
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: undefined,
                metric: {
                    name: "VPM2",
                    nameMetric: "NF",
                    value: undefined,
                    description: "negative feedbacks",
                    primitive: {
                        formula: "1 / (CNF + 1)",
                        primitives: [
                            {
                                name: "CNF",
                                description: "количество отрицательных отзывов респондентов",
                                value: undefined
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: undefined,
                metric: {
                    name: "VPM3",
                    nameMetric: "AF",
                    value: undefined,
                    description: "all feedbacks",
                    primitive: {
                        formula: "1 - 1 / (CAF + 1)",
                        primitives: [
                            {
                                name: "CAF",
                                description: "общее количество отзывов респондентов",
                                value: undefined
                            }
                        ]
                    }
                }
            }
        ]
    },
    {
        name: "VP3",
        nameIndex: "",
        description: "Мимика и самооценка респондентов",
        coefficients: [
            {
                name: "K1",
                value: undefined,
                metric: {
                    name: "VPM4",
                    nameMetric: "RFA",
                    value: undefined,
                    description: "respondent facial expression",
                    primitive: {
                        formula: "EPC * 0.1",
                        primitives: [
                            {
                                name: "EPC",
                                description: "количество баллов, которое устанавливает эксперт",
                                value: undefined,
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: undefined,
                metric: {
                    name: "VPM5",
                    nameMetric: "RFR",
                    value: undefined,
                    description: "rating from respondent",
                    primitive: {
                        formula: "RPC * 0.1",
                        primitives: [
                            {
                                name: "RPC",
                                description: "количество баллов, которое устанавливает респондент",
                                value: undefined,
                            }
                        ]
                    }
                }
            }
        ]
    }
];