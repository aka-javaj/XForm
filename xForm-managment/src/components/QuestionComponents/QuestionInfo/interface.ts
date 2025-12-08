export type QuestionInfoPropsType = {
  title?: string
  desc?: string

  // 用于 PropComponent
  onChange?: (newProps: QuestionInfoPropsType) => void
  disabled?: boolean
}

export const QuestionInfoDefaultProps: QuestionInfoPropsType = {
  title: 'Title',
  desc: 'Description...',
}
