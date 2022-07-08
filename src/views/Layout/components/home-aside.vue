<template>
  <el-aside :width="isShow ? '65px':'200px'">
    <div class="logoBox" :class="isShow?'img2':'img'"></div>
    <el-menu
      :default-active="$route.path"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isShow"
      :collapse-transition="false"
    >
      <el-menu-item :index="item.path" v-for="item in channelsList" :key="item.id">
        <i :class="channelsListIcon[item.id]"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'homeAside',
  props: {
    isShow: Boolean
  },
  data () {
    return {
      // 菜单频道
      channelsList: [
        { id: 101, path: '/home', name: '首页' },
        { id: 102, path: '/articles', name: '内容管理' },
        { id: 103, path: '/images', name: '素材管理' },
        { id: 104, path: '/publish', name: '发布文章' },
        { id: 105, path: '/comment', name: '评论管理' },
        { id: 106, path: '/fans', name: '粉丝管理' },
        { id: 107, path: '/settings', name: '个人设置' }
      ],
      // 频道的icon
      channelsListIcon: {
        101: 'el-icon-s-home',
        102: 'el-icon-s-order',
        103: 'el-icon-picture',
        104: 'el-icon-s-promotion',
        105: 'el-icon-s-comment',
        106: 'el-icon-s-custom',
        107: 'el-icon-s-tools'
      }
    }
  },
  created () {
    console.log(this.isShow)
  },
  methods: {

  },
  components: {
  }
}
</script>

<style lang="scss" scoped >
.logoBox {
  width: auto;
  height: 60px;
  background-color: #002244;
  background-repeat: no-repeat;
  background-position: center;
  border-bottom: 2px solid #324d66;
}
.img {
  background-image: url('@/assets/logo2.png');
  background-size: 70%;
}
.img2 {
  background-image: url('@/assets/logo3.png');
  background-size: 65%;
}

.el-menu {
  border: none;
}
.el-aside {
  background-color: #002033;
}
</style>
