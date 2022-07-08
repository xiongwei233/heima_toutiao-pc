<template>
  <div>
    <el-card>
      <div slot="header">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form
            :model="settingsForm"
            :rules="settingsRules"
            ref="settingsRef"
            label-width="140px"
            class="demo-ruleForm"
          >
            <el-form-item label="编号：">
              <span>{{settingsForm.id}}</span>
            </el-form-item>
            <el-form-item label="手机：">
              <span>{{settingsForm.mobile}}</span>
            </el-form-item>
            <el-form-item label="媒体名称：" prop="name">
              <el-input v-model="settingsForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：" prop="intro">
              <el-input type="textarea" v-model="settingsForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="settingsForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="editSettingsFn">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12" class="imgaesBox">
          <div class="content">
            <el-image
              style="width: 230px; height: 230px"
              :src="photo"
              fit="cover"
              @click="$refs.file.click()"
            >
              <div slot="error" class="image-slot">
                <el-image
                  style="width: 230px; height: 230px"
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ftva1.sinaimg.cn%2Fbmiddle%2F9150e4e5gy1g5e2ibkhzjj20hn0hndib.jpg&refer=http%3A%2F%2Ftva1.sinaimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1659800242&t=c25889324042e21840ceba823768011e"
                  fit="cover"
                />
              </div>
            </el-image>
            <label for="file">修改头像</label>
            <input type="file" id="file" ref="file" hidden @change="onFileChange" />
          </div>
        </el-col>
      </el-row>
    </el-card>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="35%" @opened="onDialogOpened">
      <div>
        <img :src="previewImage" alt class="imgsBOX" ref="preview_img" />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdataImage">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { check_Email } from '@/util/validator'
import { getUserInfoAPI, editUserInfoAPI, editPhotoAPI } from '@/api'
import { mapMutations } from 'vuex'
// 裁切图片
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'settingIndex',
  data () {
    return {
      settingsForm: {
        name: '',
        intro: '',
        email: ''
      },
      photo: '',
      settingsRules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { min: 3, max: 7, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体媒体介绍', trigger: 'blur' },
          { min: 5, max: 150, message: '长度在 5 到 150 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, validator: check_Email, trigger: 'blur' }
        ]
      },
      dialogVisible: false,
      previewImage: '',
      cropper: null
    }
  },
  created () {
    this.getUserInfoFn()
  },
  methods: {
    ...mapMutations([ 'EDIT_PHOTO', 'EDIT_NAME' ]),
    async getUserInfoFn () {
      try {
        const { data: res } = await getUserInfoAPI()
        console.log(res.data)
        this.settingsForm = res.data
        this.photo = res.data.photo
      } catch (err) {
        this.$message({ showClose: true, type: 'error', message: err.response.data.message })
      }
    },
    // 保存设置
    editSettingsFn () {
      this.$refs.settingsRef.validate(async valid => {
        if (!valid) return
        try {
          const { data: res } = await editUserInfoAPI({
            name: this.settingsForm.name,
            intro: this.settingsForm.intro,
            email: this.settingsForm.email
          })
          this.EDIT_NAME(res.data.name)
          console.log(res.data)
          this.$message({ showClose: true, type: 'success', message: '修改成功' })
        } catch (err) {
          this.$message({ showClose: true, type: 'error', message: err.response.data.message })
        }
      })
    },
    onFileChange () {
      const file = this.$refs.file

      const blobDate = window.URL.createObjectURL(file.files[ 0 ])
      this.previewImage = blobDate
      this.$refs.file.value = ''

      console.log(file.files[ 0 ])
      console.log(blobDate)
      this.dialogVisible = true
    },
    // dialog 完全打开之后
    onDialogOpened () {
      //
      const image = this.$refs.preview_img

      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }

      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1,
        viewMode: 1,
        dragMode: 'move',
        zoomable: false
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        //   console.log(event.detail.width)
        //   console.log(event.detail.height)
        //   console.log(event.detail.rotate)
        //   console.log(event.detail.scaleX)
        //   console.log(event.detail.scaleY)
        // }
      })
      console.log(this.cropper)
    },
    onUpdataImage () {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const fd = new FormData()
        fd.append('photo', blob)
        console.log(blob)
        console.log(fd)
        try {
          const { data: res } = await editPhotoAPI(fd)
          this.photo = res.data.photo
          this.EDIT_PHOTO(this.photo)
        } catch (err) {
          this.$message({ showClose: true, type: 'error', message: err.response.data.message })
        }
      })
      this.dialogVisible = false
    }
    // handleClose () {
    //   this.cropper.destroy()
    // }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped >
.content {
  position: relative;
  width: 210px;
  height: 210px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 20%);
  text-align: center;
  label {
    line-height: 50px;
  }
  label:hover {
    color: #409eff;
    cursor: pointer;
  }
}
.el-image {
  border: 1px dashed #c1c1c1;
  border-radius: 8px;
  cursor: pointer;
}
.el-image:hover {
  border-color: #409eff;
}
.imgsBOX {
  max-width: 100%;
  display: block;
}
</style>
