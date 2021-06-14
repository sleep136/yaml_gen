<template>
  <el-menu
    :default-active="navselected"
    :active="navselected"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#409EFF"
    text-color="#fff"
    active-text-color="#FFA500">
    <el-menu-item index="1">文件库</el-menu-item>
    <el-menu-item index="2">引用素材库</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: ['course_id', 'course_name', 'active', 'businessId'],

  data () {
    return {
      activeIndex1: '1',
      activeIndex2: '2',
      navselected: '1'
    }
  },
  methods: {
    handleSelect (key) {
      switch (parseInt(key)) {
        case 1:
          this.selectItems(key)
          this.$router.push({path: '/yaml-list', query: {courseId: this.course_id, courseName: this.course_name, businessId: this.businessId}})
          break
        case 2:
          this.selectItems(key)
          this.$router.push({path: '/workslevels', query: {courseId: this.course_id, courseName: this.course_name, businessId: this.businessId}})
          break
        default:
          console.log(key)
      }
      this.$store.state.active = key
    },
    getNavType () {
      this.navselected = this.$store.state.active
      // store.state.adminleftnavnum里值变化的时候，设置navselected
    },
    selectItems (index) {
      this.$store.state.active = index
      // 按钮选中之后设置当前的index为store里的值。
    }
  },
  mounted () { // 模板已经编译 -- 执行请求数据的操作
    this.getNavType()
  }
  // watch: {
  //   // 监测store.state
  //   '$store.state.active': 'getNavType'
  // }
}
</script>
