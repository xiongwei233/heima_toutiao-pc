<template>
  <div class="my_imagesBox">
    <div class="my_images">
      <el-image style="width: 150px; height: 150px" :src="url" fit="cover">
        <div slot="error" class="image-slot">
          <i class="el-icon-s-marketing"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: 'uploadCover',
  props: [ 'url' ],
  data () {
    return {
      images: ''
    }
  },
  created () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss" scoped >
.my_imagesBox {
  width: 150px;
  margin: 0 20px 0 0;
  cursor: pointer;
  .my_images {
    .el-image {
      text-align: center;
      border: 1px dashed #c1c1c1;
      box-sizing: border-box;
      .image-slot {
        height: 100%;
        i {
          color: #e0dcdc;
          font-size: 80px;
          padding-top: 35px;
          box-sizing: border-box;
        }
      }
    }
  }
  .el-image:hover {
    border-color: #409eff;
  }
}
</style>
