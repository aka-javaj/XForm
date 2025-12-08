/**
 * @description 问卷 Input Box
 * @author Haihua XU
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// Input 组件的配置
export default {
  title: 'Input Box',
  type: 'questionInput', // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionInputDefaultProps,
}
