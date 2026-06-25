import UltMeta, { Meta } from 'ult-meta';

/**
 * 验证组件状态 初始状态、移动中、验证成功、验证失败、
 */
class VerifyStatus extends UltMeta {
  /** 初始状态 */
  INITIAL = new Meta('1', '初始状态');
  /** 移动中 */
  MOVING = new Meta('2', '移动中');
  /** 验证中 */
  VERIFYING = new Meta('3', '验证中');
  /** 验证成功 */
  SUCCESS = new Meta('4', '验证成功');
  /** 验证失败 */
  FAILED = new Meta('5', '验证失败');
}

export const VERIFY_STATUS = new VerifyStatus();
