<template>
  <div>
    <!--    返回按钮-->
    <el-button size="medium" plain icon="el-icon-back" style="float: right" @click="returnPage">返回</el-button>
    <!--    增加学生-->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showstudentDialog">增加学生</el-button>
    <!--    新增对话框-->
    <el-dialog title="新的学生" :visible.sync="dialogFormVisible">
      <el-input placeholder="搜索" v-model="filterInput"
      />
        <el-table
          ref="singleTable"
          :data="handlesearch(searchDatas)"
          :row-key="getRowKey"
          @selection-change="handleSelectionChange"
          highlight-current-row
          max-height="250"
          style="width: 100%">
          <el-table-column
            property="id"
            label="学号"
            width="300">
          </el-table-column>
          <el-table-column
            property="username"
            label="姓名"
            width="300">
          </el-table-column>
          <el-table-column
            label=""
            width="100"
          >
          <template slot-scope="scope">
            <el-button type="info" icon="el-icon-check" circle @click="addStu(class_id,scope.row.id)"></el-button>
          </template>
          </el-table-column>
        </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">关闭</el-button>
      </div>
    </el-dialog>
    <!--    查询-->
    <el-input class="ml-5" v-model="seacrh" placeholder="输入查询内容" style="display: inline-block;width: 200px" >
      <i slot="prefix" class="el-input__icon el-icon-search search-icon" />
    </el-input>
    <el-button class="ml-5" @click="clearsearch">重置</el-button>
    <span type="text" style="font-size: 40px;margin-left: 200px">{{ clssname }}</span>

    <!--    分割线-->
    <el-divider/>
    <el-table
      :data="tables.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      height="460"
      style="width: 100%; margin-top: 30px;"
    >
      <el-table-column prop="id" label="学号" width="width"/>
      <el-table-column prop="username" label="姓名" width="width"/>
      <el-table-column  prop="learned[0].bfb" label="总课程学习进度" width="width">
      <template slot-scope="scope">
        <el-progress :text-inside="true" :stroke-width="26" :percentage="tableData[scope.$index].learned[0].bfb" :text-color="black"  style="margin-right: 120px;">

        </el-progress>
        <el-button icon="el-icon-search" circle size="mini" style="float: right; margin-top: -27px; margin-left: -10px;    position: relative;
    left: -50px" @click="GetStuallTimes(class_id,scope.row.id)"></el-button>
      </template>
      </el-table-column>

      <el-table-column prop="email" label="邮箱" width="width"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(class_id,scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

<!--      详情学习进度对话框-->
    <el-dialog title=""   :visible.sync="dialogTableVisible" width="300">
      <el-table :data="gridData" width="300">
        <el-table-column property="name" label="课程" width="150"></el-table-column>
        <el-table-column property="bfb" label="学习进度" width="300">
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.bfb" style="margin-right: 120px" class="colorprogress">
            </el-progress>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>


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

  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
import { searchClassStu } from '@/api/Class/class'
import axios from 'axios'
import _ from 'lodash'
export default {
  components: {
    Searchbox
  },
  data() {
    return {
      seacrh:'',
      black:"#1f2d3d",
      dialogFormVisible: false,
      dialogTableVisible:false,
      placeholder: '请查询',
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 8,
      total:0,
      clssname: '',
      id: '',
      username: '',
      studyTime: '',
      email: '',
      form: {},
      tableData: [],
      filterInput:'',
      searchDatas: [],
      class_id: this.$route.query.class_id,
      stu_id:'',
      learned: 0,
      gridData:[],
      blue: 'blue'
    }
  },
  created() {
    this.GetClassNam()
    this.GetClassStus()

    // this.GetAllUser()

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

    async GetClassNam() {
      const claname = await this.$API.webclass.shClass(this.class_id)
      this.clssname = claname.data[0].name
    },
    async GetClassStus() {
      const list = await this.$API.webclass.shStudent(this.class_id)
      this.tableData = list.data
      this.total = this.tableData.length
      console.log(this.tableData)
      console.log(list.data[0].learned)
      for (var i = 0;i<list.data.length;i++){
        if (list.data[i].learned[0].learned== null){
          list.data[i].learned[0].learned =0
        }else list.data[i].learned[0].learned /=1000
      }
      for (var i = 0;i<list.data.length;i++){
        if (list.data[i].learned[0]["coursesTime"]== null ||list.data[i].learned[0]["coursesTime"]== 0){
          this.tableData[i].learned[0]["bfb"]=0
        }else{
          this.tableData[i].learned[0]["bfb"]=parseInt(list.data[i].learned[0].learned/list.data[i].learned[0].coursesTime*10000)/100
        }
      }
      console.log(this.tableData)
    },

    async GetStuallTimes(class_id,stu_id){
      this.dialogTableVisible = true
      const list = await this.$API.webclass.sarStuallCousetimes(class_id,stu_id)
      this.gridData = list.data
      // if (list.data[0].learned== null){
      for (var i = 0;i<list.data.length;i++){
        if (list.data[i].learned== null){
          list.data[i].learned =0
        }else list.data[i].learned /=1000
      }
      for (var i = 0;i<list.data.length;i++){
        if (list.data[i]["courseTime"]== 0){
          this.gridData[i]["bfb"]=0
        }else{
          this.gridData[i]["bfb"]=parseInt(list.data[i].learned/list.data[i].courseTime*10000)/100
        }
      }
      console.log(this.gridData)


    },


    async GetAllUser() {
      const users = await this.$API.user.getAllusers()
      this.searchDatas = users
      console.log(this.searchDatas)


    },

    getRowKey(row){
      return row.id
    },
    handlesearch:function(){
      return this.searchDatas.filter(item => {
        if (item.username.includes(this.filterInput)){
          return item
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },

    async addStu(class_id,stu_id){
     const result =await this.$API.webclass.addStu(class_id,stu_id)
      var resout =result.message
      if (result.code == 200){
        return this.$message.success("添加成功")
        console.log(resout)

      }else return this.$message.error(resout)

    },

    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/system/storageManagement' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    searchClassStu() {
      this.$API.webclass.searchClassStu()
    },

    clearsearch(){
      this.seacrh=''
    },

    // 删除学生
    handleDelete(class_id,stu_id) {
      this.$confirm('此操作将删除该学生, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$API.webclass.delStu(class_id,stu_id).then(res =>{
          this.$message({
            type: 'success',
            message: '删除成功!'
        });
          this.GetClassStus();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },


    showDialog() {
      this.dialogFormVisible = true
    },
    showstudentDialog() {
      this.GetAllUser()
      this.dialogFormVisible = true
    },

    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    add() {
      this.GetClassStus()
      this.dialogFormVisible = false
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
.text1{
  line-height: 60px;
  float: right;
  margin-right: 428px;
  font-size: 60px;
  background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s linear infinite;

}

@keyframes masked-animation {
  0% {
    background-position: 0  0;
  }
  100% {
    background-position: -100%  0;
  }
}

.colorprogress{
  color: #CCCCFF;
  text-color:#CCCCFF
}
</style>
