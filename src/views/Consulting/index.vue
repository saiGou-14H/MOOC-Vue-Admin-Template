<template>
  <div>
    <div>
    <el-button type="primary" size="medium" style="margin-bottom:10px " @click="showDialog">新建资讯</el-button>
<!--    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">-->
<!--      <el-form-item label="标题">-->
<!--        <el-input v-model="formLabelAlign.name"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="作者" >-->
<!--        <el-input v-model="formLabelAlign.region"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="活动形式">-->
<!--        <el-input v-model="formLabelAlign.type"></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
      <el-input class="ml-5" v-model="seacrh" placeholder="输入查询内容" style="display: inline-block;width: 200px" >
        <i slot="prefix" class="el-input__icon el-icon-search search-icon" />
      </el-input>
      <el-button class="ml-5" @click="clearsearch">重置</el-button>
    </div>

    <el-divider content-position="center">咨讯列表</el-divider>

    <el-table
      :data="tables"
      height="450"
      border
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="author"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>
      <el-table-column
        prop="messageLike"
        label="点赞数">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div style="margin-top: 20px">
          <el-badge :value="scope.row.commentNum" class="item" style="margin-right: 5px">
            <el-button size="small" @click="showmes">评论</el-button>
          </el-badge>
            <el-button
              size="mini"
              type="info"
              @click="editmes(scope.$index,scope.row)"
            >修改</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
          >删除</el-button>
          </div>
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

    <!--    新增咨询对话框-->
    <el-dialog title="新的咨询" :visible.sync="dialogFormVisible" @close="addDialogClosed">
      <el-form ref="addFormRef" :model="form" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
<!--        <el-form-item label="资源" :label-width="formLabelWidth">-->
<!--          <el-input v-model="form.resourceUrl" autocomplete="off" />-->
<!--        </el-form-item>-->
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <tinymce :height="300" v-model="form.content"></tinymce>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMess">确 定</el-button>
      </div>
    </el-dialog>

    <!--    修改实践对话框-->
    <el-dialog title="修改活动" :visible.sync="editDialogVisible" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="rules">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="editForm.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="封面" :label-width="formLabelWidth" prop="resourceUrl">
          <img :src='editForm.resourceUrl' class="avatar">
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <tinymce  :key="tinymceFlag" v-model="editForm.content"></tinymce>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editmesinfo">确 定</el-button>
      </div>
    </el-dialog>

<!--    评论展开区-->
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
      <!--评论列表-->
      <div class="comment-list">
        <ul class="comment-ul">
          <li class="comment-li" v-for="(com,index) in comments">
            <div class="comment-li-top" style="width: 100%;height: 100%">

                <span style="font-size: 15px;margin-right: auto">{{ com.date }}</span>

              <div style="cursor: pointer;float:right;font-size:16px;display: flex; flex:1 " >
                <span style="color: #999aaa;margin-top: 3px;">
                  1
                </span>
              <span>
                <img title="" style="display: block;margin: auto;text-align: center" src="@/assets/good.svg" width="20px" height="20px">
                </span>
              </div>

            </div>
            <div class="comment-nickName">{{ com.content }}</div>
            <el-button style="float: right" type="danger" icon="el-icon-delete" circle @click="deletemsgcomment(index)">

          </el-button>
          </li>
        </ul>
      </div>
    </el-drawer>
    </div>

</template>

<script>
import Searchbox from '@/components/Searchbox'
import Tinymce from '@/components/Tinymce'
export default {
  name: 'Consulting',
components:{
  Searchbox,
  Tinymce

},
  data() {
    return {
      seacrh:'',
      tinymceFlag: 1,
      placeholder:'请查询',
      formLabelWidth: '120px',
      editDialogVisible:false,
      dialogFormVisible:false,
      form:{},
      editForm:{
        title: '',
        content:'',
        resourceUrl:'',
      },
      date: '',
      title: '',
      content:'',
      allcontent:'',
      author: '',
      messageLike: '',
      commentNum : '',
      resourceUrl:'',
      datalist: [],
      currentPage: 1,
      pageSize: 8,
      total:0,
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      },
      drawer: false,
      comments:[{
        id:1,
        content:'赞助组织者组织赞助组织者组织赞助组织者组织赞助组织者组织赞助组织者组织赞助组织者组织',
        date:'2022-11-16'
        },
        {
          content:'赞助组织者组织',
          date:'2022-11-16'
        },
        {
          content:'赞助组织者组织',
          date:'2022-11-11'
        },
      ]
    }
  },
  computed:{
    tables(){
      const seacrh = this.seacrh
      if (seacrh){
        return this.datalist.filter(data =>{
          return Object.keys(data).some(key =>{
            return String(data[key]).toLowerCase().indexOf(seacrh)>-1
          })
        })
      }
      return this.datalist
    },
    editor() {
      return this.$refs.quillEditor.quill;
    },

  },
  created() {
    this.searchmes()
  },
  activated () {
    this.tinymceFlag++
  },

  methods:{
    onEditorReady(editor) {}, // 准备编辑器
    onEditorBlur() {}, // 失去焦点事件

    onEditorFocus(val, editor) {
      // console.log(val); // 富文本获得焦点时的内容
      // editor.enable(false); // 在获取焦点的时候禁用
    }, // 获得焦点事件

    onEditorChange() {}, // 内容改变事件

    saveQuillEditorValue: function(event) {
      alert(this.quillEidtorValue);
    },

    async searchmes(){
      const mes =await this.$API.message.searchMessage()
        this.datalist = mes.data
      console.log(mes)
      this.total =  this.datalist.length
    },

    // 新增咨询弹出对话框
    showDialog() {
      // this.form = {
      // }
      // this.dialogFormVisible = true
      this.$router.push('/consulting/addnews')

    },

    // 添加咨询

    addMess(){
      this.$API.message.addMes(this.form).then(res => {
        if (res) {
          this.$message.success("成功")
          this.dialogFormVisible = false
          this.searchmes()
        } else {
          this.$message.error("失败")
        }
      })

    },
    //清空添加咨询对话框
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },

    // 监听修改咨询对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    // 修改咨询回显
    editmes(index,row){
      console.log(index,row.id,row)
      this.editForm=JSON.parse(JSON.stringify(row))
      // this.allcontent=this.editForm.content
      // console.log(this.editForm.content)
      // console.log( this.allcontent)
      // window.tinymce.get(this.editForm.id.toString()).setContent(this.editForm.content)
      // this.$refs.(this.editForm.id.toString()).setContent('xxxx')
      this.editDialogVisible = true
    },
    // 修改咨询
    async editmesinfo(){
      this.$refs.editFormRef.validate(async valid => {
        const res =await this.$API.message.upMes({
          id:this.editForm.id,
          title: this.editForm.title,
          resourceUrl:this.editForm.resourceUrl,
          content:this.editForm.content
        })
        if (res.code!== 200) {
          return this.$message.error(res)
          console.log(res)
        }
        console.log(res)
        this.editDialogVisible = false

        this.searchmes()

        this.$message.success('更新成功')
      })

    },

    handleDelete(msg_id){
      this.$confirm('此操作将删除该咨询, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
        const s = this.$API.message.delMes(msg_id).then(res =>{
          console.log(s)
          this.$message.success("删除成功")
          this.searchmes()
        })
      }).catch(() =>{
        this.$message.info("已取消删除")
      })

    },

    clearsearch(){
      this.seacrh=''
    },

    // 查询咨询的评论
    showmes(){
      this.drawer =true


    },

    deletemsgcomment(index){
      this.comments.splice(index,1)


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

.time {
  font-size: 13px;
  color: #999;
}

.bottom-small {
  margin-left: 10px;
}

el-button {
  margin: 0 10px;
  padding: 10px;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}


.comment-list {
  width: 100%;
  border-radius: 14px;
  margin-top: 4%;
  height: 72%;
  position: relative;
}

.comment-ul {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 99%;
  position: relative;
  list-style-type: none;
  overflow: auto;
}

.comment-li {
  margin: 2%;
  margin-top: 20px;
  float: left;
  width: 96%;
  position: relative;
  overflow: auto;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>
