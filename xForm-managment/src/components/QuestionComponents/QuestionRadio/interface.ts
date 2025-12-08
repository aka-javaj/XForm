export type OptionType = {
  value: string
  text: string
}

export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string

  // 用于 PropComponent
  onChange?: (newProps: QuestionRadioPropsType) => void
  disabled?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: 'Single-choice Title',
  isVertical: false,
  options: [
    { value: 'item1', text: 'A' },
    { value: 'item2', text: 'B' },
    { value: 'item3', text: 'C' },
  ],
  value: '',
}

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
