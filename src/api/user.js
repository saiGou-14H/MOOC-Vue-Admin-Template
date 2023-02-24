import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

//查找学生
export function getUsers(data) {
  return request({
    url: '/user/shUser',
    method: 'post',
    data
  })
}

export function getAllusers(){
  return request({
    url:'/user/searchAllUser',
    method: 'get'

  })
}


export function getInfo() {
  return request({
    url: '/user/shMyself',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
