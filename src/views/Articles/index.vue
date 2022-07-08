<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="articlesRef" :model="articlesForm" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="articlesForm.status">
            <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 -->
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="articlesForm.channel_id" placeholder="请选择频道">
            <el-option
              v-for="item in channelsList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="日期">
          <el-date-picker
            v-model="articlesForm.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryFn" :loading="isLoading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card style="margin-top: 30px;">
      <div slot="header">根据筛选条件共查询到 {{total_count}} 条结果：</div>
      <el-table :data="articlesList" border style="width: 100%">
        <el-table-column label="封面" width="180">
          <template v-slot="scope">
            <el-image
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="cover"
            >
              <div slot="error" class="image-slot">
                <el-image
                  style="width: 150px; height: 100px"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F9150e4e5gy1g5e2ibkhzjj20hn0hndib.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659800242&t=c25889324042e21840ceba823768011e"
                  fit="cover"
                />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="scope">
            <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 -->
            <el-tag v-if="scope.row.status===0" type="info">草稿</el-tag>
            <el-tag v-else-if="scope.row.status===1" type="warning">待审核</el-tag>
            <el-tag v-else-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-else type="danger">审核失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="editArticleFn(scope.row)"></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteArticleFn(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getChannelsAPI, getArticlesListAPI, deleteArticleAPI } from '@/api'
export default {
  name: 'articlesContent',
  data () {
    return {
      channelsList: [],
      articlesList: [],
      articlesForm: {
        status: null,
        channel_id: null,
        date: ''
      },
      page: 1,
      per_page: 10,
      total_count: 0,
      isLoading: false
    }
  },
  created () {
    this.articlesFn()

    this.channelsFn()
  },
  methods: {
    async channelsFn () {
      try {
        // 获取所有频道列表
        const { data: res } = await getChannelsAPI({
          page: this.page,
          per_page: this.per_page
        })
        this.channelsList = res.data.channels
        // console.log(this.channelsList)
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    async articlesFn () {
      // 获取所有文章
      try {
        const { data: res } = await getArticlesListAPI({
          status: this.articlesForm.status,
          channel_id: this.articlesForm.channel_id,
          begin_pubdate: this.articlesForm.date[ 0 ],
          end_pubdate: this.articlesForm.date[ 1 ],
          page: this.page,
          per_page: this.per_page
        })
        this.articlesList = res.data.results
        this.total_count = res.data.total_count
        console.log(this.articlesList)
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    queryFn () {
      this.isLoading = true
      this.articlesFn()
      this.isLoading = false
    },

    // 分页
    handleSizeChange (val) {
      this.per_page = val
      this.articlesFn()
    },
    handleCurrentChange (val) {
      this.page = val
      this.articlesFn()
    },
    // 修改
    editArticleFn (row) {
      this.$router.push(`/publish?id=${row.id}`)
    },
    async deleteArticleFn (row) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        try {
          deleteArticleAPI({ articleId: row.id })
          this.articlesFn()
          console.log(row)
          this.$message({ showClose: true, type: 'success', message: '删除成功!' })
        } catch (err) {
          this.$message({ showClose: true, type: 'error', message: err.response.data.message })
        }
      }).catch(err => err)
    }
  },
  components: {
  }
}

</script>

<style lang="scss" scoped >
</style>
