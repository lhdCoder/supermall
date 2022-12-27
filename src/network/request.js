import axios from "axios";
export function request(config){
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
  // axios拦截器
  instance.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
  //发送网络请求   instance原本是promise类型因此不需要进行封装
  return instance(config)
}