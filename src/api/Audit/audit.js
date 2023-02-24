import request from '@/utils/request'
import { toJSON } from 'lodash/seq'

export function getAnswer(classid,courseid,state){
  return request({
    url: '/course/shQueAns/'+classid+"/"+courseid+"/"+state,
    method: 'get',
  })
}
export function getAnswerByclass(data){
  return request({
    url: '/class/shQueCom',
    method: 'post',
    data:data
  })
}

export function AuditQuestion(id,state){
  return request({
    url: '/questionAnswer/checkQue/'+id+'/'+state,
    method: 'get'
  })
}
