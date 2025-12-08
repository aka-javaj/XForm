import { post } from './ajax'

// 提交Answer Sheet
export async function postAnswer(answerInfo: any) {
  const url = '/api/answer'
  const data = await post(url, answerInfo)
  return data
}