<template>
  <div>
    <el-input class="ml-5" v-model="seacrh" placeholder="输入查询内容" style="display: inline-block;width: 200px" >
      <i slot="prefix" class="el-input__icon el-icon-search search-icon" />
    </el-input>
    <el-button class="ml-5" @click="clearsearch">重置</el-button>
  <el-divider content-position="center">实践列表</el-divider>
  <el-table
    :data="tables"
    height="450"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="author"
      label="创建人"
      width="180"
    />
    <el-table-column
      prop="date"
      label="实践时间"
      width="180"
    />
    <el-table-column
    prop="couName"
    label="所属课程"
    width="180"
    />

    <el-table-column
      prop="name"
      label="实践名称"
      width="180"
    />

    <el-table-column
      prop="site"
      label="实践地点"
    />
    <el-table-column
      prop="content"
      label="实践内容"
    />
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="info"
          @click="showEditDialogDialog(scope.$index,scope.row)"
        >修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)"
        >删除</el-button>
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

    <!--    修改实践对话框-->
    <el-dialog title="修改活动" :visible.sync="editDialogVisible" @close="editDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="rules">
        <el-form-item label="实践名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动时间" style="margin-left: 43px;" required>
          <el-col :span="11">
            <el-form-item prop="date">
              <el-date-picker v-model="editForm.date" type="date" placeholder="选择日期" style="width: 100%;"  value-format="yyyy-MM-dd"/>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="地点" :label-width="formLabelWidth" prop="site">
          <el-input v-model="editForm.site" autocomplete="off" />
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth" prop="content">
          <el-input v-model="editForm.content" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editpractinfo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import Searchbox from '@/components/Searchbox'
export default {
  name: 'Practices',
  components:{
    Searchbox
  },
  data() {
    return {
      seacrh:'',
      placeholder:'请查询',
      dialogFormVisible:false,
      editDialogVisible:false,
      formLabelWidth: '120px',
      editForm:{

      },
      tableData: [],
      name: '',
      site: '',
      content: '',
      currentPage: 1,
      pageSize: 8,
      total:0,
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
      }
    }
  },
  created() {
    this.Getpractices()
  },
  computed:{
    tables(){
      const seacrh = this.seacrh
      if (seacrh){
        return this.tableData.filter(data =>{
          return Object.keys(data).some(key =>{
            return String(data[key]).toLowerCase().indexOf(seacrh)>-1
          })
        })
      }
      return this.tableData
    }
  },



  methods:{
   async Getpractices(){
      const result =await this.$API.webclass.seacrchPractices()
      this.tableData = result.data
      this.total =  this.tableData.length
      console.log(result.data)
    },

     showEditDialogDialog(index,row) {
    console.log(index,row.id)
      this.editForm=JSON.parse(JSON.stringify(row))
       console.log(this.editForm)
      this.editDialogVisible = true
      },

    async editpractinfo(){
      this.$refs.editFormRef.validate(async valid => {
      const res =await this.$API.practice.upParct({
       id:this.editForm.id,
       name:this.editForm.name,
       date:this.editForm.date,
       site:this.editForm.site,
       content:this.editForm.content
     })
      if (res.code!== 200) {
        return this.$message.error(this.meta.msg)
      }
       console.log(res)
       this.editDialogVisible = false

       this.Getpractices()

      this.$message.success('更新成功')
      })
    },

    // 监听修改实践对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },

    handleDelete(pra_id){
      this.$confirm('此操作将删除该实践, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() =>{
       const s = this.$API.practice.delpracts(pra_id).then(res =>{
         console.log(s)
          this.$message.success("删除成功")
          this.Getpractices()
        })
      }).catch(() =>{
        this.$message.info("已取消删除")
      })

    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    clearsearch(){
      this.seacrh=''
    },


  }
}
</script>

<style scoped>

</style>
