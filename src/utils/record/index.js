// 基本字典
const dictMap = [{
    field: 'gender',
    dictName: 'gender'
  },
  {
    field: 'nonCalcifyNodule',
    dictName: 'yes_or_no'
  },
  {
    field: 'lungCancer',
    dictName: 'yes_or_no'
  },
  {
    field: 'allNoduleLess',
    dictName: 'yes_or_no'
  },
  {
    field: 'suggestion',
    dictName: 'lung_nodule_suggestion'
  },
  {
    field: 'location',
    dictName: 'lung_nodule_location'
  },
  {
    field: 'density',
    dictName: 'lung_nodule_density'
  },
  {
    field: 'feature',
    dictName: 'lung_nodule_feature',
    isMulti: true
  },
  {
    field: 'imageQuality',
    dictName: 'lung_image_quality',
  },
]
// 报告详情C部分字典
const reportCDictMap = [{
    field: 'abnormal',
    dictName: 'yes_or_no'
  },
  {
    field: 'lungOtherAbnormal',
    dictName: 'yes_or_no'
  },
  {
    field: 'lungOtherAbnormalOpt',
    dictName: 'lung_other_abnormal_opt',
    isMulti: true
  },
  {
    field: 'lungTuberculosisType',
    dictName: 'lung_tuberculosis_type'
  },
  {
    field: 'lungTuberculosisLoc',
    dictName: 'lung_other_loc_ext',
    isMulti: true
  },
  {
    field: 'silicosisType',
    dictName: 'silicosis_type'
  },
  {
    field: 'silicosisPhase',
    dictName: 'silicosis_phase'
  },
  {
    field: 'lungConsolidationLoc',
    dictName: 'lung_other_loc',
    isMulti: true
  },
  {
    field: 'atelectasisLoc',
    dictName: 'lung_other_loc',
    isMulti: true
  },
  {
    field: 'emphysemaLevel',
    dictName: 'emphysema_level',
  },
  {
    field: 'emphysemaLoc',
    dictName: 'lung_other_loc',
    isMulti: true
  },
  {
    field: 'lungBullaLoc',
    dictName: 'lung_other_loc',
    isMulti: true
  },
  {
    field: 'lungCystLoc',
    dictName: 'lung_other_loc_ext',
    isMulti: true
  },
  {
    field: 'lungFibrosisLoc',
    dictName: 'lung_other_loc_ext',
    isMulti: true
  },
  {
    field: 'fibrousScarLoc',
    dictName: 'lung_other_loc',
    isMulti: true
  },
  {
    field: 'lungCalcifyLoc',
    dictName: 'lung_other_loc',
    isMulti: true
  },
  {
    field: 'arteryCalcifyLevel',
    dictName: 'artery_calcify_level'
  },
  {
    field: 'arteryCalcifyLoc',
    dictName: 'artery_calcify_loc',
    isMulti: true
  },
  {
    field: 'airwayAbnormal',
    dictName: 'yes_or_no'
  },
  {
    field: 'airwayAbnormalOpt',
    dictName: 'lung_airway_abnormal_opt',
    isMulti: true
  },
  {
    field: 'airwayNoduleLoc',
    dictName: 'lung_airway_nodule_loc',
    isMulti: true
  },
  {
    field: 'airwayBronchiectasisLoc',
    dictName: 'lung_airway_bronchiectasis_loc',
    isMulti: true
  },
  {
    field: 'airwaySmallLoc',
    dictName: 'lung_airway_bronchiectasis_loc',
    isMulti: true
  },
  {
    field: 'chestAbnormal',
    dictName: 'yes_or_no'
  },
  {
    field: 'chestAbnormalOpt',
    dictName: 'lung_chest_abnormal_opt',
    isMulti: true
  },
  {
    field: 'chestRightEffusionVolume',
    dictName: 'lung_chest_effusion_volume'
  },
  {
    field: 'chestLeftEffusionVolume',
    dictName: 'lung_chest_effusion_volume'
  },
  {
    field: 'chestPleuraPlaqueLoc',
    dictName: 'lung_chest_loc',
    isMulti: true
  },
  {
    field: 'chestPleuraCalcifyLoc',
    dictName: 'lung_chest_loc',
    isMulti: true
  },
  {
    field: 'chestPleuraMassLoc',
    dictName: 'lung_chest_loc',
    isMulti: true
  },
  {
    field: 'chestWallLoc',
    dictName: 'lung_chest_loc',
    isMulti: true
  },
  {
    field: 'chestWallType',
    dictName: 'lung_chest_type',
    isMulti: true
  },
  {
    field: 'cervicothoracicAbnormal',
    dictName: 'yes_or_no',
  },
  {
    field: 'cervicothoracicAbnormalOpt',
    dictName: 'lung_cervicothoracic_abnormal_opt',
    isMulti: true
  },
  {
    field: 'thymusType',
    dictName: 'lung_thymus_type',
    isMulti: true
  },
  {
    field: 'lymphType',
    dictName: 'lung_lymph_type',
    isMulti: true
  },
  {
    field: 'esophagusType',
    dictName: 'lung_esophagus_type',
    isMulti: true
  },
  {
    field: 'breastAbnormal',
    dictName: 'yes_or_no'
  },
  {
    field: 'breastAbnormalOpt',
    dictName: 'lung_breast_abnormal_opt',
    isMulti: true
  },
  {
    field: 'breastLeftType',
    dictName: 'lung_breast_type',
    isMulti: true
  },
  {
    field: 'breastRightType',
    dictName: 'lung_breast_type',
    isMulti: true
  },
  {
    field: 'otherAbnormal',
    dictName: 'yes_or_no'
  },
  {
    field: 'otherCancer',
    dictName: 'yes_or_no'
  },
]
// 基础信息字段
const baseInfoLabelMap = [{
    field: 'name',
    label: '姓名',
    unit: ''
  },
  {
    field: 'cardNumber',
    label: '身份证号',
    unit: ''
  },
  {
    field: 'telephone',
    label: '手机号',
    unit: ''
  },
  {
    field: 'gender',
    label: '性别',
    unit: ''
  },
  {
    field: 'age',
    label: '年龄',
    unit: ''
  }

]
// 报告详情基础信息字段
const baseRecordLabelMap = [{
    field: 'evaluateCode',
    label: '问卷编码',
    unit: ''
  },
  {
    field: 'checkDate',
    label: '检查日期',
    unit: ''
  },
  {
    field: 'reportTime',
    label: '报告时间',
    unit: ''
  }
]
// 报告CT部分字段
const ctRecordLabelMap = [{
    field: 'reportDiagnosisResult',
    label: '检查所见',
    unit: ''
  },
  {
    field: 'reportImageResult',
    label: '影像学诊断',
    unit: ''
  },
]
// 结果详情基础字段
const baseResultLabelMap = [{
    field: 'addressDesc',
    label: '现居地址',
    unit: ''
  },
  {
    field: 'evaluateCode',
    label: '问卷编码',
    unit: ''
  },
  {
    field: 'screeningOrgName',
    label: '筛查机构',
    unit: ''
  },
  {
    field: 'recorder',
    label: '报告医生',
    unit: ''
  },
  {
    field: 'checkDate',
    label: '检查日期',
    unit: ''
  },
  {
    field: 'recordTime',
    label: '报告时间',
    unit: ''
  },
]
// 结果详情A部分字段
const resultALabelMap = [{
    field: 'tubeCurrent',
    label: '管电流',
    unit: 'mAs'
  },
  {
    field: 'tubeVoltage',
    label: '管电压',
    unit: 'KV'
  },
  {
    field: 'scanTime',
    label: '扫描时间（ScanTime）',
    unit: 's'
  },
  {
    field: 'ctdiVol',
    label: '容积CT剂量指数（CTDIvol）',
    unit: 'mGy'
  },
  {
    field: 'dlp',
    label: '剂量长度乘积（DLP）',
    unit: 'mGy.cm'
  },
  {
    field: 'imageQuality',
    label: '图像质量评级',
    unit: ''
  },
]
// 结果详情B部分字段
const resultBLabelMap = [{
    field: 'nonCalcifyNodule',
    label: '本次扫描是否检出非钙化结节或肿块？',
    unit: ''
  },
  {
    field: 'allNoduleLess',
    label: '是否所有非钙化结节<6mm？',
    unit: ''
  },
  {
    field: 'lungCancer',
    label: '是否检出肺癌或疑似肺癌病灶？',
    unit: ''
  },
  {
    field: 'nonCalcifyNoduleCount',
    label: '非钙化结节≥6mm的数量',
    unit: ''
  },
  {
    field: 'suggestion',
    label: '处理建议',
    unit: ''
  },
]
// B.4结节字段
const noduleLabelMap = [{
    field: 'location',
    label: '解剖位置',
    unit: ''
  }, {
    field: 'density',
    label: '密度',
    unit: ''
  },
  {
    field: 'feature',
    label: '表现特征',
    unit: ''
  },
  {
    field: 'noduleMaxSize',
    label: '结节最大长径',
    unit: 'mm'
  },
  {
    field: 'noduleMinSize',
    label: '结节垂直短径',
    unit: 'mm'
  },
  {
    field: 'noduleAvgSize',
    label: '结节平均直径',
    unit: 'mm'
  },
  {
    field: 'solidNoduleMaxSize',
    label: '实性结节最大长径',
    unit: 'mm'
  },
  {
    field: 'solidNoduleMinSize',
    label: '实性结节垂直短径',
    unit: 'mm'
  },
  {
    field: 'solidNoduleAvgSize',
    label: '实性结节平均直径',
    unit: 'mm'
  },
]
// 结果详情C部分字段
const resultCLabelMap = [{
    field: 'abnormal',
    label: '是否有其他异常',
    unit: ''
  },
  {
    field: 'lungOtherAbnormal',
    label: '是否有肺其他异常',
    unit: ''
  },
  {
    field: 'lungOtherAbnormalOpt',
    label: '肺其他异常',
    unit: ''
  },
  {
    field: 'lungTuberculosisType',
    label: '肺结核类型',
    unit: ''
  },
  {
    field: 'lungTuberculosisDesc',
    label: '肺结核描述',
    unit: ''
  },
  {
    field: 'lungTuberculosisLoc',
    label: '肺结核位置',
    unit: ''
  },
  {
    field: 'silicosisType',
    label: '矽肺类型',
    unit: ''
  },
  {
    field: 'silicosisPhase',
    label: '矽肺阶段',
    unit: ''
  },
  {
    field: 'lungConsolidationLoc',
    label: '肺实变位置',
    unit: ''
  },
  {
    field: 'atelectasisLoc',
    label: '肺不张位置',
    unit: ''
  },
  {
    field: 'emphysemaLevel',
    label: '肺气肿程度',
    unit: ''
  },
  {
    field: 'emphysemaLoc',
    label: '肺气肿位置',
    unit: ''
  },
  {
    field: 'lungBullaLoc',
    label: '肺大泡位置',
    unit: ''
  },
  {
    field: 'lungCystLoc',
    label: '肺囊肿位置',
    unit: ''
  },
  {
    field: 'lungFibrosisLoc',
    label: '肺间质纤维化位置',
    unit: ''
  },
  {
    field: 'fibrousScarLoc',
    label: '纤维瘢痕位置',
    unit: ''
  },
  {
    field: 'lungCalcifyLoc',
    label: '肺钙化灶位置',
    unit: ''
  },
  {
    field: 'arteryCalcifyLevel',
    label: '冠状动脉钙化程度',
    unit: ''
  },
  {
    field: 'arteryCalcifyLoc',
    label: '冠状动脉钙化位置',
    unit: ''
  },
  {
    field: 'airwayAbnormal',
    label: '是否有气道病变',
    unit: ''
  },
  {
    field: 'airwayAbnormalOpt',
    label: '气道病变选项',
    unit: ''
  },
  {
    field: 'airwayNoduleLoc',
    label: '支气管腔内结节位置',
    unit: ''
  },
  {
    field: 'airwayBronchiectasisLoc',
    label: '支气管扩张位置',
    unit: ''
  },
  {
    field: 'airwaySmallLoc',
    label: '小气道病变位置',
    unit: ''
  },
  {
    field: 'airwayDesc',
    label: '其他气道病变描述',
    unit: ''
  },
  {
    field: 'chestAbnormal',
    label: '是否有胸异常',
    unit: ''
  },
  {
    field: 'chestAbnormalOpt',
    label: '胸异常选项',
    unit: ''
  },
  {
    field: 'chestRightEffusionVolume',
    label: '胸右侧积液量',
    unit: ''
  },
  {
    field: 'chestLeftEffusionVolume',
    label: '胸左侧积液量',
    unit: ''
  },
  {
    field: 'chestPleuraPlaqueLoc',
    label: '胸膜斑块位置',
    unit: ''
  },
  {
    field: 'chestPleuraCalcifyLoc',
    label: '胸膜钙化位置',
    unit: ''
  },
  {
    field: 'chestPleuraMassLoc',
    label: '胸膜肿物位置',
    unit: ''
  },
  {
    field: 'chestWallLoc',
    label: '胸壁异常位置',
    unit: ''
  },
  {
    field: 'chestWallType',
    label: '胸壁异常类型',
    unit: ''
  },
  {
    field: 'chestWallDesc',
    label: '胸壁异常描述',
    unit: ''
  },
  {
    field: 'cervicothoracicAbnormal',
    label: '是否有颈胸段异常',
    unit: ''
  },
  {
    field: 'cervicothoracicAbnormalOpt',
    label: '颈胸段异常',
    unit: ''
  },
  {
    field: 'thyroidNoduleLevel',
    label: '甲状腺结节级别',
    unit: ''
  },
  {
    field: 'thyroidDesc',
    label: '甲状腺异常描述',
    unit: ''
  },
  {
    field: 'thymusType',
    label: '胸腺异常类型',
    unit: ''
  },
  {
    field: 'thymusDesc',
    label: '胸腺异常描述',
    unit: ''
  },
  {
    field: 'lymphType',
    label: '淋巴异常类型',
    unit: ''
  },
  {
    field: 'esophagusType',
    label: '食管异常类型',
    unit: ''
  },
  {
    field: 'esophagusDesc',
    label: '食管异常描述',
    unit: ''
  },
  {
    field: 'breastAbnormal',
    label: '是否有乳腺异常',
    unit: ''
  },
  {
    field: 'breastAbnormalOpt',
    label: '乳腺异常选项',
    unit: ''
  },
  {
    field: 'breastLeftType',
    label: '左乳异常类型',
    unit: ''
  },
  {
    field: 'breastLeftDesc',
    label: '左乳异常描述',
    unit: ''
  },
  {
    field: 'breastRightType',
    label: '右乳异常类型',
    unit: ''
  },
  {
    field: 'breastRightDesc',
    label: '右乳异常描述',
    unit: ''
  },
  {
    field: 'otherCancer',
    label: '是否有其他癌症或疑似病灶',
    unit: ''
  },
  {
    field: 'otherCancerDesc',
    label: '其他癌症或疑似病灶描述',
    unit: ''
  },
  {
    field: 'otherAbnormal',
    label: '是否有其他异常情况',
    unit: ''
  },
  {
    field: 'otherAbnormalDesc',
    label: '其他异常描述',
    unit: ''
  },
]
// 不换行字段白名单
const whiteLineList = [{
    field: 'cardNumber',
    label: '身份证号'
  },
  {
    field: 'checkDate',
    label: '检查日期'
  },
  {
    field: 'evaluateCode',
    label: '问卷编码'
  },
  {
    field: 'reportTime',
    label: '报告时间'
  },
  {
    field: 'screeningOrgName',
    label: '筛查机构'
  }
]
export {
  dictMap,
  baseRecordLabelMap,
  ctRecordLabelMap,
  baseInfoLabelMap,
  baseResultLabelMap,
  resultALabelMap,
  resultBLabelMap,
  noduleLabelMap,
  reportCDictMap,
  resultCLabelMap,
  whiteLineList
};
