<template>
  <div>
<div class="hd">
  <a href="#">热点资讯</a>
</div>
    <div>
      <ul>
        <li>
          <div class="left">
            <img src="https://img.yizhuan5.com/yz/upload/image/20220916/6379894601605651219020735.jpg" alt="" width="200" height="140">
          </div>
          <div class="right">
            <div>
              <p class="more-desc">热点资讯哪里查看？找热点工具是少不了的，无论是需要根据热点创作的编辑，还是喜欢阅读热点的用户来说，一款能快速查看当下热点的工具是非常有必要的，今天就给大家推荐一款无广告、免费、热点榜单全面的工具——即时热榜，好用程度谁用谁知道！&nbsp;...</p>
            </div>
            <div class="more-info">
              <span>即时热榜</span>
              <span>2022-09-16</span>
            </div>
          </div>
        </li>
        <li>
          <div class="left">
            <img src="https://img.yizhuan5.com/yz/upload/image/20220916/6379894601605651219020735.jpg" alt="" width="200" height="140">
          </div>
          <div class="right">
            <div>
              <p class="more-desc">热点资讯哪里查看？找热点工具是少不了的，无论是需要根据热点创作的编辑，还是喜欢阅读热点的用户来说，一款能快速查看当下热点的工具是非常有必要的，今天就给大家推荐一款无广告、免费、热点榜单全面的工具——即时热榜，好用程度谁用谁知道！&nbsp;...</p>
            </div>
            <div class="more-info">
              <span>即时热榜</span>
              <span>2022-09-16</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hotmsg'
}
</script>

<style scoped>
.hd {
  padding-left: 20px;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  border-bottom: 1px solid #e5e5e5;
}
list li .right {
  margin-left: 16px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
}
li {
  display: flex;
  padding: 20px 0;
}
.more-info {
  color: #B8BFD3;
  line-height: 14px;
  display: flex;
  justify-content: space-between;
}
.more-desc {
  max-height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -ms-box-orient: vertical;
  box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  line-height: 20px;
  font-size: 14px;
  color: #666;
  margin-top: 10px;
}
</style>
