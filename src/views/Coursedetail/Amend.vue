<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    :before-close="handleClose"
    append-to-body
  >
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
      <el-form-item label="日期" prop="date">
        <el-input v-model="ruleForm.date" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button type="primary" @click="submitForm">确定</el-button>
      <el-button @click="handleClose">取消</el-button>
    </span>
  </el-dialog>

</template>

<script>
export default {
  name: 'Amend',
  data() {
    return {
      // 是否显示对话框，true为显示，false为不显示
      dialogVisible: false,
      // 表单数据
      ruleForm: {
        date: '',
        name: '',
        province: '',
        city: '',
        address: '',
        zip: 1
      },
      // 返回值数据
      formList: {}
    }
  },
  methods: {
    show(row) {
      // 将该行数据赋给表单
      this.ruleForm = row
      console.log(this.ruleForm)
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    submitForm() {
      this.formList = this.ruleForm
      this.dialogVisible = false
      // 子组件调用父组件的方法并传参
      this.$emit('submit', this.formList)
    }
  }
}
</script>

<style scoped>

</style>
