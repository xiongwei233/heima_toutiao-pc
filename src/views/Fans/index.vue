<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="列表" name="list">
          <el-row :gutter="20">
            <el-col :span="3" v-for="item in fansList" :key="item.id">
              <div class="grid-content">
                <el-avatar :size="80" :src="item.photo" @error="errorHandler">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
                <p>{{item.name}}</p>
                <el-button type="primary" icon="el-icon-plus" size="mini">关注</el-button>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="画像" name="portrait">画像</el-tab-pane>
      </el-tabs>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[20,  30, 40, 50]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getFansAPI } from '@/api'

export default {
  name: 'fanIndex',
  data () {
    return {
      activeName: 'list',
      list: 20,
      fansList: [],
      page: 1,
      per_page: 20,
      total_count: 0
    }
  },
  created () {
    this.fansListFn()
  },
  methods: {
    async fansListFn () {
      try {
        const { data: res } = await getFansAPI({ page: this.page, per_page: this.per_page })
        console.log(res.data)
        this.fansList = res.data.results
        this.total_count = res.data.total_count
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    errorHandler () {
      return true
    },
    // 分页
    handleSizeChange (val) {
      this.per_page = val
      this.fansListFn()
    },
    handleCurrentChange (val) {
      this.page = val
      this.fansListFn()
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped >
.grid-content {
  width: 122px;
  height: 180px;
  border: 1px dashed #c1c1c1;
  margin: 0 0 30px 0;
  text-align: center;
  .el-avatar {
    margin: 10px 0;
  }
  p {
    margin-bottom: 10px;
  }
}
</style>
