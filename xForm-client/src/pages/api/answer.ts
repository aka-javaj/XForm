import type { NextApiRequest, NextApiResponse } from 'next'
import { postAnswer } from '@/services/answer'

function genAnswerInfo(reqBody: any) {
  const answerList: any[] = []

  Object.keys(reqBody).forEach(key => {
    if (key === 'questionId') return
    answerList.push({
      componentId: key,
      value: reqBody[key]
    })
  })

  return {
    questionId: reqBody.questionId || '',
    answerList
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    // 不是 post 则Return错误
    res.status(200).json({ errno: -1, msg: 'Method 错误' })
  }

  // 获取并格式化表单数据
  const answerInfo = genAnswerInfo(req.body)

  console.log('answerInfo', answerInfo)

  try {
    // 提交到服务端 Mock
    const resData = await postAnswer(answerInfo)
    // 使用 302 状态码重定向
    if (resData.errno === 0) {
      return res.writeHead(302, { Location: '/success' }).end();
    } else {
      return res.writeHead(302, { Location: '/fail' }).end();
    }
  } catch (err) {
    return res.writeHead(302, { Location: '/fail' }).end();
  }
  //   if (resData.errno === 0) {
  //     // 如果提交 successful了
  //     res.redirect('/success')
  //   } else {
  //     // 提交失败了 
  //     res.redirect('/fail')
  //   }
  // } catch (err) {
  //   res.redirect('/fail')
  // }

  // res.status(200).json({ errno: 0 })
}