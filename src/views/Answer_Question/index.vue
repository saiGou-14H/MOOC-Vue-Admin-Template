<template>
  <div >
    <div>
      <el-dialog title="发布问题" :visible.sync="dialogFormVisible">
        <el-form :model="form" @submit.native.prevent>
          <el-form-item label="问题标题" :label-width="formLabelWidth">
            <el-input v-model="form.title" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="问题类型" :label-width="formLabelWidth">
            <el-select style="margin: 10px"  v-model="form.selectclassId" @change="change1(1)" placeholder="请选择班级">
              <el-option
                v-for="item in this.class"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
            <el-select style="margin: 10px" v-model="form.selectcourseId"  placeholder="请选择班级课程">
              <el-option
                v-for="item in this.course"
                :key="item.id"
                :label="item.name"
                :value="item.id"/>
            </el-select>
          </el-form-item>
          <el-form-item label="问题内容" :label-width="formLabelWidth">
<!--            <el-input v-model="form.content" autocomplete="off"/>-->
            <tinymce id="content"></tinymce>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="AddQuestion">确 定</el-button>
        </div>
      </el-dialog>
      <el-button type="primary" size="medium" style="margin-bottom:10px " @click="showDialog">发布问题</el-button>


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
    <div>
      <div>
        <div class="block">排序 |</div>
        <el-button type="text" class="button">更新</el-button>
        <el-button type="text" class="button">评论</el-button>
        <el-button type="text" class="button" @click="text">点赞</el-button>

      </div>

      <el-divider content-position="center">问题列表</el-divider>
      <div>
        <div class="content" :data="datas" >
          <item_Question :data="item" :claId="selectclassId" v-for="item in datas" >
          </item_Question>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
import item_Question from '@/components/MyComponents/item_Question'
import { AddQuestion, getAnswer, getAnswerByclass } from '@/api/Answer_Question/answer_question'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'index.vue',
  components: {
    Tinymce,
    Searchbox,
    item_Question
  },
  data() {
    return {
      formLabelWidth: '120px',
      dialogFormVisible: false,
      color: '#6a3c3c',
      form: {
        selectcourseId:'',
        selectclassId:"",
      },
      class:[],
      selectclassId:"",
      course:[{
        name:'a'
      }],
      selectcourseId:'',
      placeholder: '请查询',
      datas: []
    }
  },
  created() {
    this.getClass()
    this.getAnswer(0,0)
  },
  methods: {
    // text(){
    //   console.log(window.tinymce.get("2014").getContent())
    // },
    async AddQuestion(){
      console.log(window.tinymce.get("content").getContent())
      const result = await this.$API.answer_question.AddQuestion({title:this.form.title,content:window.tinymce.get("content").getContent(),claId:this.form.selectclassId,couId:this.form.selectcourseId})
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.form = {}
      this.dialogFormVisible = false
      this.$message.success("发布问题成功，正在等待管理员审核")

    },

    async getClass(){
      const result = await this.$API.webclass.searchAllClass()
      this.class=result.data

    },
    async getCourse(classid){
      const result = await this.$API.webclass.shClass(classid)
      this.course=result.data[0].courses

    },
    async getAnswer(selectclassId,selectcourseId){
      this.datas = []
      const result = await  this.$API.answer_question.getAnswer(selectclassId,selectcourseId)
      this.datas = result.data
    },
    async getAnswerByclass(){
      // this.datas = []
      // const result = await  this.$API.answer_question.getAnswerByclass({"claId":this.selectclassId})
      // this.datas = result.data[0].questionAnswers
      // console.log(result)
      // console.log(this.datas)
    },
    showDialog() {
      this.dialogFormVisible = true
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
          this.getAnswer(this.selectclassId,this.selectcourseId)
          break
        }
      }
    },
    change1(index){
      switch (index){
        case 1:{
          this.form.selectcourseId=''
          this.course = []
          this.getCourse(this.form.selectclassId)
          this.getAnswerByclass()
          break
        }
        case 2:{
          this.getAnswer(this.selectclassId,this.selectcourseId)
          break
        }
      }
    }
  }
}
</script>

<style scoped>
.block {
  display: inline-block;
  margin: 10px;
}

.button {
  color: #1f2d3d;
}

.content {
  padding: 10px;
}
</style>
