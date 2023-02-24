<template>
  <div>
    <div>
      <searchbox :placeholderName="placeholder"></searchbox>
      <el-button class="ml-5" type="primary">查询</el-button>
      <el-select style="margin: 10px"  v-model="selectclassId" @change="change(1)" placeholder="请选择班级">
        <el-option
          v-for="item in this.class"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
      <el-select style="margin: 10px" v-model="selectcourseId" @change="change(2)" placeholder="请选择班级课程">
        <el-option
          v-for="item in this.course"
          :key="item.id"
          :label="item.name"
          :value="item.id"/>
      </el-select>
    </div>
    <el-divider content-position="center">问题列表</el-divider>
    <div>
      <el-table  :data="datas.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%" border>

        <el-table-column prop="title" label="标题" width="width"/>

<!--        <el-table-column prop="课程名称" label="内容" width="width"/>-->
        <el-table-column prop="auName" label="发布者" width="width"/>
        <el-table-column prop="createTime" label="发布时间" width="width"/>

        <el-table-column
          fixed="right"
          label="操作"
          width="width">
          <template slot-scope="scope">
            <el-tooltip content="查看问题内容" placement="top">
              <el-button type="info" size="small" icon="el-icon-tickets" @click="handletochapter(scope.$index)"/>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--    分页-->
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        :background="false"
        layout="prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
export default {
  name: 'index',
  components: { Searchbox },
  data(){
    return{
      formLabelWidth: '120px',
      dialogFormVisible: false,
      color: '#6a3c3c',
      form: {},
      class:[],
      selectclassId:"",
      course:[{
        name:'a'
      }],
      selectcourseId:'',
      placeholder: '请查询',
      datas: [],
      currentPage: 1,
      pageSize: 8,
      result:[],
    }
  },
  created() {
    this.getClass()
    this.getAnswer(0,0,0)
  },
  methods:{
    handletochapter(index){
      this.GoToDetial(this.result[index])
    },
    GoToDetial(data){
      this.$router.push({path:'/QuestionDetial/index',query:{data:data}})
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(val) {
      this.currentPage = val
    },
    async getClass(){
      const result = await this.$API.webclass.searchAllClass()
      this.class=result.data

    },
    async getAnswer(selectclassId,selectcourseId,state){
      this.datas = []
      const result = await  this.$API.audit.getAnswer(selectclassId,selectcourseId,state)
      this.datas = result.data
      this.result = result.data
      console.log(result.data)

    },
    async getAnswerByclass(){
      this.datas = []
      const result = await  this.$API.audit.getAnswerByclass({"claId":this.selectclassId})
      this.result = result.data[0].questionAnswers
      for (let i = 0; i < result.data[0].questionAnswers.length; i++) {
        result.data[0].questionAnswers[i].createTime = result.data[0].questionAnswers[i].createTime.replace('T' ,' ')
      }
      this.datas = result.data[0].questionAnswers
      console.log(result)
      console.log(this.datas)
    },
    async getCourse(classid){
      const result = await this.$API.webclass.shClass(classid)
      this.course=result.data[0].courses
    },
    change(index){
      switch (index){
        case 1:{
          this.selectcourseId=''
          this.course = []
          this.getCourse(this.selectclassId)
          this.getAnswerByclass()
          break
        }
        case 2:{
          this.getAnswer(this.selectclassId,this.selectcourseId,0)
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
