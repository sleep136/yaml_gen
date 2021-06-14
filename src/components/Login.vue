<template>
  <div>
    <div class="login_form">
      <p>yaml生成器</p>
      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">
      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
      <!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
      <div>
      <el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//  import { userLogin } from '../../api/api';

export default {
  data () {
    return {
      userName: '',
      password: '',
      isBtnLoading: false
    }
  },
  created () {
    if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
      this.userName = JSON.parse(localStorage.getItem('user')).userName
      this.password = JSON.parse(localStorage.getItem('user')).password
    }
  },
  computed: {
    btnText () {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {
    login () {
      if (!this.userName) {
        this.$message.error('请输入用户名')
        return
      }
      if (!this.password) {
        this.$message.error('请输入密码')
        return
      }
      if (this.userName !== 'jingtai' && this.password !== 123456) {
        this.$message.error('请输入正确的账号密码')
        return
      }
      this.$router.push({path: '/series'})
      // var url = 'http:/api/login'
      // //this.$http.get(url, {params: {'user_name': this.userName, 'password': this.password}}).then((response) => {
      // console.log('请求到的数据：' + response)
      //   this.$router.push({path: '/series'})
      // }, (error) => {
      //   console.log('请求错误：' + error)
      //   this.$router.push({path: '/series'})
      // })
    }

  }
}
</script>
<style>
  .login_form {
    padding-top: 10%;
    padding-left: 10%;
    padding-right: 10%;
  }
  .qxs-ic_user {
    background-size: 13px 15px;
    background-position: 3%;
  }
  .qxs-ic_password {
    background-size: 13px 15px;
    background-position: 3%;
    margin-bottom: 20px;
  }
  .login_logo {
    height: 100%;
  }

</style>
