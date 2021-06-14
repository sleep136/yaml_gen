<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类">
        <el-select v-model="form.grade" >
          <el-option label="A" value="A"></el-option>
          <el-option label="B" value="B"></el-option>
          <el-option label="C" value="C"></el-option>
          <el-option label="D" value="D"></el-option>
          <el-option label="E" value="E"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级">
        <el-input v-model="form.grade1"></el-input>
      </el-form-item>
      <el-form-item label="二级">
        <el-input v-model="form.grade2"></el-input>
      </el-form-item>
      <el-form-item label="语料库">
        <el-input type="textarea"  :autosize="{ minRows: 4}" v-model="form.review_template"></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="tags" v-show="businessId==2">
        <el-checkbox-group v-model="form.tags">
          <el-checkbox label="支线"></el-checkbox>
          <el-checkbox label="进阶"></el-checkbox>
          <el-checkbox label="逻辑"></el-checkbox>
          <el-checkbox label="想象"></el-checkbox>
          <el-checkbox label="创新"></el-checkbox>
          <el-checkbox label="综合应用"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button type="primary" @click="onCancel" >取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Edit',
  data () {
    return {
      courseId: this.$route.query.courseId,
      reviewId: this.$route.query.reviewId,
      courseName: this.$route.query.courseName,
      businessId: this.$route.query.businessId,
      form: {
        name: '',
        grade: '',
        grade1: '',
        grade2: '',
        template: '',
        tags: []
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
      this.updateReviewInfo()
      this.$router.push({path: '/WorksLevels', query: {courseId: this.courseId, courseName: this.courseName, businessId: this.businessId}})
    },
    getReviewInfo () {
      var url = 'https://ailab-tutor.codemao.cn/api/get_course_review'
      this.$http.get(url, {params: {'course_id': this.courseId, 'id': this.reviewId}}).then((response) => {
        console.log('请求到的数据：' + response)
        this.form = response.body.data
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")
      })
    },
    updateReviewInfo () {
      //       params.append("operations", );           //重点
      // // params.append(‘param2‘, ‘value2‘);
      //       that.$axios.post(url, params)
      var url = 'https://ailab-tutor.codemao.cn/api/edit_course_review'
      this.$http.post(url, JSON.stringify(this.form)).then((response) => {
        console.log('请求到的数据：' + response)
        this.form = response.body.data
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")
      })
    },
    onCancel () {
      this.$router.go(-1)
    }
  },
  mounted () { // 模板已经编译 -- 执行请求数据的操作
    this.getReviewInfo()
  }
}
</script>
