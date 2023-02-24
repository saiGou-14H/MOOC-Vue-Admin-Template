<template>
  <div >
    <el-dialog title="修改章节" :visible.sync="dialogFormVisible" @close="clear" >
      <el-form :model="item" @submit.native.prevent>
        <el-form-item label="章节标题" :label-width="formLabelWidth">
          <el-input v-model="item.title" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="章节名称" :label-width="formLabelWidth">
          <el-input v-model="item.content" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="视频url" :label-width="formLabelWidth">
          <el-input v-model="item.resourceUrl" autocomplete="off"/>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <Video  ref="video" :url="item.resourceUrl" :height="VideoHeigth" ></Video></el-form-item>
        <el-form-item :label-width="formLabelWidth"><el-button @click="VideoLoad">加载视频</el-button><el-button @click="getVideoTime">获取视频时长</el-button></el-form-item>
        <el-form-item label="章节时长(秒)" :label-width="formLabelWidth">
          <el-input-number v-model="time" :min="1" :max="24*2*60*60" label="描述文字"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCourseChapter">确 定</el-button>
      </div>
    </el-dialog>
    <tr class="aa">
      <td class="one" width="100px"><div class="cell" text-align="center">{{item.chaIndex}}</div></td>
      <td class="one" width="180px"><div class="cell" >{{item.title}}</div></td>
      <td class="one"width="400px" ><div class="cell">{{item.content}}</div></td>
      <td class="three"><div class="cell">{{item.resourceUrl}}</div></td>
      <td class="four"><div align="center"><el-button type="success" @click="aaaa">编辑</el-button><el-button type="danger" @click="dlCourseChapter">删除</el-button></div></td>
    </tr>
  </div>

</template>

<script>
import { dlCourseChapter, updateCourseChapter } from '@/api/Course/course'
import Video from '@/components/VideoPlay'
export default {
  name: "Chapteritem",
  components: { Video },
  props: {
    item:'',
    courseid:'',
    run:{type:Function},
  },
  data(){
    return{
      dp:null,
      time:0,
      VideoHeigth:"220px",
      formLabelWidth: '120px',
      dialogFormVisible:false
    }
  },
  created() {
  },
  methods: {
    async clear(){
      await this.$refs.video.SwitchVideo("")
    },
    async getVideoTime(){
      this.dp = await this.$refs.video.getDP()
      this.time =await parseInt(this.dp.video.duration)
    },
    async VideoLoad(){
      await this.$refs.video.SwitchVideo(this.item.resourceUrl)
      this.time =await parseInt(this.dp.video.duration)
    },
    aaaa(){
      this.time = this.item.time
      this.dialogFormVisible = true
    },
    async updateCourseChapter(){
      this.item.time = this.time
      const result = await this.$API.course.updateCourseChapter(this.courseid,this.item)
      console.log(result)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success("修改章节成功")
      this.dialogFormVisible = false
    },
    async dlCourseChapter(){
      const result = await this.$API.course.dlCourseChapter(this.item.id)
      console.log(result)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.$message.success("删除章节成功")
      this.run()
    }
  }
}
</script>

<style scoped>
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
  text-align: left;
}
.cell{
  text-align: left;
  padding-left: 15px;
  padding-top: 15px;
}
</style>
