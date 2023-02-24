<template>
  <div class="app-container">
        <div class="grid-content bg-purple">
          <!--    返回按钮-->
          <el-button size="medium" plain icon="el-icon-back" style="float: right" @click="returnPage">返回</el-button>

        </div>
        <div class="grid-content bg-purple">
          <!--    添加课程-->
          <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showCoursesDialog">添加课程</el-button>
          <!--          添加课程弹出框-->
          <el-dialog title="新的课程" :visible.sync="dialogFormVisible">
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
                label="课程号"
                width="300">
              </el-table-column>
              <el-table-column
                property="name"
                label="课程"
                width="300">
              </el-table-column>
              <el-table-column
                label=""
                width="100"
              >
                <template slot-scope="scope">
                  <el-button type="info" icon="el-icon-check" circle @click="addClassCouse(class_id,scope.row.id)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="add">关闭</el-button>
            </div>
          </el-dialog>

    <!--    查询-->
    <searchbox :placeholderName="placeholder"></searchbox>
    <el-button class="ml-5" type="primary" >查询</el-button>

          <el-tag style="float: right;margin-right: 100px">{{clssname}}的课程</el-tag>
  </div>
    <!--    分割线-->
    <el-divider />
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="课程号"
        show-overflow-tooltip
      />
      <el-table-column
        prop="couType"
        label="课程类型"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="课程名称"
        show-overflow-tooltip
      />
      <el-table-column
        prop="classtimes"
        label="课时"
        show-overflow-tooltip
      />
      <el-table-column
        prop="teaId"
        label="老师"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(class_id,scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
import axios from 'axios'
import { delclasscours } from '@/api/Class/class'

export default {
  name: 'Coursedetail',
  components: {
    // 子组件名称
    Searchbox

  },
  data() {
    return {
      dialogFormVisible: false,
      placeholder: '请查询',
      class_id:this.$route.query.class_id,
      clssname:'',
      id: '',
      filterInput:'',
      searchDatas: [],
      cou_id: '',
      // 表格数据
      tableData: [],
      options: [],
      value: [],
      name: '',
      teaId: '',
      couType: '',
      // list: [],
      loading: false,
      states: ['Alabama']

    }
  },

  created() {
    // this.GetoneCourses()
    // console.log(this.classid)
    this.GetClassCourses()
    this.GetAllCourses()
  },

  computed: {

  },

  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` }
    })
  },

  methods: {
   async GetClassCourses(){
      const list = await this.$API.webclass.shClass(this.class_id)
     // console.log(list.data[0].courses)
      this.clssname=list.data[0].name
      this.tableData=list.data[0].courses
    },
    async GetAllCourses() {
      const courses = await this.$API.course.getCourse()
      this.searchDatas = courses.data
      console.log(this.searchDatas)
    },
    showCoursesDialog() {
      this.GetAllCourses()
      this.dialogFormVisible = true
    },
    getRowKey(row){
      return row.id
    },
    handlesearch:function(){
      return this.searchDatas.filter(item => {
        if (item.name.includes(this.filterInput)){
          return item
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },

    async addClassCouse(class_id,cou_id){
      const result =await this.$API.webclass.addClassCous(class_id,cou_id)
      console.log(result.code)
      if (result.code == 200){
        return this.$message.success("添加成功")
        console.log(result.code)

      }else return this.$message.error("添加失败")
     },
    // 关闭刷新列表
    add() {
      this.GetClassCourses()
      this.dialogFormVisible = false
    },
    // 删除班级课程
    handleDelete(class_id,cou_id) {
      this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$API.webclass.delclasscours(class_id,cou_id).then(res =>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.GetClassCourses();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/system/storageManagement' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  height: 100%;
  //background-color: #f1f1f1;
}

.the-container {
  padding: 20px;
  height: 100%;
  background-color: #fff;
}
</style>

