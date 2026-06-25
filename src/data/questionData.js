// 调查问卷题目数据

// 判断题数据
export const judgmentQuestions = [{
    id: 'j1',
    field: 'judge1',
    title: '1. 癌症的发生通常需要十几年到几十年的时间',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j2',
    field: 'judge2',
    title: '2. 在我国部分地区（如采取防癌宣传教育、推广癌症筛查等综合手段的省市），癌症的发病和死亡情况已经得到改善',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j3',
    field: 'judge3',
    title: '3. 除了手术治疗，癌症的治疗方法还包括放射治疗、化学治疗、靶向治疗、免疫治疗、内分泌治疗、中西医结合治疗等。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j4',
    field: 'judge4',
    title: '4. 癌症的康复阶段只需要做到积极调整身体免疫力即可，心态对维持患者病情稳定作用不大。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j5',
    field: 'judge5',
    title: '5. 接种疫苗（如HPV疫苗）可以预防某些癌症的发生。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j6',
    field: 'judge6',
    title: '6. 癌症的种类和分期对治疗方案影响不大，可直接按照对别人效果好的方案进行治疗。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j7',
    field: 'judge7',
    title: '7. 有些癌症（如乳腺癌、肠癌等）具有一定的遗传性，家人应引起重视。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j8',
    field: 'judge8',
    title: '8. 防癌体检是根据个人的实际情况，针对常见癌症进行的身体检查，目前的医学手段已经可以早期发现大部分的常见癌症。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j9',
    field: 'judge9',
    title: '9. 出现经常性干咳、痰中带血等症状，提示可能患有肺癌。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j10',
    field: 'judge10',
    title: '10. 如果近期出现“身上的黑痣在短期内颜色变深且变大”等警示信号，可先自行进行切痣处理或在家观察一段时间，不必立即去医院。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j11',
    field: 'judge11',
    title: '11. 很多癌症可以通过民间偏方，服用保健品，或遵从广告中的治疗方案来治愈。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j12',
    field: 'judge12',
    title: '12. 癌症不是绝症，患者可以与癌症“和平共存”。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j13',
    field: 'judge13',
    title: '13. 患某些慢性疾病（如慢性乙肝、溃疡性结肠炎等）的人群患癌风险比一般人群高。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
  {
    id: 'j14',
    field: 'judge14',
    title: '14. 食管癌最多见的首发症状是吞咽困难或伴有吞咽疼痛。',
    required: true,
    type: 'judgment',
    dictKey: 'survey_judge', // 使用字典
    options: [] // 通过字典获取
  },
];

// 单选题数据

// 单选题数据
export const singleChoiceQuestions = [{
    id: 's1',
    field: 'single1',
    title: '1. 关于癌症与生活方式的关系，以下说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '癌症是由生活方式决定的，吸烟、酗酒的人早晚会患癌',
        value: 'A'
      },
      {
        label: '癌症与生活方式没有关系，好多人抽烟、酗酒但一辈子都没患癌',
        value: 'B'
      },
      {
        label: '癌症与个人的生活方式密切相关，不良生活方式会增加癌症的发生风险',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's2',
    field: 'single2',
    title: '2. 目前，我国人群中最常见的癌症是：',
    required: true,
    type: 'single',
    options: [{
        label: '肺癌',
        value: 'A'
      },
      {
        label: '膀胱癌',
        value: 'B'
      },
      {
        label: '胰腺癌',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's3',
    field: 'single3',
    title: '3. 目前，我国男性中最常见的癌症是：',
    required: true,
    type: 'single',
    options: [{
        label: '肺癌',
        value: 'A'
      },
      {
        label: '甲状腺癌',
        value: 'B'
      },
      {
        label: '前列腺癌',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's4',
    field: 'single4',
    title: '4. 目前，我国女性中最常见的癌症是：',
    required: true,
    type: 'single',
    options: [{
        label: '卵巢癌',
        value: 'A'
      },
      {
        label: '乳腺癌',
        value: 'B'
      },
      {
        label: '宫颈癌',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's5',
    field: 'single5',
    title: '5. 关于近年来我国癌症总体发病情况的说法，以下正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '肺癌、乳腺癌及结直肠癌等癌症的发病越来越多',
        value: 'A'
      },
      {
        label: '肺癌、乳腺癌及结直肠癌等癌症的发病越来越少',
        value: 'B'
      },
      {
        label: '肺癌、乳腺癌及结直肠癌等癌症的发病变化不大',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's6',
    field: 'single6',
    title: '6. 为降低和工作相关的致癌风险，下列做法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '把被污染的工作服直接带回家清洗',
        value: 'A'
      },
      {
        label: '如果佩戴了口罩，则不需要注意通风',
        value: 'B'
      },
      {
        label: '做好个人防护，按要求正确穿好防护服',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's7',
    field: 'single7',
    title: '7. 以下关于肿瘤的说法，正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '肿瘤有良性肿瘤和恶性肿瘤之分',
        value: 'A'
      },
      {
        label: '良性肿瘤不会发生恶变，完全不用担心',
        value: 'B'
      },
      {
        label: '良性和恶性肿瘤都会发生转移，只不过程度不同',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's8',
    field: 'single8',
    title: '8. 关于癌症的预防，以下说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '癌症的发生只和个人身体素质有关，和年龄无关',
        value: 'A'
      },
      {
        label: '癌症可以发生在任何年龄段，应从小养成健康的生活方式',
        value: 'B'
      },
      {
        label: '癌症主要是中老年人高发，不用关注年轻人和儿童的患癌风险',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's9',
    field: 'single9',
    title: '9. 关于癌症的发生，以下说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '主要和遗传有关',
        value: 'A'
      },
      {
        label: '主要和生活习惯有关',
        value: 'B'
      },
      {
        label: '既和自身因素有关，又和外部环境有关',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's10',
    field: 'single10',
    title: '10. 关于癌症是否会传染的说法，正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '所有的癌症都会传染，应与癌症患者保持距离',
        value: 'A'
      },
      {
        label: '部分癌症是具有传染性的，例如有的癌症往往一家人都患有',
        value: 'B'
      },
      {
        label: '癌症没有传染性，但一些与癌症发生密切相关的细菌、病毒有传染性',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's11',
    field: 'single11',
    title: '11. 关于防癌体检，下列说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '进行防癌体检时，应选择专业机构和适宜的项目',
        value: 'A'
      },
      {
        label: '可以根据自己的想法和兴趣随意选择体检的项目',
        value: 'B'
      },
      {
        label: '和常规体检差不多，做了常规体检就没必要再做防癌体检了',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's12',
    field: 'single12',
    title: '12. 对于防癌体检的频率，以下做法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '癌症发展很慢，所以防癌体检只需要做一次就可以了',
        value: 'A'
      },
      {
        label: '根据年龄、既往检查结果等选择合适的体检间隔时间',
        value: 'B'
      },
      {
        label: '只要身体没有出现不舒服，就没必要再去做防癌体检',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's13',
    field: 'single13',
    title: '13. 关于癌症确诊方式的说法，以下正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '如果身体出现了任何一项癌症的可疑信号，说明已经得了癌症',
        value: 'A'
      },
      {
        label: '如果血液检查没有发现肿瘤标志物，说明没有患癌，不必做其他检查',
        value: 'B'
      },
      {
        label: '需医生结合多种手段（如病理和影像学检查等）对癌症部位、分期、病理类型进行全面诊断',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's14',
    field: 'single14',
    title: '14. 关于手术对癌症患者的治疗效果，下列说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '手术可以根除病变部位，之后不必担心癌症复发',
        value: 'A'
      },
      {
        label: '手术是局部治疗，无法保证将全身癌细胞都清除',
        value: 'B'
      },
      {
        label: '手术后如果出现复发，则说明医生的手术不成功',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's15',
    field: 'single15',
    title: '15. 关于癌症治疗的安全性，下列说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '接受了放疗的患者，身上还会残留辐射，应该远离',
        value: 'A'
      },
      {
        label: '化疗的副作用很大，对身体的伤害远大于治疗的效果',
        value: 'B'
      },
      {
        label: '抗癌治疗已可以较好地控制不良反应，总体来说是安全的',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's16',
    field: 'single16',
    title: '16. 如果近期出现如厕频繁，大便带血且大便变细，则可能是患了：',
    required: true,
    type: 'single',
    options: [{
        label: '肝癌',
        value: 'A'
      },
      {
        label: '肠癌',
        value: 'B'
      },
      {
        label: '胰腺癌',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's17',
    field: 'single17',
    title: '17. 以下关于癌症治疗效果和生存时间说法，正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '癌症发现得越早，治疗效果越好，生存时间也越长',
        value: 'A'
      },
      {
        label: '生存时间和肿瘤恶性程度有关，和发现早晚关系不大',
        value: 'B'
      },
      {
        label: '只要患了癌症，即使是早发现，生存时间也不会太长',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's18',
    field: 'single18',
    title: '18. 关于癌症的手术治疗，以下说法正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '所有癌症都应该首选手术治疗',
        value: 'A'
      },
      {
        label: '手术创伤太大，最好不要手术',
        value: 'B'
      },
      {
        label: '需要医生根据实际情况判断能否手术',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's19',
    field: 'single19',
    title: '19. 对待防癌体检的结果，下列做法中正确的是：',
    required: true,
    type: 'single',
    options: [{
        label: '只要防癌体检存在异常指标，就说明已经得了癌症',
        value: 'A'
      },
      {
        label: '如果防癌体检发现问题，应尽快到正规医院做进一步诊断和治疗',
        value: 'B'
      },
      {
        label: '如果防癌体检发现问题，但身体没有任何不适，则不用管它',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's20',
    field: 'single20',
    title: '20. 某患者需要长期服用抗癌药物，下列做法正确的是',
    required: true,
    type: 'single',
    options: [{
        label: '药片只要吃下去，效果都是一样的，可以自己碾碎了或和别的东西混着吃',
        value: 'A'
      },
      {
        label: '如果某一次的抗癌药忘了吃或者少吃了几片，则应该在下一次吃药时补上',
        value: 'B'
      },
      {
        label: '同一药物饭前吃和饭后吃，药效可能有区别，要严格按照医生说的时间吃',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's21',
    field: 'single21',
    title: '21. 癌症患者出院后，下列关于复查的做法正确的是',
    required: true,
    type: 'single',
    options: [{
        label: '在复查时，进行的频率越多越好，做的项目越全越好',
        value: 'A'
      },
      {
        label: '只要按时吃药就行，不用去医院复诊，增加社会医疗负担',
        value: 'B'
      },
      {
        label: '按医生要求定期复查，否则可能无法及时发现转移或复发病灶，耽误治疗',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  },
  {
    id: 's22',
    field: 'single22',
    title: '22. 得了癌症后，下列做法可取的是',
    required: true,
    type: 'single',
    options: [{
        label: '不能向家人朋友述说痛苦，以免影响他们的心情',
        value: 'A'
      },
      {
        label: '主动向家人或朋友倾诉，难以缓解时寻求心理医生',
        value: 'B'
      },
      {
        label: '不能和病友交流，只会增加自己的痛苦',
        value: 'C'
      },
      {
        label: '不知道',
        value: 'D'
      }
    ]
  }
];

// 多选题数据
export const multipleChoiceQuestions = [{
    id: 1,
    field: 'multi1',
    title: '1. 癌症的发生和哪些因素有关',
    type: 'multiple',
    required: true,
    options: [{
        label: '化学因素，如有毒的有机物等',
        value: 'A'
      },
      {
        label: '物理因素，如辐射等',
        value: 'B'
      },
      {
        label: '心理因素，如压力过大、精神紧张等',
        value: 'C'
      },
      {
        label: '行为因素，如不健康的生活方式等',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 2,
    field: 'multi2',
    title: '2. 以下哪些生物因素会增加癌症的发生风险',
    type: 'multiple',
    required: true,
    options: [{
        label: '肠道里的益生菌会增加肠癌的发生风险',
        value: 'A'
      },
      {
        label: '感染幽门螺杆菌会增加胃癌的发生风险',
        value: 'B'
      },
      {
        label: '感染乙肝病毒（HBV）会增加肝癌的发生风险',
        value: 'C'
      },
      {
        label: '感染人乳头瘤病毒（HPV）会增加宫颈癌的发生风险',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 3,
    field: 'multi3',
    title: '3. 长期食用下列哪些食物可增加患癌风险',
    type: 'multiple',
    required: true,
    options: [{
        label: '加工肉类、烧烤（火烧、炭烧）',
        value: 'A'
      },
      {
        label: '腌制食品（如咸菜等）',
        value: 'B'
      },
      {
        label: '烫食、热食',
        value: 'C'
      },
      {
        label: '槟榔',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 4,
    field: 'multi4',
    title: '4. 您认为工作中长期接触下列哪些物质时，可能增加癌症的发生风险',
    type: 'multiple',
    required: true,
    options: [{
        label: '皮革、橡胶、塑料的生产或加工原料',
        value: 'A'
      },
      {
        label: '放射性物质（如X射线、氡和放射性金属等）',
        value: 'B'
      },
      {
        label: '石棉、粉尘等',
        value: 'C'
      },
      {
        label: '油漆、染料等',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 5,
    field: 'multi5',
    title: '5. 下列哪些不良生活习惯会增加患癌风险',
    type: 'multiple',
    required: true,
    options: [{
        label: '缺乏运动',
        value: 'A'
      },
      {
        label: '吸烟、酗酒',
        value: 'B'
      },
      {
        label: '过于注重个人卫生',
        value: 'C'
      },
      {
        label: '不合理的饮食习惯',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 6,
    field: 'multi6',
    title: '6. 预防癌症的发生，应该做到',
    type: 'multiple',
    required: true,
    options: [{
        label: '保持心情舒畅',
        value: 'A'
      },
      {
        label: '进行适量的运动',
        value: 'B'
      },
      {
        label: '戒烟，限制酒精摄入',
        value: 'C'
      },
      {
        label: '仅按个人喜好安排饮食',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 7,
    field: 'multi7',
    title: '7. 下列防癌做法中，正确的是',
    type: 'multiple',
    required: true,
    options: [{
        label: '入住新装修的房屋前应多通风',
        value: 'A'
      },
      {
        label: '霉变食物冲洗或去除腐烂部位后继续食用',
        value: 'B'
      },
      {
        label: '减少使用有烟的燃料或炉具',
        value: 'C'
      },
      {
        label: '避免直接饮用不洁的生水',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 8,
    field: 'multi8',
    title: '8. 采取以下哪些措施，可有效降低癌症的发病和死亡',
    type: 'multiple',
    required: true,
    options: [{
        label: '定期进行防癌体检',
        value: 'A'
      },
      {
        label: '参加癌症早期筛查',
        value: 'B'
      },
      {
        label: '接受健康宣教，树立健康意识和理念',
        value: 'C'
      },
      {
        label: '积极治疗慢性感染（如慢性乙肝等）',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 9,
    field: 'multi9',
    title: '9. 目前关于癌症的预防和治疗，以下说法正确的是',
    type: 'multiple',
    required: true,
    options: [{
        label: '通过采取积极措施，部分癌症是完全可以预防的',
        value: 'A'
      },
      {
        label: '在现有的医疗水平下，有的癌症已经可以治愈',
        value: 'B'
      },
      {
        label: '癌症发展得很快，任何癌症即使早期发现也无法治愈',
        value: 'C'
      },
      {
        label: '部分癌症虽然无法治愈，但能通过治疗缓解痛苦、延长寿命',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 10,
    field: 'multi10',
    title: '10. 关于常见癌症的筛查手段，下列哪些说法是正确的',
    type: 'multiple',
    required: true,
    options: [{
        label: '胃肠镜检查可以发现早期消化道癌',
        value: 'A'
      },
      {
        label: '胸部低剂量螺旋CT检查可以发现早期肺癌',
        value: 'B'
      },
      {
        label: '腹部B超检查结合甲胎蛋白可以发现早期肝癌',
        value: 'C'
      },
      {
        label: '乳腺超声结合乳腺X线摄影检查可以发现早期乳腺癌',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 11,
    field: 'multi11',
    title: '11. 出现下列哪些症状时，提示可能患有乳腺癌，应及时去医院就诊',
    type: 'multiple',
    required: true,
    options: [{
        label: '体检提示乳腺增生',
        value: 'A'
      },
      {
        label: '乳房出现不规则的肿块',
        value: 'B'
      },
      {
        label: '乳头溢液，或乳头凹陷、后缩',
        value: 'C'
      },
      {
        label: '乳房出现橘皮样的外观表现',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 12,
    field: 'multi12',
    title: '12. 以下哪些症状可能是癌症的警示信号，应引起重视',
    type: 'multiple',
    required: true,
    options: [{
        label: '持久性声音嘶哑，干咳',
        value: 'A'
      },
      {
        label: '不明原因的明显体重减轻',
        value: 'B'
      },
      {
        label: '不明原因的反复发热、乏力',
        value: 'C'
      },
      {
        label: '尿血、便血等不明原因的出血',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 13,
    field: 'multi13',
    title: '13. 以下哪些人群是癌症的高危人群',
    type: 'multiple',
    required: true,
    options: [{
        label: '肥胖人群',
        value: 'A'
      },
      {
        label: '年龄在50岁及以上人群',
        value: 'B'
      },
      {
        label: '性格内向、爱生闷气人群',
        value: 'C'
      },
      {
        label: '直系亲属患有癌症的人群',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 14,
    field: 'multi14',
    title: '14. 关于癌症患者疼痛的说法，正确的是',
    type: 'multiple',
    required: true,
    options: [{
        label: '癌痛是癌症患者的常见症状之一，但多数经治疗可缓解',
        value: 'A'
      },
      {
        label: '出现癌痛时应遵医生建议科学止痛',
        value: 'B'
      },
      {
        label: '只要是癌症就会发生疼痛，基本没有办法缓解',
        value: 'C'
      },
      {
        label: '癌症患者一旦出现疼痛，就代表已经到了疾病晚期',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 15,
    field: 'multi15',
    title: '15. 为了更好的康复，癌症患者应做到',
    type: 'multiple',
    required: true,
    options: [{
        label: '合理用药，积极处理疼痛、控制病情',
        value: 'A'
      },
      {
        label: '膳食均衡，必要时接受营养支持治疗',
        value: 'B'
      },
      {
        label: '定期复查，及时发现病灶、采取措施',
        value: 'C'
      },
      {
        label: '长期卧床静养，保存精力，拒绝任何运动',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  },
  {
    id: 16,
    field: 'multi16',
    title: '16. 癌症患者到医院就诊时，以下做法正确的是',
    type: 'multiple',
    required: true,
    options: [{
        label: '去上级医院就诊时，没有必要带上之前的检查报告',
        value: 'A'
      },
      {
        label: '尊重并相信正规医院的医生，与医生充分沟通，表达自己的症状和想法',
        value: 'B'
      },
      {
        label: '前往正规医院前，提前准备好所有病历资料，最好整理成一份完整的纸质材料',
        value: 'C'
      },
      {
        label: '无论出现任何症状，都必须选择去肿瘤专科就诊',
        value: 'D'
      },
      {
        label: '不知道',
        value: 'E'
      }
    ]
  }
];

// 基本情况题目数据（暂留空）
export const basicInfoQuestions = [
  // 暂留空，后续扩展
];

// 字典配置映射
export const dictConfig = {
  survey_health_status: 'survey_health_status',
  survey_household_type: 'survey_household_type',
  survey_judge: 'survey_judge' // 添加判断题字典配置
};
