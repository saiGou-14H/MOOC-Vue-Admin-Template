<template>
  <div>
    <!--    返回按钮-->
    <el-button size="medium" plain icon="el-icon-back" style="float: right" @click="returnPage">返回</el-button>
    <!--    增加章节-->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0" @click="showDialog">增加章节</el-button>
    <!--    新增章节的对话框-->
    <el-dialog title="新的章节" :visible.sync="dialogFormVisible" @close="clear">
      <el-form :model="form" @submit.native.prevent>
        <el-form-item label="章节标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="视频url" :label-width="formLabelWidth">
          <el-input v-model="form.resourceUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <Video  ref="Video" :url="form.resourceUrl" :height="VideoHeigth" ></Video></el-form-item>
        <el-form-item :label-width="formLabelWidth"><el-button @click="VideoLoad">加载视频</el-button><el-button @click="getVideoTime">获取视频时长</el-button></el-form-item>
        <el-form-item label="章节时长(秒)" :label-width="formLabelWidth">
          <el-input-number v-model="form.time" @change="" :min="1" :max="24*2*60*60" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="adCourseChapter">确 定</el-button>
      </div>
    </el-dialog>
    <!--    查询-->
    <searchbox :placeholderName="placeholder"></searchbox>
    <el-button class="ml-5" type="primary">查询</el-button>
    <!--    分割线-->
    <el-divider/>
    <div>
        <tr class="aa">
          <th colspan="1" rowspan="1" class="one" width="100px">
            <div class="cell" >章节序号</div>
          <th colspan="1" rowspan="1" class="one" width="180px">
            <div class="cell">章节标题</div>
          </th>
          <th colspan="1" rowspan="1" class="one" width="400px">
            <div class="cell">章节名称</div>
          </th>
          <th colspan="1" rowspan="1" class="three">
            <div class="cell">url</div>
          </th>
          <th colspan="1" rowspan="1" class="four">
            <div class="cell">操作</div>
          </th>
        </tr>
    </div>

    <transition-group :data="tableData" name="drag" class="list" tag="div">
      <div
        @dragenter="dragenter($event, index)"
        @dragover="dragover($event, index)"
        @dragstart="dragstart(index)"
        draggable
        v-for="(item, index) in tableData"
        :key="item.id"
      >
        <div>
          <Chapteritem :item="item" :courseid="courseid" :run="getChapter"></Chapteritem>
        </div>
      </div>
    </transition-group>
    <el-button @click="upChapterIndex" style="margin: 10px" type="warning">修改章节顺序</el-button>

  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
import Chapteritem from '@/components/MyComponents/Chapteritem'
import { adCourseChapter, upChapterIndex } from '@/api/Course/course'
import Video from '@/components/VideoPlay'

export default {
  name: 'Chapter',
  components: {
    Video,
    Searchbox,
    Chapteritem
  },

  data() {
    return {
      VideoHeigth:"220px",
      courseid:this.$route.query.courseid,
      dialogFormVisible: false,
      placeholder: '请查询',
      formLabelWidth: '120px',
      form: {
        id: '',
        title:'',
        content:'',
        resourceUrl:'',
        classname: '',
        name: '',
        time:0,
        date: '',
        learntime: '',
        courseId: '',
        chaIndex:''
      },
      tableData: [{
      }],
      list: {
        courseId: "",
        ids:[
          {
            id: 0,
            chaIndex: 0
          }
        ]
      },
      dragIndex: '',
      enterIndex: ''

    }
  },
  created() {
    this.getChapter()
  },
  methods: {
    clear(){
      this.form.time =0
      this.form.resourceUrl = ''
      this.form.content = ''
      this.form.title = ''
      this.$refs.Video.SwitchVideo(this.form.resourceUrl)

      this.getChapter()
      this.dialogFormVisible=false
      this.form.resourceUrl=""
    },
    async getVideoTime(){
      const dp = await this.$refs.Video.$refs.player.dp
      this.form.time =await parseInt(dp.video.duration)
    },
    async VideoLoad(){
      await this.$refs.Video.SwitchVideo(this.form.resourceUrl)
      this.form.time =parseInt(dp.video.duration)
    },
    async getChapter(){
      const result = await this.$API.course.shChapter(this.courseid)
      this.tableData = result.data
      console.log(this.tableData)
    },
    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/system/storageManagement' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    showDialog() {
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1)
      console.log(index, row)
    },
    handleEdit() {

    },

    shuffle() {
      this.tableData = this.$shuffle(this.tableData)
    },
    dragstart(index) {
      this.dragIndex = index
    },
    dragenter(e, index) {
      e.preventDefault()
      if (this.dragIndex !== index) {
        const moving = this.tableData[this.dragIndex]
        this.tableData.splice(this.dragIndex, 1)
        this.tableData.splice(index, 0, moving)
        this.dragIndex = index
      }
    },
    dragover(e, index) {
      e.preventDefault()
    },

    async adCourseChapter(){
      const dp = await this.$refs.Video.$refs.player.dp
      console.log(this.$refs.Video.$refs.player.dp)
      this.form.time =parseInt(dp.video.duration)
      this.form.courseId = this.courseid
      this.form.chaIndex = this.tableData.length+1
      console.log(this.form)
      const result = await this.$API.course.adCourseChapter(this.form)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }

      this.$message.success("新增章节成功")

      this.clear()
    },

    async upChapterIndex(){
      this.list.courseId = this.courseid
      for (let i = 0; i < this.tableData.length; i++) {
        this.list.ids[i]=({id:this.tableData[i]["id"],chaIndex:i+1})
      }
      const result = await this.$API.course.upChapterIndex(this.list)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success("修改章节顺序成功")
      this.getChapter()
    }

  }
}
</script>

<style lang="scss" scoped>
.list {
  list-style: none;

  .drag-move {
    transition: transform 0.1s;
  }

  .list-item {
    cursor: move;
    width: 600px;
    background: #EA6E59;
    border-radius: 4px;
    color: #FFF;
    margin-bottom: 6px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}

.one {
  horiz-align: center;
  height: 71px;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  border-collapse: separate;
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  border: 1px solid #EBEEF5;
  transition: background-color .25s ease;
}
.three{
  flex: 1;
  width: 100%;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  border-collapse: separate;
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  border: 1px solid #EBEEF5;
  transition: background-color .25s ease;
}
.four{
  width: 180px;
  height: 71px;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
  font-size: 14px;
  color: #606266;
  border-collapse: separate;
  padding: 12px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  border: 1px solid #EBEEF5;
  transition: background-color .25s ease;
}
.aa{
  display: flex;
  text-align: center;
}
.cell{
  text-align: center;
}
</style>
