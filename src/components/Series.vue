<template>
  <el-table :data=tab_data>
    <el-table-column
      label="系列">
      <template slot-scope="scope">
          <span>{{ scope.row.text}}
      </span>
      </template>
    </el-table-column >
    <el-table-column
      label="操作">
      <template slot-scope="scope">
        <!--          <el-button class="send_now" type="primary">立刻发送</el-button>-->
        <el-button class="edit-button" icon="el-icon-caret-right" type="primary"  @click="onClickBussiness(scope.row.value)"/>
        <!--          <el-button class="删除" icon="el-icon-delete" type="primary" />-->
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'Series',
  data () {
    return {
      tab_data: [
        {value: 1, text: '合成'},
        {value: 2, text: '结晶'}
      ]
    }
  },
  methods: {
    onClickBussiness (businessId) {

      this.$router.push({path: '/yaml-list', query: { businessId: businessId }})
      // 后退两步
    }
  }
}
</script>

<style scoped>

</style>
