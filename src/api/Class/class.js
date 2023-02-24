import request from '@/utils/request'
export function searchAllClass() {
  return request({
    url: '/class/searchAllClass',
    method: 'get'
  })
}

export function AddClass(obj){
  return request({
    url: '/class/ctClass',
    method: 'post',
    obj
  })
}

export function searchClassStu(){
  return request({
    url: '/shStudent/{class_id}',
    method: 'get'
  })
}

export function seacrchPractices(){
  return request({
    url:'/practice/shPractice3',
    method:'get'
  })
}

export function shStudent(class_id){
  return request({
    url:'class/shStudent/'+ class_id,
    method:'get',
  })
}

export function addStu(class_id,stu_id){
  return request({
    url:'/class/adStudent/'+class_id+'/'+stu_id,
    method:'get'

  })
}

export function delStu(class_id,stu_id){
  return request({
    url: '/class/delStuFromClass/' +class_id +'/' +stu_id,
    method: 'post'

  })
}

export function shClass(class_id){
  return request({
    url:'class/shClass/'+ class_id,
    method:'get',
  })
}

export function upClass(data){
  return request({
    url:'class/upClass',
    method: 'post',
    data
  })

}

// 班级添加课程
export function addClassCous(class_id,cou_id){
  return request({
    url:'/classCourse/adCourse/'+class_id +'/' +cou_id,
    method: 'get'
  })
}

// 班级移除课程
export function delclasscours(class_id,cou_id){
  return request({
    url: '/course/delCourse/'+class_id +'/' +cou_id,
    method:'get'
  })
}

// 查询某个学生班级所有课程的学习进度
export function  sarStuallCousetimes(class_id,stu_id){
  return request({
    url:'/user/shStuLearnedPro/'+class_id +'/' + stu_id,
    method:'get'
  })
}
