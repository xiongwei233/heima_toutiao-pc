<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <template>
        <el-table :data="commentsList" border style="margin-bottom:30px">
          <el-table-column prop="title" label="文章标题" min-width="240"></el-table-column>
          <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
          <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
          <el-table-column label="评论状态">
            <template v-slot="scope">
              <el-tag v-if="scope.row.comment_status">正常</el-tag>
              <el-tag v-else type="danger">关闭</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100">
            <template v-slot="scope">
              <el-button
                v-if="scope.row.comment_status"
                size="mini"
                plain
                @click="conmentsFn(true,scope.row)"
              >关闭评论</el-button>
              <el-button v-else type="primary" size="mini" @click="conmentsFn(false,scope.row)">打开评论</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total_count"
        ></el-pagination>
      </template>
    </el-card>
  </div>
</template>

<script>
import { getArticlesListAPI, editCommentsAPI } from '@/api'
export default {
  name: 'commentIndex',
  data () {
    return {
      commentsList: [],
      page: 1,
      per_page: 10,
      total_count: 0
    }
  },
  created () {
    this.commentsListFn()
  },
  methods: {
    async commentsListFn () {
      try {
        const { data: res } = await getArticlesListAPI({ response_type: 'comment', page: this.page, per_page: this.per_page })
        this.commentsList = res.data.results
        this.total_count = res.data.total_count
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    // 分页
    handleSizeChange (val) {
      this.per_page = val
      this.commentsListFn()
    },
    handleCurrentChange (val) {
      this.page = val
      this.commentsListFn()
    },
    // 评论按钮
    async conmentsFn (boolean, row) {
      try {
        await editCommentsAPI({ article_id: row.id.toString(), allow_comment: !boolean })
        row.comment_status = !row.comment_status
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    }

  },
  components: {
  }
}
</script>

<style lang="scss" scoped >
</style>
