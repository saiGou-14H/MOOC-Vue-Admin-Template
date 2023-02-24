<template>
  <div>
    <!--    添加按钮-->
    <el-button  type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showadDialog">新建课程</el-button>
    <searchbox :placeholderName="placeholder"></searchbox>
    <el-button class="ml-5" type="primary">查询</el-button>

    <el-table  :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%" border>

      <el-table-column prop="id" label="课程号" width="width"/>

        <el-table-column prop="name" label="课程名称" width="width">
        </el-table-column>
        <el-table-column prop="couType" label="课程类型" width="width"/>
        <el-table-column prop="integral" label="课程积分" width="width"/>

        <el-table-column
          fixed="right"
          label="操作"
          width="width">
          <template slot-scope="scope">
            <el-tooltip content="查看课程章节详情" placement="top">
              <el-button type="info" size="small" icon="el-icon-tickets" @click="handletochapter(scope.$index,tableData)"/>
            </el-tooltip>
            <el-button type="success" size="small" @click="showudDialog(scope.$index,tableData)">编辑</el-button>
            <el-button type="danger" size="small" @click="deleteData(scope.$index,tableData)">删除</el-button>
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
    <!--    新增对话框-->
    <el-dialog title="增加课程" :visible.sync="ad_dialogFormVisible" style="width: 100%">
      <el-form :model="form">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-select v-model="TYPE.type" @change="courseTypeListing(1)" placeholder="请选择课程类型">
            <el-option
              v-for="item in TYPE.courseType"
              :key="item.id"
              :label="item.label"
              :value="item.type"/>
          </el-select>
          <el-select v-model="TYPE.type2" @change="courseTypeListing(2)" placeholder="请选择课程类型">
            <el-option
              v-for="item in TYPE.courseType2"
              :key="item.id"
              :label="item.label"
              :value="item.type"/>
          </el-select>
          <el-select v-model="form.couType" @change="courseTypeListing(3)" placeholder="请选择课程类型">
            <el-option
              v-for="item in TYPE.courseType3"
              :key="item.id"
              :label="item.label"
              :value="item.type"/>
          </el-select>
        </el-form-item>
        <el-form-item label="课程积分" :label-width="formLabelWidth">
          <el-input v-model="form.integral" autocomplete="off" style="width: 100px"/>
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
          <el-upload
            action=""
            :auto-upload="false"
            :limit=1
            list-type="picture-card"
            :on-change="getImageBase64"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="课程介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduction" autocomplete="off" style="width: 300px"/>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ad_dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCourse">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改课程" :visible.sync="ud_dialogFormVisible" style="width: 100%">
      <el-form :model="form">
        <el-form-item label="课程名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 300px"/>
        </el-form-item>
        <el-form-item label="课程类型" :label-width="formLabelWidth">
          <el-select v-model="TYPE.type" @change="courseTypeListing(1)" placeholder="请选择课程类型">
            <el-option
              v-for="item in TYPE.courseType"
              :key="item.id"
              :label="item.label"
              :value="item.type"/>
          </el-select>
          <el-select v-model="TYPE.type2" @change="courseTypeListing(2)" placeholder="请选择课程类型">
            <el-option
              v-for="item in TYPE.courseType2"
              :key="item.id"
              :label="item.label"
              :value="item.type"/>
          </el-select>
          <el-select v-model="form.couType" @change="courseTypeListing(3)" placeholder="请选择课程类型">
            <el-option
              v-for="item in TYPE.courseType3"
              :key="item.id"
              :label="item.label"
              :value="item.type"/>
          </el-select>
        </el-form-item>
        <el-form-item label="课程积分" :label-width="formLabelWidth">
          <el-input v-model="form.integral" autocomplete="off" style="width: 100px"/>
        </el-form-item>
        <el-form-item label="课程封面" :label-width="formLabelWidth">
          <el-upload
            action=""
            :auto-upload="false"
            :limit=1
            :file-list="fileList"
            list-type="picture-card"
            :on-change="getImageBase64"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" class="el-upload-list__item-thumbnail">
          </el-dialog>
        </el-form-item>
        <el-form-item label="课程介绍" :label-width="formLabelWidth">
          <el-input v-model="form.introduction" autocomplete="off" style="width: 300px"/>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ud_dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCourse">确 定</el-button>
      </div>
    </el-dialog>
    <!--    查看基本信息对话框 按钮点击弹出关闭-->

  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
import { getImage } from '@/api/Course/course'
import Video from '@/components/VideoPlay'
import Tinymce from '@/components/Tinymce'

export default {
  name: 'Course',
  components: {
    Tinymce,
    Video,
    Searchbox
  },
  data() {
    return {
      VideoHeigth:"500px",
      url : "https://ukzy.ukubf4.com/20221102/2Ik77tKg/index.m3u8",
      fileList:[],
      upload:false,
      id: '',
      imageUrl: '',
      dialogImageUrl: '',
      dialogVisible: false,
      ad_dialogFormVisible: false,
      ud_dialogFormVisible: false,
      placeholder: '请查询',
      form: {
        id:'',
        name: '',
        region: '',
        integral:'',
        date2: '',
        delivery: false,
        couType: '',
        resource: '',
        introduction: '',
        picture: ""
      },
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 8,
      tableData: [],
      TYPE:{
        type:"",
        type2:"",
        courseType:[],
        courseType2:[],
        courseType3:[],
      }
    }
  },
  created() {
    this.getCourse()
    this.getCourseTypea()
  },
  methods: {
    async getCourse() {
      const result = await this.$API.course.getCourse()
      this.tableData = result.data
      console.log(result)
    },
    getImageBase64(event, file){
      var reader = new FileReader()
      reader.readAsDataURL(file[0].raw)
      reader.onload = () => {
        console.log('file 转 base64结果：' + reader.result)
        this.dialogImageUrl = reader.result
      }
    },
    handleRemove(file, fileList) {
      this.dialogImageUrl = ''
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(val) {
      this.currentPage = val
    },
    showadDialog() {
      this.ad_dialogFormVisible = true
    },
    async showudDialog(index,Datas) {

      const  data = Datas[(this.currentPage-1)*this.pageSize+index]

      if(data.picture.indexOf("http")==0){
        this.dialogImageUrl=data.picture
      }else{
        this.dialogImageUrl="http://110.41.149.251:9001"+data.picture
      }
      console.log(this.dialogImageUrl)
      this.fileList = []
      this.fileList.push({
        'url': this.dialogImageUrl
      })

      this.form.id = data.id
      this.form.name = data.name
      this.form.integral = data.integral
      this.form.introduction = data.introduction
      console.log((this.currentPage-1)*this.pageSize+index)
      for (let i = 0; i < this.TYPE.courseType.length; i++) {
        for (let j = 0; j < this.TYPE.courseType[i]["parent"].length; j++) {
          for (let k = 0; k < this.TYPE.courseType[i]["parent"][j]["parent"].length; k++) {
            if(this.TYPE.courseType[i]["parent"][j]["parent"][k].type==(data.couType)){
              this.TYPE.type = this.TYPE.courseType[i].type
              this.courseTypeListing(1)
              this.TYPE.type2 = this.TYPE.courseType[i]["parent"][j].type
              this.courseTypeListing(2)
              this.form.couType = data.couType
            }
          }
        }
      }
      this.ud_dialogFormVisible = true
    },
    handletochapter(index ,Datas) {
      const  data = Datas[(this.currentPage-1)*this.pageSize+index]
      this.$router.push({path:'/chapter/index/',query:{courseid:data.id}})
    },
    async getClassById(id) {
      const result = await this.$API.course.getCourse(id)
    },
    async getCourseTypea() {
      const result = await this.$API.course.shCourseType()
      const Type = result.data
      for (let i = 0; i < Type.length; i++) {
        if (Type[i].parentId==null){
          this.TYPE.courseType.push(Type[i])
          this.TYPE.courseType[i]["parent"] = []
        }
      }
      for (let i = 0; i < Type.length; i++) {
        for (let j = 0; j < this.TYPE.courseType.length; j++) {
          if (Type[i].parentId==this.TYPE.courseType[j].id){
            this.TYPE.courseType[j].parent.push(Type[i])
            this.TYPE.courseType[j].parent[this.TYPE.courseType[j].parent.length-1]["parent"] = []
          }
        }
      }
      for (let i = 0; i < Type.length; i++) {
        for (let j = 0; j < this.TYPE.courseType.length; j++) {
          for (let k = 0; k < this.TYPE.courseType[j]["parent"].length; k++) {
            if (Type[i].parentId==this.TYPE.courseType[j]["parent"][k].id){
              this.TYPE.courseType[j]["parent"][k]["parent"].push(Type[i])
            }
          }

        }
      }
      console.log(this.TYPE.courseType)

    },
    courseTypeListing(index) {
      switch (index){
        case 1:{
            for (let i = 0; i < this.TYPE.courseType.length; i++) {
              if(this.TYPE.type == this.TYPE.courseType[i].type){
                this.TYPE.courseType2 = this.TYPE.courseType[i].parent
              }
            }
          this.TYPE.type2 = ""
          this.form.couType = ""
            break;
          }
        case 2:{
          for (let i = 0; i < this.TYPE.courseType2.length; i++) {
            if(this.TYPE.type2 == this.TYPE.courseType2[i].type){
              this.TYPE.courseType3 = this.TYPE.courseType2[i].parent
            }
          }
          this.form.couType = ""
          break;
        }
      }
    },
    async addCourse(){
      this.form["picture"]=this.dialogImageUrl.replace("data:image/jpeg;base64,","").replace("data:image/webp;base64,","").replace("data:image/png;base64,","")
      console.log(this.form)
      const result = await this.$API.course.adCourse(this.form)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.getCourse()
      this.$message.success("添加课程成功")
      this.ad_dialogFormVisible = false
    },
    async updateCourse(){
      if(this.dialogImageUrl.indexOf("http")==0){
        this.form.picture = null
      }else{
        this.form.picture = this.dialogImageUrl.replace("data:image/jpeg;base64,","").replace("data:image/webp;base64,","").replace("data:image/png;base64,","")
      }
      console.log(this.form.picture)
      const result = await this.$API.course.updateCourse(this.form)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success("修改课程成功")
      this.getCourse()
      this.ud_dialogFormVisible = false
    },
    async deleteData(index,Data){
      const result = await this.$API.course.dlCourse(Data[(this.currentPage-1)*this.pageSize+index].id.toString())
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success("删除课程成功")
      this.getCourse()
    }

  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
