import request from '@/utils/request'




export function searchMessage(){
  return request({
    url: '/message/shMessage',
    method: 'get'
  })
}

export function searchMesAnser(msg_id){
  return request({
    url: '/message/shMsgCom/'+msg_id,
    method: 'get'
  })
}


export function addMes(data){
  return request({
    url:'/message/ctMessage',
    method: 'post',
    data
  })
}

export function upMes(data){
  return request({
    url:'/message/udMessage',
    method: 'post',
    data
  })

}

export function delMes(msg_id){
  return request({
    url: '/message/delComment/'+msg_id,
    method: 'get'
  })
}
