import IIndex from "src/project/interfaces/index.interface";

export const uiProfile: IIndex[] = [
    {
        name: "UI1",
        nameIndex: "HCIUQGI",
        description: "Human-computer interaction usability quality generalized index",
        coefficients: [
            {
                name: "K1",
                nameConnect: "UI2",
                value: null
            },
            {
                name: "K2",
                nameConnect: "UI13",
                value: null
            },
        ]
    },
    {
        name: "UI2",
        nameIndex: "UIUQI",
        description: "User interface usability quality index",
        coefficients: [
            {
                name: "K1",
                nameConnect: "UI3",
                value: null
            },
            {
                name: "K2",
                nameConnect: "UI4",
                value: null
            },
            {
                name: "K3",
                nameConnect: "UI5",
                value: null
            },
            {
                name: "K4",
                nameConnect: "UI6",
                value: null
            },
            {
                name: "K5",
                nameConnect: "UI7",
                value: null
            },
            {
                name: "K6",
                nameConnect: "UI8",
                value: null
            },
            {
                name: "K7",
                nameConnect: "UI9",
                value: null
            },
            {
                name: "K8",
                nameConnect: "UI10",
                value: null
            },
            {
                name: "K9",
                nameConnect: "UI11",
                value: null
            },
            {
                name: "K10",
                nameConnect: "UI12",
                value: null
            },
            {
                name: "K11",
                nameConnect: "UI13",
                value: null
            },
            {
                name: "K12",
                nameConnect: "UI14",
                value: null
            },
        ]
    },
    {
        name: "UI3",
        nameIndex: "UIARI",
        description: "User interface appropriateness recognisability index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM1",
                    nameMetric: "DECO",
                    value: null,
                    description: "description completeness",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функций (или типов функций), которые описаны понятно в описании программного обеспечении"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество функций (или типов функций)"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM2",
                    nameMetric: "CODE",
                    value: null,
                    description: "coverage of demonstration",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функций, реализованных с возможностью демонстрации"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество функций, для которых необходима демонстрация возможностей"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM3",
                    nameMetric: "EPSD",
                    value: null,
                    description: "entry point self-descriptiveness",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "число страниц веб-сайта, которые объясняют цель веб-сайта,"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "число страниц веб-сайта"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI4",
        nameIndex: "UILI",
        description: "User interface learnability index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM4",
                    nameMetric: "UGCO",
                    value: null,
                    description: "user guidance completeness",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функций, которые описаны документации пользователя и/или документации и/или справочном средстве"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество реализованных функций, для которых требуется детальное объяснение"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM5",
                    nameMetric: "EFDE",
                    value: null,
                    description: "entry fields defaults",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество полей ввода информации, имеющих автоматическое заполнение по-умолчанию"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество полей, у которых могли быть значения по умолчанию"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM6",
                    nameMetric: "EMUN",
                    value: null,
                    description: "error messages understandability",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество сообщений об ошибках, в которых объясняется причина появления ошибки"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "Количество сообщений об ошибках "
                            }
                        ]
                    }
                }
            },
            {
                name: "K4",
                value: null,
                metric: {
                    name: "UM7",
                    nameMetric: "SEUI",
                    value: null,
                    description: "self-explanatory user interface",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "число информационных элементов и переходов, которые представлены способом, который был бы понятен пользователю"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "Число информационных элементов и переходов,  которые должен выполнить новый пользователь для решения общих задач"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI5",
        nameIndex: "UIOI",
        description: "User interface operability index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM8",
                    nameMetric: "OPCO",
                    value: null,
                    description: "operational consistency",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество операций, которые ведут себя непоследовательно"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество операций, которые ведут себя подобно"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM9",
                    nameMetric: "MECL",
                    value: null,
                    description: "message clarity",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество сообщений, которые легко понять"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество реализованных сообщений"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM10",
                    nameMetric: "FUCU",
                    value: null,
                    description: "functional customizability",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество реализованных функций, которые можно настроить во время работы"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество функций, для которых требуется возможность настройки"
                            }
                        ]
                    }
                }
            },
            {
                name: "K4",
                value: null,
                metric: {
                    name: "UM11",
                    nameMetric: "UICU",
                    value: null,
                    description: "user interface customizability",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество элементов интерфейса пользователя, которые могут быть настроены"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество элементов интерфейса пользователя, которые могли бы быть настраиваемыми"
                            }
                        ]
                    }
                }
            },
            {
                name: "K5",
                value: null,
                metric: {
                    name: "UM12",
                    nameMetric: "MOCA",
                    value: null,
                    description: "monitoring capability",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функций, имеющих возможность мониторинга состояния"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество функций, которые необходимо дополнить функцией мониторинга"
                            }
                        ]
                    }
                }
            },
            {
                name: "K6",
                value: null,
                metric: {
                    name: "UM13",
                    nameMetric: "UNCA",
                    value: null,
                    description: "undo capability",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество задач, которые обеспечивают возможность отмены или запрашивают подтверждение"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество задач, для которых необходимо дополнить возможностью подтверждения или отмены"
                            }
                        ]
                    }
                }
            },
            {
                name: "K7",
                value: null,
                metric: {
                    name: "UM14",
                    nameMetric: "UCIN",
                    value: null,
                    description: "understandable categorization of information",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество информационных структур, которые знакомы и удобны для предполагаемых пользователей"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество информационных структур"
                            }
                        ]
                    }
                }
            },
            {
                name: "K8",
                value: null,
                metric: {
                    name: "UM15",
                    nameMetric: "APCO",
                    value: null,
                    description: "appearance consistency",
                    primitive: {
                        formula: "1 - A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество интерфейсов пользователя с подобными элементами, но по- разному появляющимися в интерфейсах пользователя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество интерфейсов пользователя с подобными элементами"
                            }
                        ]
                    }
                }
            },
            {
                name: "K9",
                value: null,
                metric: {
                    name: "UM16",
                    nameMetric: "IDSU",
                    value: null,
                    description: "input device support)",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество задач, которые могут выполняться всем множеством устройств ввода"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество задач"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI6",
        nameIndex: "UIUEPI",
        description: "User interface user error protection index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM17",
                    nameMetric: "AUPE",
                    value: null,
                    description: "avoidance of user operation error",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество действий пользователя, которые защищены от любого системного сбоя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество действий пользователя, которые должны быть защищены от любого системного сбоя"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM18",
                    nameMetric: "UEEC",
                    value: null,
                    description: "user entry error correction",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество ошибок входа пользователя, для которых система предлагает правильное значение"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество ошибок входа пользователя, которое было обнаружено"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM19",
                    nameMetric: "UERE",
                    value: null,
                    description: "user errors recoverability",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество ошибок пользователя, которые были проанализированы, чтобы быть парированы системой"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество ошибок пользователя, которые могут произойти во время функционирования программного обеспечения"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI7",
        nameIndex: "UIAI",
        description: "User interface aesthetics index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM20",
                    nameMetric: "AAUI",
                    value: null,
                    description: "appearance aesthetics of user interfaces",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество отображаемых интерфейсов, эстетически приятные при появлении"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество отображаемых интерфейсов"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI8",
        nameIndex: "UIAI",
        description: "User interface accessibility index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM21",
                    nameMetric: "AUDI",
                    value: null,
                    description: "accessibility for users with disabilities",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функций, адаптированных под пользователей с ограниченными возможностями"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество реализованных функций"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM22",
                    nameMetric: "SLAD",
                    value: null,
                    description: "supported languages adequacy",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество языков, которые поддерживаются"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество языков, которое должны поддерживаться"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI9",
        nameIndex: "UIUI",
        description: "User interface understandability index",
        coefficients: [
            {
                name: "K1",
                nameConnect: "UI10",
                value: null
            },
            {
                name: "K2",
                nameConnect: "UI11",
                value: null
            },
            {
                name: "K3",
                nameConnect: "UI12",
                value: null
            },
        ]
    },
    {
        name: "UI10",
        nameIndex: "UIDI",
        description: "User interface documentation index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM23",
                    nameMetric: "SFDC",
                    value: null,
                    description: "software functionality documentation coverage",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функций ПО, которые обеспечены документаций"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество функций ПО"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM24",
                    nameMetric: "CSDS",
                    value: null,
                    description: "coverage of search in user documentation of software",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество пользовательских документов, для которых предусмотрена возможность поиска"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество пользовательских документов"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI11",
        nameIndex: "UICI",
        description: "User interface consistency index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM25",
                    nameMetric: "VICO",
                    value: null,
                    description: "visual consistency",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество визуально согласованных элементов интерфейса пользователя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество элементов интерфейса пользователя"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM26",
                    nameMetric: "FUCO",
                    value: null,
                    description: "functional consistency",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество функционально согласованных элементов интерфейса пользователя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество элементов интерфейса пользователя"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM27",
                    nameMetric: "INCO",
                    value: null,
                    description: "internal consistency",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество визуально и функционально согласованных элементов интерфейса пользователя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество элементов интерфейса пользователя"
                            }
                        ]
                    }
                }
            },
            {
                name: "K4",
                value: null,
                metric: {
                    name: "UM28",
                    nameMetric: "EXCO",
                    value: null,
                    description: "external consistency",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество согласованных интерфейсов пользователя для разных систем или веб-страниц"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество интерфейсов пользователя для разных систем или веб-страниц"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI12",
        nameIndex: "UIIFI",
        description: "User interface informative feedback index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM29",
                    nameMetric: "IFCO",
                    value: null,
                    description: "informative feedbacks coverage",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество обратных связей"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество функций системы, для которых необходимы обратные связи"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI13",
        nameIndex: "UEUQI",
        description: "User experience usability quality index",
        coefficients: [
            {
                name: "K1",
                nameConnect: "UI14",
                value: null
            },
            {
                name: "K2",
                nameConnect: "UI15",
                value: null
            },
            {
                name: "K3",
                nameConnect: "UI16",
                value: null
            },
        ]
    },
    {
        name: "UI14",
        nameIndex: "UEEI",
        description: "User experience effectiveness index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM30",
                    nameMetric: "TACC",
                    value: null,
                    description: "task completed",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество выполненных задач"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество попыток"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM31",
                    nameMetric: "TACC",
                    value: null,
                    description: "task effectiveness",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "?"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "?"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM32",
                    nameMetric: "ERFR",
                    value: null,
                    description: "error frequency (failure frequency)",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество ошибок, сделанных пользователем"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество задач (или может быть время)"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI15",
        nameIndex: "UEEFI",
        description: "User experience efficiency index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM33",
                    nameMetric: "TIEF",
                    value: null,
                    description: "time efficiency (task time)",
                    primitive: {
                        formula: "(Tt - Ta) / Tt",
                        primitives: [
                            {
                                name: "Tt",
                                value: null,
                                description: "целевое время"
                            },
                            {
                                name: "Ta",
                                value: null,
                                description: "фактическое время"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM34",
                    nameMetric: "RTTI",
                    value: null,
                    description: "relative task time [relative work duration]",
                    primitive: {
                        formula: "B / A",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "время на выполнение задачи для обычного пользователя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "время выполнения задачи для опытного пользователя"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM35",
                    nameMetric: "TAEF",
                    value: null,
                    description: "task efficiency",
                    primitive: {
                        formula: "M1 / T",
                        primitives: [
                            {
                                name: "M1",
                                value: null,
                                description: "количество пользователей"
                            },
                            {
                                name: "T",
                                value: null,
                                description: "единица времени для решения задачи"
                            }
                        ]
                    }
                }
            },
            {
                name: "K4",
                value: null,
                metric: {
                    name: "UM36",
                    nameMetric: "RTEF",
                    value: null,
                    description: "relative task efficiency",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "эффективность задачи обычного пользователя"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "эффективность задачи для эксперта"
                            }
                        ]
                    }
                }
            },
            {
                name: "K5",
                value: null,
                metric: {
                    name: "UM37",
                    nameMetric: "ECPR",
                    value: null,
                    description: "economic productivity",
                    primitive: {
                        formula: "M1 / C",
                        primitives: [
                            {
                                name: "M1",
                                value: null,
                                description: "результативность задачи"
                            },
                            {
                                name: "C",
                                value: null,
                                description: "общая стоимость задачи"
                            }
                        ]
                    }
                }
            },
            {
                name: "K6",
                value: null,
                metric: {
                    name: "UM38",
                    nameMetric: "PRPR",
                    value: null,
                    description: "productive proportion",
                    primitive: {
                        formula: "Ta / Tb",
                        primitives: [
                            {
                                name: "Ta",
                                value: null,
                                description: "продуктивное время = время задачи - время помощи - время ошибки - время поиска"
                            },
                            {
                                name: "Tb",
                                value: null,
                                description: "время задачи"
                            }
                        ]
                    }
                }
            },
            {
                name: "K7",
                value: null,
                metric: {
                    name: "UM39",
                    nameMetric: "RNUA",
                    value: null,
                    description: "relative number of user actions",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество действий, выполненных пользователем"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество фактически необходимых действий"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI16",
        nameIndex: "UESI",
        description: "User experience satisfaction index",
        coefficients: [
            {
                name: "K1",
                nameConnect: "UI17",
                value: null
            },
            {
                name: "K2",
                nameConnect: "UI18",
                value: null
            },
            {
                name: "K3",
                nameConnect: "UI19",
                value: null
            },
            {
                name: "K4",
                nameConnect: "UI20",
                value: null
            }
        ]
    },
    {
        name: "UI17",
        nameIndex: "UEUI",
        description: "User experience usefulness index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM40",
                    nameMetric: "SASC",
                    value: null,
                    description: "satisfaction scale",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество анкет (с психо-метрическими шкалами и вопросами), в которых пользователи были удовлетворены работой с системой"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество участников"
                            }
                        ]
                    }
                }
            },
            {
                name: "K2",
                value: null,
                metric: {
                    name: "UM41",
                    nameMetric: "SAQU",
                    value: null,
                    description: "satisfaction questionnaire",
                    primitive: {
                        formula: "A / n",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "ответ на вопрос"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество возможных ответов"
                            }
                        ]
                    }
                }
            },
            {
                name: "K3",
                value: null,
                metric: {
                    name: "UM42",
                    nameMetric: "DIUS",
                    value: null,
                    description: "discretionary usage",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество раз, когда используются определенные программные функции приложения системы"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество раз, которое они (определенные функции) предназначены для использования"
                            }
                        ]
                    }
                }
            },
            {
                name: "K4",
                value: null,
                metric: {
                    name: "UM43",
                    nameMetric: "DUFU",
                    value: null,
                    description: "discretionary utilization of functions",
                    primitive: {
                        formula: "A / n",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "доля пользователей, использующих функцию i"
                            },
                            {
                                name: "n",
                                value: null,
                                description: "количество функций"
                            }
                        ]
                    }
                }
            },
            {
                name: "K5",
                value: null,
                metric: {
                    name: "UM44",
                    nameMetric: "PCCO",
                    value: null,
                    description: "proportion of customer complaints",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество пользователей, которые жалуются"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "общее количество пользователей"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI18",
        nameIndex: "UETI",
        description: "User experience trust index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM45",
                    nameMetric: "TRSC",
                    value: null,
                    description: "trust scale",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество анкет (с психо-метрическими шкалами и вопросами), в которых пользователи бы доверяли системе"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество участников"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI19",
        nameIndex: "UEPI",
        description: "User experience pleasure index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM46",
                    nameMetric: "PLSC",
                    value: null,
                    description: "pleasure scale",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество анкет (с психо-метрическими шкалами и вопросами), в которых пользователи бы испытывали наслаждение от работы с системой"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество участников"
                            }
                        ]
                    }
                }
            },
        ]
    },
    {
        name: "UI20",
        nameIndex: "UECI",
        description: "User experience comfort index",
        coefficients: [
            {
                name: "K1",
                value: null,
                metric: {
                    name: "UM47",
                    nameMetric: "COSC",
                    value: null,
                    description: "comfort scale",
                    primitive: {
                        formula: "A / B",
                        primitives: [
                            {
                                name: "A",
                                value: null,
                                description: "количество анкет (с психо-метрическими шкалами и вопросами), в которых пользователи бы испытывали комфорт от работы с системой"
                            },
                            {
                                name: "B",
                                value: null,
                                description: "количество участников"
                            }
                        ]
                    }
                }
            },
        ]
    },
];