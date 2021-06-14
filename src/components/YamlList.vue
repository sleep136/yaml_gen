<template>
  <div>
    <div>
      <template>
        <p style="width: 100%;height: 45px;display: block;line-height: 45px;text-align: center;font-weight: 700;">
          {{ course_name }}
        </p>
      </template>
    </div>
    <Header :course_id="course_id" :course_name="course_name" :businessId="business_id"></Header>
    <div style="float: left;">
      <el-button class="add-button" type="primary" @click="add">增加新的yaml</el-button>
    </div>
    <el-table :data=tableData3 empty-text="暂无数据">
      <el-table-column
          label="id">
        <template slot-scope="scope">
             <span>{{ scope.row.id }}
      </span>
        </template>
      </el-table-column>


      <el-table-column
          label="yaml文件名">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="url">
        <template slot-scope="scope">
          <a :href=scope.row.url target="_blank">{{ scope.row.url }}</a>
        </template>
      </el-table-column>

      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <!--          <el-button class="send_now" type="primary">立刻发送</el-button>-->
          <el-popover
              placement="top-start"
              width="80"
              trigger="hover"
              content="编辑yaml">
            <el-button slot="reference" class="edit-button" icon="el-icon-edit" type="primary"
                       @click="editRow(scope.$index)"/>
          </el-popover>
          <el-popover
              placement="top-start"
              width="80"
              trigger="hover"
              content="删除yaml">
            <el-button slot="reference" class="reset-button" icon="el-icon-document-delete" type="primary"
                       @click="deleteRow(scope.$index,scope.row.id)"/>
          </el-popover>
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
    <el-dialog
        title="提示"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
      <el-form label-width="180px" :model="form_1" :rules="rule_form1" ref="form_1">

        <el-form-item label="分类" prop="grade">
          <el-select v-model="form_1.grade" placeholder="请选择" @change="changeGrade">
            <el-option v-for="item in options_pingyu" :key="item.grade" :value="item.grade">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="一级" prop="grade1">
          <el-select v-model="form_1.grade1" placeholder="请选择" @change="changeGrade1">
            <el-option v-for="item in grade1_options" :key="item.grade1" :value="item.grade1">
            </el-option>
          </el-select>
        </el-form-item>
        <!--        <el-form-item label="grade2" >-->
        <!--          {{form_1.grade2}}-->
        <el-form-item label="二级" prop="grade2">
          <el-select v-model="form_1.grade2" placeholder="请选择" @change="changeGrade2">
            <el-option v-for="item in grade2_options" :key="item.grade2" :value="item.grade2">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语料库" prop="template">
          <el-select v-model="form_1.review_template" placeholder="请选择" @change="changeReview">
            <el-option v-for="item in template_options" :key="item.review_template" :value="item.review_template">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
    </el-dialog>
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
      row_id: 0,
      grade1_options: [],
      grade2_options: [],
      centerDialogVisible: false,
      form_1: {
        word_id: 0,
        review_id: 0,
        grade: '',
        grade1: '',
        grade2: '',
        review_template: ''
        // tags: []
        // delivery: false,
      },
      rule_form1: {
        app_name: [
          {
            required: true,
            message: '小程序名称不能为空',
            trigger: 'blur'
          }
        ],
        app_id: [
          {
            required: true,
            message: '小程序ID不能为空',
            trigger: 'blur'
          }
        ],
        app_secret: [
          {
            required: true,
            message: '小程序密钥不能为空',
            trigger: 'blur'
          }
        ],
        original_id: [
          {
            required: true,
            message: '关联公众号原始ID不能为空',
            trigger: 'blur'
          }
        ]
      },
      options: [
        {
          value: 'A',
          grade1: '优秀作品',
          grade2: '特别厉害',
          template: 'xx宝宝真厉害'
        },
        {
          value: 'B',
          grade1: '进阶作品',
          grade2: '这个屌',
          template: '哎哟，xx宝宝不错哟'
        },
        {
          value: 'C',
          grade1: '普通作品',
          grade2: '这个作品看上去平平无奇',
          template: 'xx宝宝好好学'
        },
        {
          value: 'D',
          grade1: '缺陷作品',
          grade2: '这个作品看上去全是坑',
          template: 'xx宝宝重新做吧'
        },
        {
          value: 'E',
          grade1: '不合格作品',
          grade2: '这个作品空的',
          template: 'xx宝宝重新提交'
        }
      ],
      tableData3: [{
        name: '标题',
        id: 1,
        send_status: '成功'
      }],
      template_options: [],
      tableReview: [],
      options_pingyu: [{
        grade: 'A',
        grade1_option: [{
          grade1: 'asd',
          grade2_option: [{
            grade2: 'asd',
            template: 'asdasdasd'
          }, {
            grade2: 'asd1',
            template: 'asdasdasd1'
          }, {
            grade2: 'asd2',
            template: 'asdasdasd2'
          }]
        }]
      },
        {
          grade: 'B',
          grade1_option: [{
            grade1: 'bsd',
            grade2_option: [{
              grade2: 'bsdss',
              template: 'basdasdasd'
            }, {
              grade2: 'bsdss2',
              template: 'basdasdasd2'
            }]
          }, {
            grade1: 'csd',
            grade2_option: [{
              grade2: 'csdss',
              template: 'cbasdasdasd'
            }, {
              grade2: 'cbsdss2',
              template: 'cbasdasdasd2'
            }]
          }]

        }
      ],
      currentPage: 1,
      // 总条数，根据接口获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 个数选择器（可修改）
      pageSizes: [1, 2, 3, 4],
      // 默认每页显示的条数（可修改）
      PageSize: 25
    }
  },

  methods: {
    jump() {
      // this.$router.push("/cart")
      // 传递的参数用{{ $route.query.goodsId }}获取
      this.$router.push({path: '/CourseInfo'})
      // this.$router.go(-2)
      // 后退两步
    },
    add() {
      this.$router.push({path: '/add-yaml'})
    },
    getCourseReviewOptions() {
      var url = 'https://ailab-tutor.codemao.cn/api/get_review_options'
      this.$http.get(url, {params: {'course_id': this.course_id}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.options_pingyu = response.body.data
      }, (error) => {
        console.log('请求错误：' + error)
      })
    },

    getListCourseWork(pageIndex) { // 网络请求数据
      var url = 'https://ailab-tutor.codemao.cn/api/get_course_work_list'
      this.$http.get(url, {params: {'course_id': this.course_id, 'page_index': pageIndex}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.tableData3 = response.body.data
        this.currentPage = response.body.page_index
        this.totalCount = response.body.total_num
      }, (error) => {
        console.log('请求错误：' + error)
      })
    },
    getListCourseReview() { // 网络请求数据
      var url = 'https://ailab-tutor.codemao.cn/api/get_course_review_list'
      // jsonp请求，需要后台接口支持jsonp
      // this.$http.jsonp(api).then((response)=>{
      // get请求
      this.$http.get(url, {params: {'course_id': this.course_id}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.tableReview = response.body.data
      }, (error) => {
        console.log('请求错误：' + error)
      })
    },
    editRow(row) {
      this.$router.push({path: '/yaml-details', query: {businessId: row.id}})
    },
    deleteRow(row, workId) {
      var url = 'https://ailab-tutor.codemao.cn/api/reset_course_work'
      this.$http.get(url, {params: {'course_id': this.course_id, 'id': workId}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.row_id = row
        this.tableData3[this.row_id].grade = null
        this.tableData3[this.row_id].grade1 = null
        this.tableData3[this.row_id].grade2 = null
        this.tableData3[this.row_id].review_template = null
        this.tableData3[this.row_id].review_id = null
      }, (error) => {
        console.log('请求错误：' + error)
      })
    },
    submitRow(workId) {
      var url = 'https://ailab-tutor.codemao.cn/api/update_course_work'
      this.$http.get(url, {
        params: {
          'course_id': this.course_id,
          'id': workId,
          'template_id': this.form_1.review_id
        }
      }).then((response) => {
        console.log('请求到的数据：' + response)
        // this.tableData3 = response.body.data
      }, (error) => {
        console.log('请求错误：' + error)
      })
    },
    changeGrade(value) {
      console.log(value)
      let fIndex = this.options_pingyu.findIndex(e => { // 下标方法
        return e.grade === value
      })
      console.log(fIndex)
      this.grade1_options = this.options_pingyu[fIndex].children // 数组
    },
    changeGrade1(value) {
      let fIndex = this.grade1_options.findIndex(e => { // 下标方法
        return e.grade1 === value
      })
      this.grade2_options = this.grade1_options[fIndex].children // 数组
    },
    changeGrade2(value) {
      let fIndex = this.grade2_options.findIndex(e => { // 下标方法
        return e.grade2 === value
      })
      this.template_options = this.grade2_options[fIndex].children // 数组
    },
    changeReview(value) {
      let fIndex = this.template_options.findIndex(e => { // 下标方法
        return e.review_template === value
      })
      // this.form_1.template = this.template_options[fIndex].review_template // 数组
      console.log(value)
      this.form_1.review_id = this.template_options[fIndex].review_id
    },
    switchReview(value) {
      let fIndex = this.tableReview.findIndex(e => { // 下标方法
        return e.id === value
      })
      this.form_1.review_template = this.tableReview[fIndex].review_template // 数组
      this.form_1.grade = this.tableReview[fIndex].grade // 数组
      this.form_1.grade1 = this.tableReview[fIndex].grade1 // 数组
      // this.form.review_template = this.tableReview[fIndex].review_template // 数组
    },
    submit() {
      this.submitRow(this.tableData3[this.row_id].id)
      this.tableData3[this.row_id].grade = this.form_1.grade
      this.tableData3[this.row_id].grade1 = this.form_1.grade1
      this.tableData3[this.row_id].grade2 = this.form_1.grade2
      this.tableData3[this.row_id].review_template = this.form_1.review_template
      this.tableData3[this.row_id].review_id = this.form_1.review_id
      // this.tableData3[this.row_id].tags = this.form_1.tags
      this.centerDialogVisible = false
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
      this.getListCourseWork(val)
    }
  },
  created() {
    eventBus.$on('evt-select-course', (courseId) => {
      this.course_id = courseId
    })
    this.$store.state.active = '1'
    console.log(' receive courseId：' + this.course_id)
  },

  mounted() { // 模板已经编译 -- 执行请求数据的操作
    // this.getListCourseWork()
    // this.getListCourseReview()
    // this.getCourseReviewOptions()
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
</style>
