<template>
  <div>
    <div style="display: block;">
      <div class="content" style="padding: 10px;margin-bottom: 10px;height: auto">
        <div class="title" v-text="data.title" style="margin: 10px;-webkit-text-size-adjust: auto"></div>
        <div style="display: inline-flex">
          <el-image style="width: 20px;height: 20px;display:inline-block;border-radius: 10px;margin: 10px" fit="cover"
                    :src="url+data.auHead"
          />
          <div v-text="data.auName" style="align-self: center;margin-right: 5px"></div>
          <div v-text="data.createTime.replace('T' ,' ')" style="align-self: center;"></div>
        </div>
        <div style="margin: 10px" v-html="data.content"></div>

      </div>
      <div class="content" id="audit" style="display:none;padding: 10px;margin: auto;background: white">
        <el-button type="primary" size="small" @click="AuditQuestion(1)">审核通过</el-button>
        <el-button type="danger" size="small" @click="AuditQuestion(-1)">审核不通过</el-button>
      </div>
      <div class="content" id="test" style="padding: 10px;margin: auto;">
        <div style="display: flex">
          <div style="height: 100%;width: 70px;display: block;align-items: center;text-align: center">
            <el-image style="width: 50px;height: 50px;display:inline-flex;border-radius: 10px;margin: 10px" fit="cover"
                      src="https://img2.baidu.com/it/u=2015865969,3401990894&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1669136400&t=640cbdbdf1535b2f00c4c1f9c140a568"
            />
            <div v-text="data.auName"></div>
          </div>
          <div style="height: 70px;width: 90%;margin: 10px;padding:10px;display: inline-flex">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              :rows="2"
              placeholder="请输入内容"
              v-model="comment"
            >
            </el-input>
            <el-button style="bottom: 0" type="success" @click="sendQuestionComment">提交评论</el-button>
          </div>
        </div>
        <div style="height: auto">
          <div>
            <div class="commentcontent" v-for="item in questionComments">
              <div class="title" v-text="item.content">
                这是标题
              </div>
              <!--      <div class="type">-->
              <!--        这是类别-->
              <!--      </div>-->
              <div class="info">
                <el-image class="image2" fit="cover"
                          :src="item.userHead"
                ></el-image>
                <div  v-text="item.userName" style="align-self: center;margin-right: 5px"></div>
                <div class="time" v-text="item.date.replace('T' ,' ')" style="align-self: center;"></div>
                <svg  style="margin-left: 100px;align-self: center;" class="icon" width="22px" height="22.00px" viewBox="0 0 1024 1024" version="1.1"
                      xmlns="http://www.w3.org/2000/svg">
                  <path fill="#000000"
                        d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"/>
                </svg>
                <div style="display: inline-flex;align-self: center;margin: 5px" v-text="item.likeNum"></div>
<!--                <svg style="align-self: center;" class="icon" width="22px" height="22.00px" viewBox="0 0 1024 1024" version="1.1"-->
<!--                     xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path fill="#000000"-->
<!--                        d="M335.008 916.629333c-35.914667 22.314667-82.88 10.773333-104.693333-25.557333a77.333333 77.333333 0 0 1-8.96-57.429333l46.485333-198.24a13.141333 13.141333 0 0 0-4.021333-12.864l-152.16-132.586667c-31.605333-27.52-35.253333-75.648-8.234667-107.733333a75.68 75.68 0 0 1 51.733333-26.752L354.848 339.2c4.352-0.362667 8.245333-3.232 10.026667-7.594667l76.938666-188.170666c16.032-39.2 60.618667-57.92 99.52-41.461334a76.309333 76.309333 0 0 1 40.832 41.461334l76.938667 188.16c1.781333 4.373333 5.674667 7.253333 10.026667 7.605333l199.712 16.277333c41.877333 3.413333 72.885333 40.458667 69.568 82.517334a76.938667 76.938667 0 0 1-26.08 51.978666l-152.16 132.586667c-3.541333 3.082667-5.141333 8.074667-4.021334 12.853333l46.485334 198.24c9.621333 41.013333-15.36 82.336-56.138667 92.224a75.285333 75.285333 0 0 1-57.525333-9.237333l-170.976-106.24a11.296 11.296 0 0 0-12.010667 0l-170.986667 106.24zM551.786667 756.032l170.976 106.24c2.624 1.621333 5.717333 2.122667 8.650666 1.408 6.410667-1.557333 10.56-8.426667 8.928-15.424l-46.485333-198.24a77.141333 77.141333 0 0 1 24.277333-75.733333L870.293333 441.706667c2.485333-2.165333 4.053333-5.312 4.330667-8.746667 0.565333-7.136-4.490667-13.173333-10.976-13.696l-199.712-16.288a75.989333 75.989333 0 0 1-64.064-47.168l-76.938667-188.16a12.309333 12.309333 0 0 0-6.538666-6.741333c-5.898667-2.496-12.725333 0.373333-15.328 6.741333l-76.949334 188.16a75.989333 75.989333 0 0 1-64.064 47.168l-199.701333 16.288a11.68 11.68 0 0 0-7.978667 4.181333 13.226667 13.226667 0 0 0 1.333334 18.261334l152.16 132.586666a77.141333 77.141333 0 0 1 24.277333 75.733334l-46.485333 198.229333a13.333333 13.333333 0 0 0 1.514666 9.877333c3.488 5.792 10.581333 7.530667 16.064 4.128l170.986667-106.229333a75.296 75.296 0 0 1 79.562667 0z"/>-->
<!--                </svg>-->
                <div style="display: inline-flex;align-self: center;margin: 5px;color: red" v-text="item.isBest" ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sendQuestionComment } from '@/api/Answer_Question/answer_question'

export default {
  name: 'index',
  data() {
    return {
      isBest:"",
      url:"http://110.41.149.251:9001",
      data: '',
      claId:'',
      comment:'',
      questionComments:[]
    }
  },
  mounted() {
    for (let i = 0; i < this.questionComments.length; i++) {
      if(this.questionComments[i].isBest == 1){
        this.questionComments[i].isBest = "已采纳"
      }else{
        this.questionComments[i].isBest =  ''
      }
    }
    if(this.claId==undefined){
      var t = document.getElementById('test');//选取id为test的元素
      t.style.display = 'none';// 隐藏选择的元素
      var t = document.getElementById('audit');//选取id为test的元素
      t.style.display = 'block';// 隐藏选择的元素
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async AuditQuestion(state){
      const result = await  this.$API.audit.AuditQuestion(this.data.qaId,state)

      if (result.code!== 200) {
        return this.$message.error(result.message)
      }

      this.$message.success("处理成功")
    },
    async getAnswerByclass(){
      const result = await  this.$API.answer_question.getAnswerByclass({"claId":this.claId})
      const datas = result.data[0].questionAnswers
      for (let i = 0; i < datas.length; i++) {
        if(datas[i].qaId==this.data.qaId){
          this.data = datas[i];
          this.questionComments = datas[i].questionComments
        }
      }
    },
    async sendQuestionComment(){
      const result = await this.$API.answer_question.sendQuestionComment({questionId:this.data.qaId,content:this.comment});
      console.log(result)
      if (result.code!== 200) {
        return this.$message.error(result.message)
      }
      this.comment = ''
      this.getAnswerByclass()
      this.$message.success("发布评论成功，正在等待管理员审核")
    },
    getData() {
      this.data = this.$route.query.data
      this.claId = this.$route.query.claId
      this.questionComments = this.data.questionComments
    }
  }

}
</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.title {
  font-size: 20px;
}

.content {
  margin: 10px;
  width: 90%;
  height: auto;
  margin: 0 auto;
  background: #e3e3e3;
  border-radius: 10px;
}


.commentcontent {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: #ffffff;
  display: inline-block;
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
}

.title {
  margin: 10px;
  text-align: left;
  font-size: 20px;
}

.con {

  margin: 10px;
  text-align: left;
  font-size: 17px;
}

.type {
  margin: 10px;
  text-align: left;
  font-size: 17px;
}

.info {
  width: 100%;
  margin: 10px;
  display: inline-flex;
  text-align: center;
}
.image2 {
  width: 20px;
  margin: 5px;
  text-align: center;
  /*display: inline-block;*/
  border-radius: 10px;
}
.time{
  align-self: center;
}
</style>
