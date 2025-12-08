
// const HOST = 'http://localhost:3001' // Mock 的 host
const HOST = 'http://52.63.238.118:3001' // Mock 的 host

export async function get(url: string) {
  const res = await fetch(`${HOST}${url}`)
  const data = res.json()
  return data
}

export async function post(url: string, body: any) {

   // 将 body 转换为 x-www-form-urlencoded 格式
   const formBody = new URLSearchParams();
   for (const key in body) {
     if (body.hasOwnProperty(key)) {
       formBody.append(key, body[key]);
     }
   }
  // 设置 Content-Type 头部
  const res = await fetch(`${HOST}${url}`, {
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded', // 设置请求头
    // },
    // body: formBody.toString() // 发送 URL 编码的 body
    headers: {
      'Content-Type': 'application/json', // 设置为 JSON
    },
    body: JSON.stringify(body)
  });


  const data = await res.json(); // 确保正确解析响应
  return data;
}