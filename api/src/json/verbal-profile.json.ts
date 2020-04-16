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
                value: null
            },
            {
                name: "K2",
                nameConnect: "VP3",
                value: null
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
                value: null,
                metric: {
                    name: "VPM1",
                    nameMetric: "PF",
                    value: null,
                    description: "positive feedbacks",
                    primitive: {
                        formula: "1 - 1 / (CPF + 1)",
                        primitives: [
                            {
                                name: "CPF",
                                description: "количество положительных отзывов респондентов",
                                value: null
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "VPM2",
                    nameMetric: "NF",
                    value: null,
                    description: "negative feedbacks",
                    primitive: {
                        formula: "1 / (CNF + 1)",
                        primitives: [
                            {
                                name: "CNF",
                                description: "количество отрицательных отзывов респондентов",
                                value: null
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "VPM3",
                    nameMetric: "AF",
                    value: null,
                    description: "all feedbacks",
                    primitive: {
                        formula: "1 - 1 / (CAF + 1)",
                        primitives: [
                            {
                                name: "CAF",
                                description: "общее количество отзывов респондентов",
                                value: null
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
                value: null,
                metric: {
                    name: "VPM4",
                    nameMetric: "RFA",
                    value: null,
                    description: "respondent facial expression",
                    primitive: {
                        formula: "EPC * 0.1",
                        primitives: [
                            {
                                name: "EPC",
                                description: "количество баллов, которое устанавливает эксперт",
                                value: null,
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "VPM5",
                    nameMetric: "RFR",
                    value: null,
                    description: "rating from respondent",
                    primitive: {
                        formula: "RPC * 0.1",
                        primitives: [
                            {
                                name: "RPC",
                                description: "количество баллов, которое устанавливает респондент",
                                value: null,
                            }
                        ]
                    }
                }
            }
        ]
    }
];