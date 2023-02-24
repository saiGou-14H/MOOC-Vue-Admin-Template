<template>
  <div>
    <div style="height: 20px">
      <el-button size="medium" plain icon="el-icon-back" style="float: right" @click="returnPage">返回</el-button>

    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="实践名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="实践地点" prop="site">
            <el-input v-model="ruleForm.site" />
          </el-form-item>
          <el-form-item label="所属课程" prop="couId">
            <el-input v-model="cousename" :disabled="true"/>

            <!--            <el-select v-model="ruleForm.couId" placeholder="请选择课程" >-->
<!--              <el-option-->
<!--                v-for="item in couslist"-->
<!--                :key="item.value"-->
<!--                :label="item.name"-->
<!--                :value="item.id"-->
<!--              >-->
<!--              </el-option>-->
<!--            </el-select>-->

          </el-form-item>
          <el-form-item label="活动时间" required>
            <el-col :span="11">
              <el-form-item prop="date">
                <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期" style="width: 100%;" value-format="yyyy-MM-dd" />

              </el-form-item>

            </el-col>
          </el-form-item>
          <el-form-item label="实践内容" prop="content">
            <el-input v-model="ruleForm.content" type="textarea" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <div style="margin:60px 500px">
      <el-button type="primary" @click="addPractice(class_id)">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>


  </div>
</template>

<script>
export default {
  name: 'Practicedetail',
  data() {
    return {
      activeName: 'first',
      text: '',
      couslist: [{
        id:'',
        name: '',
      }],
      ruleForm: {
        name: '',
        date: '',
        site: '',
        content: '',
        couId: this.$route.query.course_id,
      },
      cousename:this.$route.query.name,

      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        couId: [
          { required: true, message: '请选择课程', trigger: 'change' }
        ],
        date: [
          {  required: true, message: '请选择日期', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请填写活动内容', trigger: 'blur' }
        ],
        site: [
          { required: true, message: '地点不能为空', trigger: 'blur' }
        ]
      },
      class_id:this.$route.query.class_id,

    }
  },
  created() {
    // this.gtcoures()
    this.getcouseinfo()


    },

  // watch(){
  //
  // },

  methods: {
    // async getcoures(){
    //   const res =await this.$API.course.getCourse().then((res) =>{
    //     console.log(res.code)
    //     console.log(res.data)
    //     console.log(this.couslist)
    //     if (res.code ==200){
    //       let tmp = res.data
    //       for (let i = 0;i<res.data.length;i++){
    //         this.couslist.push({
    //           name: tmp[i].name,id:tmp[i].id
    //         })
    //       }
    //     }
    //   })
    // },

    getcouseinfo(){
      console.log(this.class_id)
      // console.log(this.ruleForm)
    },


    handleClick(tab, event) {
      console.log(tab, event)
    },

    async addPractice(class_id){

    const  r =await this.$API.practice.addPractice(class_id,this.ruleForm)
      this.$message.success("添加成功")
      console.log(this.ruleForm)

    },

    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    returnPage() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/system/storageManagement' })
        return false
      } else {
        this.$router.go(-1)
      }
    }
  },

}
</script>

<style scoped>

</style>
