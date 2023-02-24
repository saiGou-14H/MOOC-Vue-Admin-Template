import request from '@/utils/request'

export function addPractice(class_id,obj){
  return request({
    url:'/practice/ctPractice?classId='+class_id,
    method:'post',
    data:obj


  })
}

export function getonepracts(praName){
  return request({
    url: '/practice/shPractice1',
    method:'get',
    praName
  })
}

export function delpracts(pra_id){
  return request({
    url:'/practice/delPractice/'+pra_id,
    method:'get'
  })
}

export function upParct(data){
  return request({
    url:'/practice/udPractice',
    method: 'post',
    data
  })

}
