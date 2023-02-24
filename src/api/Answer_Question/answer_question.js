import request from '@/utils/request'
import { toJSON } from 'lodash/seq'

export function getAnswer(classid,courseid){
  return request({
    url: '/course/shQueAns2/'+classid+"/"+courseid+'/1',
    method: 'get',
  })
}
export function AddQuestion(data){
  return request({
    url: '/questionAnswer/adQue',
    method: 'post',
    data:data
  })
}

export function sendQuestionComment(data){
  return request({
    url: '/questionComment/answerQue',
    method: 'post',
    data:data
  })
}
