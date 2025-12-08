/**
 * @description 问卷 Title
 * @author Haihua XU
 */

import Component from './Component'
import PropComponent from './PropComponent'
import { QuestionTitleDefaultProps } from './interface'

export * from './interface'

// Title 组件的配置
export default {
  title: 'Title',
  type: 'questionTitle', // 要和后端统一好
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}
