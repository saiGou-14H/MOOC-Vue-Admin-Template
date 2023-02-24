<template>
  <div class="search-wrapper-box">
    <el-input
      v-model="sceneName"
      class="search-input elc-list-input"
      size="mini"
      :placeholder="placeholderName"
      @keyup.native.enter="searchCon"
    >
      <i slot="prefix" class="el-input__icon el-icon-search search-icon" @click="searchCon" />
    </el-input>
  </div>
</template>
<script>
export default {
  name: 'Searchbox',
  props: {
    placeholderName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      sceneName: ''
    }
  },
  methods: {
    searchCon() {
      this.$emit('sendSearchName', this.sceneName)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-wrapper-box {
  display: inline-block;
  margin-left: 5px;
  width: 290px;
  height: 39.6px;
  // 搜索框样式覆盖
  .search-input {
    ::v-deep .el-input__inner {
      width: 100%;
      height: 39.6px;
      line-height: 45px;
      //border-radius: 23px;
      padding-left: 40px;
      font-size: 14px;
    }
    ::v-deep .el-input__icon {
      margin: 3px 0 0 5px;
      font-size: 18px;
    }
  }
}
</style>
