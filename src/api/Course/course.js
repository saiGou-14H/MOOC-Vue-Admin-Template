import request from '@/utils/request'
import { toJSON } from 'lodash/seq'
import { str } from 'mockjs/src/mock/random/basic'
export function getCourse(){
  return request({
    url:'/course/shAllCourse',
    method:'get'
  })
}

export function searchMessage(){
  return request({
    url: '/message/shMessage',
    method: 'get'
  })
}
export function shCourseType(){
  return request({
    url: '/courseType/shCourseType',
    method: 'get'
  })
}

export function dlCourse(courseid){
  return request({
    url: '/course/delCourses',
    method: 'post',
    data:{
      "couIds": [courseid]
    }
  })
}
export function adCourse(from){
  return request({
    url: 'course/ctCourse',
    method: 'post',
    data:from
  })
}
export function updateCourse(from){
  return request({
    url: '/course/udCourse',
    method: 'post',
    data:from
  })
}
export function shChapter(courseid){
  return request({
    url: '/course/shChapter/'+courseid,
    method: 'get',
  })
}

export function updateCourseChapter(courseid,from){
  return request({
    url: '/courseChapter/udChapter/'+courseid,
    method: 'post',
    data:from
  })
}
export function adCourseChapter(from){
  return request({
    url: '/courseChapter/ctChapter',
    method: 'post',
    data:from
  })
}

export function dlCourseChapter(chaId){
  return request({
    url: '/courseChapter/delChapter/'+chaId,
    method: 'get'
  })
}

export function upChapterIndex(from){
  return request({
    url: '/courseChapter/udChaIndex',
    method: 'post',
    data:from
  })
}
export function getImage(imageurl){
  return request({
    url: '.'+imageurl,
    method: 'get',
  })
}
