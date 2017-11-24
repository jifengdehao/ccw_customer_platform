/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：公共组件-侧栏组件
*/
<template>
  <Row type="flex" style="height: 100%;">
    <Col :span="spanLeft" :class="{'layout-hide-text': spanLeft < 3}" class="sidebar">
      <div class="close-menu" @click="toggleClick()">
        <Icon type="navicon-round" :size="iconSize"></Icon>
      </div>
      <Menu theme="dark" @on-select="route" width="auto" :active-name="activeName">
        <template v-for="item in menu">
          <MenuItem v-if="item.noDropdown && item.name" :name="item.url">
            <Icon :type="item.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{item.name}}</span>
          </MenuItem>
          <Submenu v-else :name="item.name">
            <template slot="title">
              <Icon :type="item.icon" :size="iconSize"></Icon>
              <span class="layout-text">{{item.name}}</span>
            </template>
            <template v-for="m in item.submenu">
              <Menu-item :name="m.url">{{m.name}}</Menu-item>
            </template>
          </Submenu>
        </template>
      </Menu>
    </Col>
    <Col :span="spanRight" style="overflow-y: scroll;padding: 40px;">
      <router-view></router-view>
    </Col>
  </Row>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      menu: {
        default: [],
        type: Array
      }
    },
    data () {
      return {
        spanLeft: 3,
        spanRight: 21
      }
    },
    computed: {
      iconSize () {
        return this.spanLeft === 3 ? 14 : 24
      },
      activeName () {
        return this.$route.path.split('/')[2]
      }
    },
    methods: {
      toggleClick () {
        if (this.spanLeft === 3) {
          this.spanLeft = 1
          this.spanRight = 23
        } else {
          this.spanLeft = 3
          this.spanRight = 21
        }
      },
      route (name) {
        this.$emit('route', name)
      }
    }
  }
</script>
