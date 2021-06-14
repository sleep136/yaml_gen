<template>
  <div>
    <div>
      <template>
        <p style="width: 100%;height: 45px;display: block;line-height: 45px;text-align: center;font-weight: 700;">
          {{ course_name }}
        </p>
      </template>
    </div>
    <Header :course_id="course_id" :course_name="course_name" :active="2" :businessId="business_id"></Header>
    <div style="float: left;">
      <el-button type="warning" @click="addLevel">添加一条</el-button>
    </div>
    <div style="margin-top: 40px">
    <el-tree :data="stepData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </div>
  </div>
</template>

<script>
import Header from './header.vue'
import eventBus from '../js/eventBus'

export default {
  data() {
    return {
      course_id: this.$route.query.courseId,
      course_name: this.$route.query.courseName,
      business_id: this.$route.query.businessId,
      options: [
        {
          value: 'A'
        },
        {
          value: 'B'
        },
        {
          value: 'C'
        },
        {
          value: 'D'
        },
        {
          value: 'E'
        }
      ],
      tableData3: [],
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 25
      ,
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      stepData: [{
        label: "steps",
        children: [
          {
            label: "1",
            children: [
              {
                label: "step_type",
                children: [
                  {
                    label: "adding",
                    children: []
                  }
                ]
              },


              ]
          }]
        // {
        //   step_id: 2,
        //   step_type: "adding",
        //   adding: "",
        //   objects: [{"obj_a": null, "type": "化学品"}, {"obj_B": null, "type": "化学品"}, {
        //     "obj_C": null,
        //     "type": "化学品"
        //   }, {"obj_D": null, "type": "化学品"}]
        // }]
      }]
    }


  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    jump(id) {
      // this.$router.push("/cart")
      // 传递的参数用{{ $route.query.goodsId }}获取
      console.log('请求id：' + id)
      this.$router.push({
        path: '/EditLevel',
        query: {courseId: this.course_id, reviewId: id, courseName: this.course_name, businessId: this.business_id}
      })
      // this.$router.go(-2)
      // 后退两步
    },
    addLevel() {
      // this.$router.push("/cart")
      // 传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({
        path: '/add-step',
        query: {courseId: this.course_id, courseName: this.course_name, businessId: this.business_id}
      })
      // this.$router.go(-2)
      // 后退两步
    },
    getListData(pageIndex) { // 网络请求数据
      var url = 'https://ailab-tutor.codemao.cn/api/get_course_review_list'
      // jsonp请求，需要后台接口支持jsonp
      // this.$http.jsonp(api).then((response)=>{
      // get请求
      this.$http.get(url, {params: {'course_id': this.course_id, 'page_index': pageIndex}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.tableData3 = response.body.data
        this.currentPage = response.body.page_index
        this.totalCount = response.body.total_num
        console.log('请求ok：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")
      })
    },
    add() {
      this.tableData3.push({
        grade: '',
        grade1: '',
        grade2: '',
        template: '',
        logic_hash: '',
        tags: []
      })
    },
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val
      this.getListData(val)
    },
    changeStatus(val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_teacher_name'
      this.$http.get(url, {params: {'course_id': index, 'teacher_name': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    changeGrade(val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_course_review_grade'
      this.$http.get(url, {params: {'course_id': this.course_id, 'id': index, 'grade': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)

      })
    },
    changeGrade1(val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_course_review_grade1'
      this.$http.get(url, {params: {'course_id': this.course_id, 'id': index, 'grade1': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)

      })
    },
    changeGrade2(val, index) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_course_review_grade2'
      this.$http.get(url, {params: {'course_id': this.course_id, 'id': index, 'grade2': val}}).then((response) => {
        console.log('请求到的数据：' + response)
        console.log('tableData3：' + this.tableData3)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    delete_review(index, reviewId) {
      var url = 'https://ailab-tutor.codemao.cn/api/delete_course_review'
      this.$http.get(url, {params: {'course_id': this.course_id, 'id': reviewId}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.tableData3.splice(index, 1)
        console.log('删除的行数：' + index)
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")get_courses
      })
    },
    guardianNameFormatter(row, column, prop) {
      return prop.join(' ')
    },


  },
  created() {
    // this.uploadUrl = this.prefixUrl + '/basis/upload/upload_file'
    // this.getSelectOptionList()
    // this.getKfList()
    this.$store.state.active = '2'
    // 监听userInfo发送过来的保存工单事件
    eventBus.$on('evt-select-course', (courseId) => {
      this.course_id = courseId
    })
  },

  mounted() { // 模板已经编译 -- 执行请求数据的操作
    //this.getListData(1)
  },
  components:
      {
        Header
      }
}
</script>

<style scoped>
.add-button {
  text-align: left;
  left: 20px;
}

.c-300 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
