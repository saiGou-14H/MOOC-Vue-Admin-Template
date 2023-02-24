<template>
  <div class="myVideo" style="margin: auto;width: auto">
    <d-player id="dplayer" ref="player" class="dplayer video-box" :options="optionsPlayer" :url="this.url"></d-player>
  </div>
</template>

<script>
import Hls from "hls.js";
import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
export default {
  name:"Video",
  props:{
    width:String,
    height:String,
    url: String,
    logo: String,
  },
  created() {
  },
  components: {
    "d-player": VueDPlayer,
  },
  mounted() {
    this.Init()
  },
  methods:{
    async SwitchVideo(url){
      const dp = this.$refs.player.dp
      dp.switchVideo(
        {
          type: "customHls",
          url: url, // 播放视频的路径
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          },
          defaultQuality: 0, // 默认是高清
          pic: "https://img0.baidu.com/it/u=2441344631,2691597501&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1669309200&t=15f586fd1dbf961540a3853d2cfc4d0c", // 视频封面图片
          thumbnails: "https://img0.baidu.com/it/u=2441344631,2691597501&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1669309200&t=15f586fd1dbf961540a3853d2cfc4d0c", // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        }
      );
      await dp.play()
      return parseInt(dp.video.duration)
    },
    Init(){
      this.$refs.player.$el.style.height=this.height
      // this.$refs.player.$el.style.width = this.width
    },
    getDP(){
      const dp = this.$refs.player.dp
      return dp
    }
  },

  data() {
    return {
      optionsPlayer: {
        container: this.$refs.player, //播放器容器
        mutex: false, //  防止同时播放多个用户，在该用户开始播放时暂停其他用户
        theme: "#b7daff", // 风格颜色，例如播放条，音量条的颜色
        loop: false, // 是否自动循环
        lang: "zh-cn", // 语言，'en', 'zh-cn', 'zh-tw'
        screenshot: true, // 是否允许截图（按钮），点击可以自动将截图下载到本地
        hotkey: true, // 是否支持热键，调节音量，播放，暂停等
        preload: "auto", // 自动预加载
        volume: 0.7, // 初始化音量
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3], //可选的播放速度，可自定义
        logo: this.logo, // 在视频左上角上打一个logo
        video: {
          type: "customHls",
          url: this.url, // 播放视频的路径
          customType: {
            customHls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          },
          // quality: [
          // 设置多个质量的视频
          // {
          //   name: "高清",
          //   url:
          //     "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          //   type: "auto" // 'auto', 'hls', 'flv', 'dash', 'webtorrent', 'normal' 或 其他自定义类型
          // },
          // {
          //   name: "标清",
          //   url:
          //     "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
          //   type: "auto"
          // }
          // ],
          defaultQuality: 0, // 默认是高清
          pic: "https://img0.baidu.com/it/u=2441344631,2691597501&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1669309200&t=15f586fd1dbf961540a3853d2cfc4d0c", // 视频封面图片
          thumbnails: "https://img0.baidu.com/it/u=2441344631,2691597501&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1669309200&t=15f586fd1dbf961540a3853d2cfc4d0c", // 进度条上的缩略图,需要通过dplayer-thumbnails来生成
        },
        // subtitle: {
        //   //字幕
        //   url: "", //字幕网址
        //   color: "#fff", //字幕颜色
        //   fontSize: "20px",
        //   bottom: "40px"
        // },
        // danmaku: {
        //   // 弹幕
        //   id: "9E2E3368B56CDBB4",
        //   api: "https://api.prprpr.me/dplayer/",
        //   token: "tokendemo", //后端验证令牌
        //   maximum: 1000, //弹幕最大数量
        //   addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"], //其他弹幕
        //   user: "DIYgod", //弹幕用户名
        //   bottom: "15%", //值，例如：10px，10％，即弹幕底部和播放器底部之间的距离，以防止遮挡字幕
        //   unlimited: true //即使弹幕重叠也显示所有弹幕
        // },
        contextmenu: [
          //  自定义上下文菜单
          // 右键菜单
          {
            text: "选项二",
            click: (player) => {
              console.log(player);
            },
          },
        ],
        highlight: [
          //进度条上的自定义时间标记
          // 进度条时间点高亮
          {
            text: "10M",
            time: 6,
          },
          {
            text: "20M",
            time: 12,
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.video-box {
  width: 100%;
  max-width: 400px;
  max-height: 400px;
}
</style>


