<template>
  <div>
    <!--    添加按钮-->
    <el-button type="primary" icon="el-icon-plus" @click="showDialog">新建班级</el-button>
    <el-input class="ml-5" v-model="seacrh" placeholder="输入查询内容" style="display: inline-block;width: 200px" >
      <i slot="prefix" class="el-input__icon el-icon-search search-icon" />
    </el-input>
    <el-button class="ml-5" @click="clearsearch">重置</el-button>
    <el-table
      :data="tables.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      style="width: 100%; margin-top: 10px"
      height="500"
      border="border"

    >
      <el-table-column prop="name" label="班级名称" width="width" />
      <el-table-column prop="numbers" label="人数" width="width" />
      <el-table-column prop="introduction" label="简介" width="width" />
      <el-table-column
        fixed="right"
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <el-tooltip content="查看班级学生名单" placement="top">
            <el-button type="info" size="small" icon="el-icon-s-check" @click="handletoclass(scope.$index,scope.row.courses,scope.row.id)" />
          </el-tooltip>
          <el-tooltip content="查看班级需学课程" placement="top">
            <el-button type="info" size="small" icon="el-icon-reading" @click="handletocourse(scope.row.id)" />
          </el-tooltip>
          <el-button type="info" size="small" @click="showEditDialog(scope.row.id)">编辑</el-button>
          <el-button type="danger" size="small" @click="deleteData(scope.$index,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div></el-col>
    </el-row>
    <!--    新增对话框-->
    <el-dialog title="新的班级" :visible.sync="dialogFormVisible" @close="addDialogClosed">
      <el-form ref="addFormRef" :model="form" :rules="rules">
        <el-form-item label="班级名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级介绍" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="form.introduction" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级人数" :label-width="formLabelWidth">
          <el-input v-model="form.numbers" autocomplete="off"
          :disabled="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClass">确 定</el-button>
      </div>
    </el-dialog>

<!--    修改班级对话框-->
    <el-dialog title="修改班级" :visible.sync="editDialogVisible" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="rules">
        <el-form-item label="班级名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级介绍" :label-width="formLabelWidth" prop="introduction">
          <el-input v-model="editForm.introduction" autocomplete="off" />
        </el-form-item>
        <el-form-item label="班级人数" :label-width="formLabelWidth">
          <el-input v-model="editForm.numbers" autocomplete="off"
                    :disabled="true"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { login, logout } from '@/api/user'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Searchbox from '@/components/Searchbox'
import request from '@/utils/request'
import axios from 'axios'
import item from '@/layout/components/Sidebar/Item'
export default {
  name: 'Class',
  components: {
    Searchbox
  },
  data() {
    return {
      seacrh:'',
      total:0,
      placeholder: '请查询',
      dialogFormVisible: false,
      editDialogVisible: false,
      editForm: {},
      numbers: '',
      courses: '',
      name: '',
      introduction: '',
      form: {},
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 8,
      tableData: [],
      inputlist: [],
      teaname: '',
      rules: {
        name: [
          { required: true, message: '请输入班级名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        introduction: [
          { required: true, message: '请填写班级介绍', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.GetClass()
  },
  mounted() {
    // removeToken()
    // login(this.data).then(res => {
    //   console.log(res)
    // }).catch(error => {
    //   reject(error)
    // })
  },
  computed:{
    tables(){
      const seacrh = this.seacrh
      if (seacrh){
        return this.tableData.filter(data =>{
          return Object.keys(data).some(key =>{
            return String(data[key]).toLowerCase().indexOf(seacrh)>-1
          })
        })
      }
      return this.tableData
    }
  },

  methods: {
   // async GetClassid(classid){
   //
   //   const s = await this.$API.webclass.searchClassCours(classid)
   //   console.log(s)
   //   var cos= []
   //   for(var i =0;i<s.data[0].courses.length;i++){
   //     cos[i]=s.data[0].courses[i].name
   //     // console.log(s.data[0].courses[i])
   //   }
   //   console.log(cos)
   //   return cos
   //    // console.log(s.data[0].courses)
   //  },
   //
   //   Getcourses(classid){
   //    const cousess = this.GetClassid(classid)
   //     // console.log(cousess)
   //    return cousess
   //  },
   //  查询所有班级
   async GetClass(){
      const result =await this.$API.webclass.searchAllClass()
     this.tableData=result.data
     this.total =this.tableData.length
      console.log(result.data[0].courses)
     console.log(result.data)

   },

    // 新增班级弹出对话框
    showDialog() {
      this.form = {
        numbers:0
      }
      this.dialogFormVisible = true
    },
    // 重置对话框
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 修改班级
    async showEditDialog(id){
     // const classlist = await axios.get('class/shClass/'+id)
     //  console.log(classlist.data)
      const classlist =await this.$API.webclass.shClass(id)
      // console.log(this.meta.msg)
      console.log(classlist.code)

      if (classlist.code !== 200){
        return this.$message.error(this.meta.msg)
      }
      this.editForm = classlist.data[0]
      this.editDialogVisible = true
    },
     // 监听修改班级对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改用户信息并提交
    async editUserInfo(){
        this.$refs.editFormRef.validate(async valid => {
         const classlist = await this.$API.webclass.upClass(
         {
           id:this.editForm.id,
           name:this.editForm.name,
           numbers:this.editForm.numbers,
           introduction:this.editForm.introduction
              })
       if (classlist.code!== 200) {
         return this.$message.error(this.meta.msg)
       }
       // 关闭对话框
       this.editDialogVisible = false
       // 刷新数据列表
       this.GetClass()
       // 提示修改成功
       this.$message.success('更新成功')
     })
    },

    handletoclass(index,course,id) {
     console.log(this.tableData[index])
      if (this.tableData[index].courses.length ==0){
        this.$message.error("该班级没有课程，请先添加课程")
      }else this.$router.push({path:'/classdetail/index',query:{class_id:id}})
    },
    handletocourse(id) {
      // axios.get('class/shClass'+id)
      this.$router.push({path:'/coursedetail/index',query:{class_id:id}});

    },
    deleteData(index, row) {
      this.tableData.splice(index, 1)
      console.log('删除了')
      console.log('index：', index)
      console.log('row:', row)
    },

    addClass() {
      request.post("/class/ctClass",this.form).then(res => {
        if (res) {
          this.$message.success("成功")
          this.dialogFormVisible = false
          this.GetClass()
        } else {
          this.$message.error("失败")
        }
      })
    },
    clearsearch(){
     this.seacrh=''
    },


    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
  }
}
</script>

<style scoped>
.normal {
  display: block;
  color: black;
}

.normal :hover {
  background-color: rgb(221, 219, 218);
}

.normal :active {
  color: black;
}

.active {
  background-color: rgb(195, 192, 190);
}

</style>
