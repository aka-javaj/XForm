export type OptionType = {
  value: string
  text: string
  checked: boolean
}

export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]

  // 用于 PropComponent
  onChange?: (newProps: QuestionCheckboxPropsType) => void
  disabled?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: 'Multiple-choice Title',
  isVertical: false,
  list: [
    { value: 'item1', text: 'A', checked: false },
    { value: 'item2', text: 'B', checked: false },
    { value: 'item3', text: 'C', checked: false },
  ],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
