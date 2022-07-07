<template>
  <div id="app">
    <el-container>
      <home-aside :isShow="isShow"></home-aside>
      <el-container>
        <el-header>
          <div class="infoBox">
            <i :class="isShow?'el-icon-s-unfold':'el-icon-s-fold'" @click="isShow=!isShow"></i>
            <h1>欢迎登陆 黑马头条后台编辑系统!</h1>
          </div>
          <div class="imgBox">
            <el-image style="width: 30px; height: 30px" :src="$store.state.photo" fit="cover"></el-image>
            <el-dropdown>
              <span class="el-dropdown-link">
                下拉菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu>
                <el-dropdown-item @click.native="$router.push('/settings')">设置</el-dropdown-item>
                <el-dropdown-item @click.native="outHomeFn">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import homeAside from './components/home-aside.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'layoutInfo',
  components: {
    homeAside
  },
  data () {
    return {
      isShow: false
    }
  },
  created () {
  },
  methods: {
    ...mapMutations([ 'REMOVE_TOKEN' ]),
    // 退出
    outHomeFn () {
      this.REMOVE_TOKEN('token')
      this.$router.push('/login')
    }

  }
}
</script>

<style lang="scss" scoped >
.el-container {
  height: 100%;
  .el-header {
    background-color: #fff;
    line-height: 60px;
    border-bottom: 1px solid #f9f9f9;
    display: flex;
    justify-content: space-between;

    .infoBox {
      i {
        font-size: 20px;
        padding-right: 10px;
        cursor: pointer;
      }
      h1 {
        display: inline-block;
        font-size: 18px;
      }
    }
    .imgBox {
      .el-image {
        border: 1px solid #c5c5c5;
        border-radius: 50%;
        position: relative;
        margin-right: 10px;
        top: 50%;
        transform: translate(0, -55%);
      }
    }
  }
}
</style>
