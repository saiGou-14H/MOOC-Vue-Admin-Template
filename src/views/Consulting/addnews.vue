<template>
  <div>

    <el-button size="medium" plain icon="el-icon-back" style="float: right" @click="returnPage">返回</el-button>
    <el-divider style="margin-top: 20px">新的咨询</el-divider>
    <div>
      <el-form ref="addFormRef" :model="form" :rules="rules" style="margin-right: 150px">
        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
          <el-input v-model="form.title" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="咨询封面" :label-width="formLabelWidth" prop="resourceUrl">
          <el-upload
            name="file"
            class="avatar-uploader"
            ref="upload"
            :show-file-list="false"
            :headers="headers"
            action="/user/udPicture"
            :before-upload="beforeUpload"
            :on-change="handleChange"
            :on-success="handleSuccess"
            multiple
          >
            <!--             :auto-upload="false"-->
            <img v-if="form.resourceUrl" :src="form.resourceUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <tinymce :height="300" v-model="form.content"></tinymce>
        </el-form-item>
        <el-button type="primary" @click="addMess('addFormRef')" style="margin: 0 500px"
                   size="medium"
        >确 定
        </el-button>

        <el-button @click="resetForm('addFormRef')" type="info"
                   size="medium"
                   style="margin-left: -363px;"
        >取消
        </el-button>

      </el-form>


    </div>

  </div>


</template>


<script>
import tinymce from '@/components/Tinymce'
import EditorImage from '@/components/Tinymce/components/EditorImage'
import { getToken } from '@/utils/auth'

export default {
  name: 'addnews',
  components: {
    tinymce,
    EditorImage
  },

  data() {

    return {
      headers: { 'Authorization': getToken() },
      /* 控制上传对话框显示与否,默认false不显示 */
      dialogVisible: false,
      /* 对话框内放置的上传图片的地址 */
      dialogImageUrl: '',
      fileList: [],
      form: {
        title: '',
        resourceUrl: '',
        content: ''
      },
      formLabelWidth: '120px',
      title: '',
      resourceUrl: '',
      content: '',
      rules: {
        title: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请填写内容', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/system/storageManagement' })
        return false
      } else {
        this.$router.go(-1)
      }
    },
    addMess(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.form)
        if (valid) {
          // this.form.resourceUrl=''
          this.$API.message.addMes(this.form).then(res => {
            if (res.code ==200) {
              this.$message.success(res)
              console.log(this.form)
            } else {
              this.$message.error(res)
            }
          })
        } else {
          console.log('提交失败')
          return false
        }
      })
    },

    handleChange(file, fileList) {
      this.form.resourceUrl = URL.createObjectURL(file.raw)
      console.log(file)
    },
    handleSuccess(res, file) {
      console.log(res)
    },

    beforeUpload(file) {
      return true
    },

    /* 重置表单 */
    /* formName形参 就是表单的ref值 */
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }

}
</script>

<style scoped>
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
