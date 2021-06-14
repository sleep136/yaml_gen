<template>
  <div>
<!--    <Header></Header>-->
<!--    <div style="float: left;">-->
<!--    <el-button class="add-button" type="primary" @click="jump">增加新的任务</el-button>-->
<!--    </div>-->
    <el-table :data=tableData3>
      <el-table-column
        label="课程id">
        <template slot-scope="scope">
          <span>{{ scope.row.course_id}}
      </span>
        </template>
      </el-table-column >
      <el-table-column
        label="课程名">
        <template slot-scope="scope">
          <span>{{ scope.row.course_name}}
      </span>
        </template>
      </el-table-column >
      <el-table-column
        label="课程包系列">
        <template slot-scope="scope">
          <el-select v-model="scope.row.course_type" placeholder="请选择课程包"  @change="((val)=>{changeStatusType(val, scope.row.course_id)})" >
            <el-option v-for="item in courseTypeOptions"
                       :label="item.text"
                       :key="item.text"
                       :value="item.value">
            </el-option>

          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="课程序号">
        <template slot-scope="scope">
          <el-input v-model="scope.row.course_index" @change="((val)=>{changeStatusIndex(val, scope.row.course_id)})"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="批改人">
        <template slot-scope="scope">
        <el-input v-model="scope.row.teacher_name" @change="((val)=>{changeStatusName(val, scope.row.course_id)})"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
<!--          <el-button class="send_now" type="primary">立刻发送</el-button>-->
          <el-button class="edit-button" icon="el-icon-edit" type="primary"  @click="onClickCourse(scope.row.course_id, scope.row.course_name)"/>
<!--          <el-button class="删除" icon="el-icon-delete" type="primary" />-->
        </template>
      </el-table-column>
    </el-table>
    <div class="tabListPage">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-size="PageSize" layout="prev, pager, next"
                     :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
export default {
  data () {
    return {
      businessId: this.$route.query.businessId,
      tableData3: [],
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 25,
      courseTypeOptions: [
        {value: 1, text: '体验课'},
        {value: 2, text: '进阶课'}
      ]
    }
  },

  methods: {
    jump () {
      // this.$router.push("/cart")
      // 传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({path: '/WorksLevels'})
      // this.$router.go(-2)
      // 后退两步
    },
    getListData (pageIndex) { // 网络请求数据
      var url = 'https://ailab-tutor.codemao.cn/api/get_courses'
      // jsonp请求，需要后台接口支持jsonp
      // this.$http.jsonp(api).then((response)=>{
      // get请求
      this.$http.get(url, {params: {'business_type': this.businessId, 'page_index': pageIndex}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.tableData3 = response.body.data
        this.currentPage = response.body.page_index
        this.totalCount = response.body.total_num
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    changeStatusName (val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_teacher_name'
      this.$http.get(url, {params: {'course_id': index, 'teacher_name': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    changeStatusType (val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_course_type'
      this.$http.get(url, {params: {'course_id': index, 'course_type': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    changeStatusIndex (val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_course_index'
      this.$http.get(url, {params: {'course_id': index, 'course_index': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    onClickCourse (courseId, courseName) {
      console.log('courseId：' + courseId)
      // this.$emit('evt-select-course', { courseId: courseId })
      this.$router.push({path: '/Works', query: {courseId: courseId, courseName: courseName, businessId: this.businessId}})
    },
    handleSizeChange (val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange (val) {
      // 改变默认的页数
      this.currentPage = val
      this.getListData(val)
    }
  },
  mounted () { // 模板已经编译 -- 执行请求数据的操作
    this.getListData(1)
  },
  components:
    {
      Header
    }
}
</script>

<style scoped>
  .add-button
  {
    text-align:left;
    left: 20px;
  }
</style>
