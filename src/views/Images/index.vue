<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="tabBox">
        <el-radio-group v-model="collectBlo" size="small" @change="radioChangeFn">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button type="success" size="mini" @click="addImageFn">添加素材</el-button>
      </div>

      <el-row :gutter="20">
        <el-col :span="4.8" v-for="item in imageList" :key="item.id">
          <div class="grid-content bg-purple">
            <div class="editBox">
              <div>
                <i
                  class="el-icon-star-off"
                  :style="item.is_collected?'color:red':'color:white'"
                  @click="collectionFn(item)"
                ></i>
                <i class="el-icon-delete" style="color:white" @click="deleteImages(item.id)"></i>
              </div>
            </div>
            <el-image style="width: 180px; height: 180px" :src="item.url" fit="cover">
              <div slot="error" class="image-slot">
                <el-image
                  style="width: 180px; height: 180px"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F9150e4e5gy1g5e2ibkhzjj20hn0hndib.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659800242&t=c25889324042e21840ceba823768011e"
                  fit="cover"
                />
              </div>
            </el-image>
          </div>
        </el-col>
      </el-row>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[16, 20, 30, 50]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <el-dialog title="上传素材" :visible.sync="dialogVisible" width="30%" @close="closeDialog">
      <el-upload
        class="avatar-uploader"
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headersOBj"
        name="image"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImagesAPI, collectImagesAPI, deleteImagesAPI } from '@/api'
export default {
  name: 'indexIndex',
  data () {
    return {
      collectBlo: false,
      page: 1,
      per_page: 16,
      imageList: [],
      total: 0,
      // 添加素材弹窗
      dialogVisible: false,
      imageUrl: '',
      // 请求头
      headersOBj: {
        Authorization: `Bearer ${this.$store.state.token}`
      }
    }
  },
  created () {
    this.getImagesFn()
  },
  methods: {
    async getImagesFn () {
      try {
        const { data: res } = await getImagesAPI({ page: this.page, per_page: this.per_page })
        this.imageList = res.data.results
        this.total = res.data.total_count
        console.log(res.data)
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    // 分页
    handleSizeChange (val) {
      this.per_page = val
      this.getImagesFn()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getImagesFn()
    },
    // 全部/收藏按钮
    async radioChangeFn () {
      try {
        const { data: res } = await getImagesAPI({ collect: this.collectBlo, page: this.page, per_page: this.per_page })
        this.imageList = res.data.results
        this.total = res.data.total_count
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    // 图片上的icon - 收藏
    async collectionFn (item) {
      try {
        console.log('取消收藏')
        collectImagesAPI({ imageId: item.id, collect: !item.is_collected })
        item.is_collected = !item.is_collected
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    // 图片上的icon - 删除
    async deleteImages (id) {
      try {
        await deleteImagesAPI({ imageId: id })
        this.$message({ showClose: true, type: 'success', message: '删除成功' })
        this.getImagesFn()
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    addImageFn () {
      this.dialogVisible = true
    },
    // 图片上传成功的钩子
    handleAvatarSuccess (res, file) {
      this.getImagesFn()
      this.imageUrl = URL.createObjectURL(file.raw)
      setTimeout(() => {
        this.dialogVisible = false
      }, 2000)
    },
    // 图片上传限制
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或者PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    closeDialog () {
      this.imageUrl = ''
    }
  }
}
</script>

<style lang="scss" scoped >
.tabBox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.el-image {
  border: 1px dashed #c1c1c1;
  margin-bottom: 14px;
  box-sizing: border-box;
}
.editBox {
  background-color: rgba($color: #000000, $alpha: 0.4);
  width: 100%;
  height: 30px;
  position: relative;
  z-index: 99;
  bottom: -180px;
  right: 0;
  left: 0;
  div {
    display: flex;
    justify-content: space-evenly;
    height: 100%;
    align-items: center;
    i {
      font-size: 18px;
      cursor: pointer;
    }
  }
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 200px;
  margin: 0 auto;
}
.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
