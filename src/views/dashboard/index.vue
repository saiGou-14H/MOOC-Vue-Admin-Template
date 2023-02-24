<template>
  <div>
    <div>

      <el-row>
        <el-col :span="5">
          <div style="width: 100%;display: inline;float:left ">
            <el-card class="box-card" >

              <img title="" style="display: block ;text-align: center" src="@/assets/student.svg" width="100px" height="80px">

              <div class="card-desi">
学生：100
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="width: 100%;display: inline;float:left ">
            <el-card class="box-card" >

              <img title="" style="display: block ;text-align: center" src="@/assets/课程.svg" width="100px" height="80px">

              <div class="card-desi">
                课程：10
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="width: 100%;display: inline;float:left ">
            <el-card class="box-card" >

              <img title="" style="display: block ;text-align: center" src="@/assets/实践.svg" width="100px" height="80px">

              <div class="card-desi">
                实践：10
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="5" >
          <div style="width: 100%;display: inline;float:left ">
            <el-card class="box-card" >

              <img title="" style="display: block ;text-align: center" src="@/assets/咨询.svg" width="100px" height="80px">

              <div class="card-desi">
                咨询：10
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>


  <div class=" el-row--flex" style="margin-top: 50px">
    <learnstate></learnstate>
  </div>
    <div class=" el-row--flex" style="margin-top: 50px">

      <div style="background-color: white;width: 100%">
    <hotmsg></hotmsg>
      </div>
<!--      <div style="background-color: #00FFFF;width: 50%;height: 300px">-->

<!--      </div>-->

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VisitSource from '@/components/VisitSource'
import learnstate from '@/components/echarts/learnstate'
import hotmsg from '@/views/dashboard/hotmsg'

export default {
  name: 'Dashboard',
  components:{
    VisitSource,
    learnstate,
    hotmsg
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>




<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  margin-left: 20px;
  border-radius: 4px;

}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-row--flex{

}
.item {
  padding: 18px 30px;
}
::v-deep .el-card__body{
  height: 80px;
  padding: 0;
  width: 100px;

}
.box-card {
width: 100%;
}
.card-desi{
  position: relative;
  height: 40px;
  display: inline-block;
  left: 100px;
  top: -50px;
}
</style>
