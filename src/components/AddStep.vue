<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="step_type">
        <el-select v-model="form.step_type" placeholder="请选择">
          <el-option label="adding" value="adding"></el-option>
          <el-option label="process_controlling" value="process_controlling"></el-option>
          <el-option label="detecting" value="detecting"></el-option>
          <el-option label="separating" value="separating"></el-option>
          <el-option label="adding_process_controlling" value="adding_process_controlling"></el-option>

          <el-option label="detectors_process_controlling" value="detectors_process_controlling"></el-option>
          <el-option label="separating_process_controlling" value="separating_process_controlling"></el-option>
          <el-option label="adding_detectors" value="adding_detectors"></el-option>
          <el-option label="separating_detectors" value="separating_detectors"></el-option>
          <el-option label="adding_process_controlling_detecting" value="adding_process_controlling_detecting"></el-option>
          <el-option label="separating_process_controlling_detecting" value="separating_process_controlling_detecting"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item

          label="对象"
         >

        <el-form :model="form.objects" ref="form.objects" label-width="80px" >

          <el-form-item
              v-for="(domain, index) in form.objects.list"
              :label="'对象' + index"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
              :rules="{
      required: true, message: '类型不能为空', trigger: 'blur'
    }"
          >
            <el-input v-model="domain.value"></el-input>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form.objects.list')">提交</el-button>
            <el-button @click="addDomain">新增对象</el-button>
            <el-button @click="resetForm('form.objects')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="adding"  v-show=" adding_array.indexOf(form.step_type) !== -1">
        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.adding"></el-input>
      </el-form-item>
      <el-form-item label="processes"  v-show=" processes_array.indexOf(form.step_type) !== -1">
        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.processes"></el-input>
      </el-form-item>
      <el-form-item label="detectors"  v-show=" detectors_array.indexOf(form.step_type) !== -1">
        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.processes"></el-input>
      </el-form-item>
      <el-form-item label="separating"  v-show=" separating_array.indexOf(form.step_type) !== -1">
        <el-input type="textarea" :autosize="{ minRows: 4}" v-model="form.processes"></el-input>
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
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button type="primary" @click="onCancel">取消</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Add',
  data() {
    return {
      courseId: this.$route.query.courseId,
      courseName: this.$route.query.courseName,
      businessId: this.$route.query.businessId,
      form: {
        course_id: this.$route.query.courseId,
        name: '',
        step_type: '',
        objects: {list:[]},
        grade2: '',
        delivery: false,
        type: [],
        tags: [],
        adding: '',
        processes: ''
      },
      adding_array : ["adding","adding_process_controlling","adding_process_controlling_detecting","adding_detectors" ],
      processes_array:["process_controlling","adding_process_controlling","detectors_process_controlling","separating_process_controlling" ],
      detectors_array:["detecting","detectors_process_controlling", ],
      separating_array:["separating","separating_process_controlling" ]
    }
  },
  methods: {
    submitReviewInfo() {
      var url = 'https://ailab-tutor.codemao.cn/api/add_course_review'
      this.$http.post(url, JSON.stringify(this.form)).then((response) => {
        console.log('请求到的数据：' + response)
        this.form = response.body.data
        this.$router.push({
          path: '/YamlList',
          query: {courseId: this.courseId, courseName: this.courseName, businessId: this.businessId}
        })
      }, (error) => {
        console.log('请求错误：' + error)
        // assert("asdasd")
      })
    },
    onSubmit() {
      console.log('submit!')
      this.submitReviewInfo()
    },
    onCancel() {
      this.$router.go(-1)
    },
    addDomain() {
      this.form.objects.push({
        value: '',
        key: Date.now()
      });
    }

  }
}
</script>
