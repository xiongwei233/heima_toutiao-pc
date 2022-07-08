<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        :model="publishForm"
        :rules="publishRules"
        ref="publishRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="标题：" prop="title" style="width:500px">
          <el-input v-model="publishForm.title"></el-input>
        </el-form-item>

        <el-form-item label="内容：" prop="content">
          <quill-editor ref="myQuillEditor" v-model="publishForm.content" />
        </el-form-item>

        <el-form-item label="封面：">
          <el-radio-group v-model="publishForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 图片 -->
          <div v-if="publishForm.cover.type > 0" class="images">
            <upload-cover
              :url="upload_cover_url"
              @click.native="addCoverFn"
              v-for="(item,index) in publishForm.cover.type"
              :key="index"
            ></upload-cover>
          </div>
        </el-form-item>
        <el-form-item label="频道:" prop="channel_id">
          <el-select v-model="publishForm.channel_id" placeholder="请选择频道">
            <el-option
              v-for="item in channelsList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="releaseArticleFn(false)">发表</el-button>
          <el-button @click="releaseArticleFn(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-dialog :visible.sync="coverDialogVisible" width="700px" :before-close="handleClose">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="imagesBox">
          <el-radio-group v-model="collectBlo" size="small" @change="radioChangeFn">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>

          <el-row :gutter="20" style="margin:20px 0">
            <el-col :span="6" v-for="(item,index) in imageList" :key="item.id">
              <div class="grid-content bg-purple">
                <!-- 图片-勾勾 -->
                <div class="backg" v-if="selected===index"></div>
                <!-- selected默认是null -->
                <el-image
                  style="width: 140px; height: 120px"
                  :src="item.url"
                  fit="cover"
                  @click="selected=index"
                >
                  <div slot="error" class="image-slot">
                    <el-image
                      style="width: 140px; height: 120px"
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
        </el-tab-pane>

        <el-tab-pane label="上传图片" name="updataImage">
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
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="coverDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="imageAddURL">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { getChannelsAPI, addArticlesAPI, getImagesAPI, getArticleIdAPI } from '@/api'

import uploadCover from '@/views/Publish/components/upload-cover'
export default {
  name: 'publishIndex',
  data () {
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ]

      },
      channelsList: [],
      coverDialogVisible: false,

      // 弹窗
      activeName: 'imagesBox',
      // 请求头
      headersOBj: {
        Authorization: `Bearer ${this.$store.state.token}`
      },
      collectBlo: false,
      page: 1,
      per_page: 16,
      imageList: [],
      total: 0,
      // 添加素材弹窗
      dialogVisible: false,
      imageUrl: '',

      // 图片选择的样式
      selected: null,
      upload_cover_url: ''
    }
  },
  async created () {
    this.getChannelsFn()
    // 接受编辑传过来的id
    if (this.$route.query.id) {
      console.log(this.$route.query.id)
      const { data: res } = await getArticleIdAPI({ articleId: this.$route.query.id })
      console.log(res.data)
      this.publishForm = res.data
    }
  },
  methods: {
    async getChannelsFn () {
      const { data: res } = await getChannelsAPI()
      this.channelsList = res.data.channels
      console.log(this.channelsList)
    },
    releaseArticleFn (boolean) {
      this.$refs.publishRef.validate(async valid => {
        if (!valid) return
        try {
          const { data: res } = await addArticlesAPI({
            draft: boolean,
            ...this.publishForm
          })
          this.$router.push('/articles')
          this.$message({ showClose: true, type: 'success', message: '新闻章发布成功' })
          console.log(res)
        } catch (err) {
          this.$message({ showClose: true, type: 'error', message: err.response.data.message })
        }
      })
    },
    addCoverFn () {
      this.getImagesFn()
      this.coverDialogVisible = true
    },
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
    // 图片上传成功的钩子
    handleAvatarSuccess (res, file) {
      this.getImagesFn()
      this.imageUrl = URL.createObjectURL(file.raw)
      // 图片上传成功之后的路基
      console.log(res.data.url)
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
    handleClose () {
      this.imageUrl = ''
    },
    imageAddURL () {
      if (this.activeName === 'imagesBox') {
        // 当前选中的路径
        this.upload_cover_url = this.imageList[ this.selected ].url
        console.log(this.imageList[ this.selected ].url)
        this.coverDialogVisible = false
        this.publishForm.cover.images = [ this.upload_cover_url ]
      }
    }
  },
  components: {
    quillEditor,
    uploadCover
  }
}
</script>

<style lang="scss" scoped >
:deep .ql-editor {
  height: 300px;
}
.images {
  display: flex;
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

.grid-content {
  position: relative;
  .backg {
    background: url(@/assets/dui.png);
    width: 140px;
    height: 120px;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    background-size: 50px 50px;
    top: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 99;
  }
}
</style>
