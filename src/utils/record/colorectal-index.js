// 基本字典
const dictMap = [
  {
    field: 'gender',
    dictName: 'gender'
  },
  {
    field: 'bowelDrug',
    dictName: 'colorectal_bowel_drug'
  },
  {
    field: 'pegVolume',
    dictName: 'colorectal_peg_volume'
  },
  {
    field: 'antifoaming',
    dictName: 'yes_or_no'
  },
  {
    field: 'antifoamingType',
    dictName: 'colorectal_antifoaming_type'
  },
  {
    field: 'completed',
    dictName: 'yes_or_no'
  },
  {
    field: 'procedureType',
    dictName: 'colorectal_procedure_type'
  },
  {
    field: 'anesthesia',
    dictName: 'yes_or_no'
  },
  {
    field: 'deepLoc',
    dictName: 'colorectal_deep_loc'
  },
  {
    field: 'complication',
    dictName: 'yes_or_no'
  },
  {
    field: 'complicationOpt',
    dictName: 'colorectal_complication',
    isMulti: true
  },
  {
    field: 'polyp',
    dictName: 'yes_or_no'
  },
  {
    field: 'biopsy',
    dictName: 'yes_or_no'
  },
  {
    field: 'ibd',
    dictName: 'yes_or_no'
  },
  {
    field: 'ibdType',
    dictName: 'colorectal_ibd_type',
    isMulti: true
  },
  {
    field: 'lesionSite',
    dictName: 'colorectal_lesion_site'
  },
  {
    field: 'lesionType',
    dictName: 'colorectal_lesion_type'
  },
  {
    field: 'bleed',
    dictName: 'yes_or_no'
  },
  {
    field: 'stalk',
    dictName: 'yes_or_no'
  },
  {
    field: 'stalkShape',
    dictName: 'colorectal_stalk_shape'
  },
  {
    field: 'polypShape',
    dictName: 'colorectal_polyp_shape'
  },
  {
    field: 'otherLesion',
    dictName: 'yes_or_no'
  },
  {
    field: 'otherLesionOpt',
    dictName: 'colorectal_other_lesion',
    isMulti: true
  },
  // {
  //   field: 'diagnosisCode',
  //   dictName: 'colorectal_diagnosis_code'
  // },
  {
    field: 'colorectalCancer',
    dictName: 'yes_or_no'
  },
  {
    field: 'precancerousLesion',
    dictName: 'yes_or_no'
  },
  {
    field: 'expertReviewed',
    dictName: 'yes_or_no'
  },
  {
    field: 'bowelPrep',
    dictName: 'colorectal_bowel_prep'
  },
  {
    field: 'suggestion',
    dictName: 'colorectal_suggestion'
  },
  {
    field: 'treatment',
    dictName: 'yes_or_no'
  }
];
// 基础信息字段
const baseInfoLabelMap = [
  {
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
];
// 结果详情基础字段
const baseResultLabelMap = [
  {
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
  }
];
// 结果详情B部分字段
const resultBLabelMap = [
  {
    field: 'bowelDrug',
    label: '肠道准备用药',
    unit: ''
  },
  {
    field: 'pegVolume',
    label: '聚乙二醇（PEG）规格',
    unit: ''
  },
  {
    field: 'mgso4Dosage',
    label: '硫酸镁规格',
    unit: 'g'
  },
  {
    field: 'waterDosage',
    label: '水规格',
    unit: 'ml'
  },
  {
    field: 'otherDrugName',
    label: '其他药品名称',
    unit: ''
  },
  {
    field: 'otherDrugDosage',
    label: '其他药品计量',
    unit: 'g'
  },
  {
    field: 'antifoaming',
    label: '是否使用祛泡剂',
    unit: ''
  },
  {
    field: 'antifoamingType',
    label: '祛泡剂类型',
    unit: ''
  },
  {
    field: 'completed',
    label: '是否完成了结肠镜检查？',
    unit: ''
  },
  {
    field: 'procedureType',
    label: '结肠镜操作方式',
    unit: ''
  },
  {
    field: 'anesthesia',
    label: '是否采用麻醉？',
    unit: ''
  },
  {
    field: 'deepLoc',
    label: '到达深度',
    unit: ''
  },
  {
    field: 'deepLocDistance',
    label: '深度位置距肛缘',
    unit: 'cm'
  },
  {
    field: 'bowelPrep',
    label: '肠道准备情况',
    unit: ''
  },
  {
    field: 'withdrawalTime',
    label: '退镜时间',
    unit: '分钟'
  },
  {
    field: 'completeTime',
    label: '结肠镜完成时间',
    unit: '分钟'
  },
  {
    field: 'complication',
    label: '是否发生并发症',
    unit: ''
  },
  {
    field: 'complicationOpt',
    label: '并发症类型',
    unit: ''
  },
  {
    field: 'complicationDesc',
    label: '其他并发症类型',
    unit: ''
  }
];
// 息肉详情C部分字段
const resultCLabelMap = [
  {
    field: 'polyp',
    label: '是否检测到息肉/疑似癌',
    unit: ''
  },
  {
    field: 'polypCount',
    label: '镜下检出数量',
    unit: '个'
  },
  {
    field: 'biopsy',
    label: '是否活检',
    unit: ''
  },
  {
    field: 'biopsyCount',
    label: '息肉/疑似癌活检/切除（病理诊断）数量',
    unit: '个'
  },
  {
    field: 'ibd',
    label: '是否检出炎症性肠病',
    unit: ''
  },
  {
    field: 'ibdType',
    label: '炎症性肠病类型',
    unit: ''
  },
  {
    field: 'ibdCount',
    label: '炎症性肠病活检（病理诊断）数量',
    unit: '个'
  }
];
// 病变字段
const polypLabelMap = [
  {
    field: 'lesionSite',
    label: '病变部位',
    unit: ''
  },
  {
    field: 'lesionLoc',
    label: '病变位置（距肛缘）',
    unit: 'cm'
  },
  {
    field: 'lesionType',
    label: '镜下考虑病变类型',
    unit: ''
  },
  {
    field: 'specimenNumber',
    label: '病理送检号',
    unit: ''
  },
  {
    field: 'bleed',
    label: '是否出血',
    unit: ''
  },
  {
    field: 'maxSize',
    label: '最大径（息肉/疑似癌）',
    unit: 'cm'
  },
  {
    field: 'stalk',
    label: '是否存在蒂',
    unit: ''
  },
  {
    field: 'stalkShape',
    label: '蒂形状',
    unit: ''
  },
  {
    field: 'polypShape',
    label: '形状',
    unit: ''
  }
];
// 息肉详情C2部分字段
const resultC2LabelMap = [
  {
    field: 'otherLesion',
    label: '是否检出其他病变？',
    unit: ''
  },
  {
    field: 'otherLesionOpt',
    label: '其他病变类型',
    unit: ''
  },
  {
    field: 'otherLesionDesc',
    label: '其他病变描述',
    unit: ''
  },
  {
    field: 'suggestion',
    label: '处理意见',
    unit: ''
  },
  {
    field: 'treatment',
    label: '本次筛查是否完成镜下治疗/切除',
    unit: ''
  }
];
// 病理诊断字段
const pathologyDiagnosisLabelMap = [
  {
    field: 'pathologyNumber',
    label: '病理标本送检号',
    unit: ''
  },
  {
    field: 'lesionSite',
    label: '活检部位',
    unit: ''
  },
  {
    field: 'lesionLoc',
    label: '活检位置（距肛缘）',
    unit: 'cm'
  },
  {
    field: 'lesionType',
    label: '镜下考虑病变类型',
    unit: ''
  },
  {
    // field: 'diagnosisCode',
    field: 'diagnosisCodeText',
    label: '病理诊断编码',
    unit: ''
  },
  {
    field: 'villousRatio',
    label: '绒毛状结构比例',
    unit: '%'
  },
  {
    field: 'specimenRemark',
    label: '备注',
    unit: ''
  }
];
// 诊断信息
const diagnosisInfoLabelMap = [
  {
    field: 'colorectalCancer',
    label: '诊断为结直肠癌',
    unit: ''
  },
  {
    field: 'precancerousLesion',
    label: '诊断为癌前病变',
    unit: ''
  },
  {
    field: 'expertReviewed',
    label: '需要专家组复阅',
    unit: ''
  }
];

// 报告详情基础信息字段
const baseRecordLabelMap = [
  {
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
];
// 报告检查字段
const reportLabelMap = [
  {
    field: 'examResult',
    label: '检查结果',
    unit: ''
  },
  {
    field: 'diagResult',
    label: '诊断结果',
    unit: ''
  }
];
// 不换行字段白名单
const whiteLineList = [
  {
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
];
export {
  dictMap,
  baseInfoLabelMap,
  baseResultLabelMap,
  resultBLabelMap,
  polypLabelMap,
  resultCLabelMap,
  resultC2LabelMap,
  whiteLineList,
  pathologyDiagnosisLabelMap,
  diagnosisInfoLabelMap,
  reportLabelMap,
  baseRecordLabelMap
};
