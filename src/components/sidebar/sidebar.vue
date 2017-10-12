 <template>
  <i-row type="flex" style="height: 100%;">
    <i-col :span="spanLeft" :class="{'layout-hide-text': spanLeft < 3}" class="sidebar">
      <div class="close-menu" @click="toggleClick()">
        <Icon type="navicon-round" :size="iconSize"></Icon>
      </div>
      <Menu theme="dark" @on-select="route" width="auto">
        <template v-for="item in menu">
          <MenuItem v-if="item.noDropdown && item.name" :name="item.name">
            <Icon :type="item.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{item.text}}</span>
          </MenuItem>
          <Submenu v-else :name="item.name">
            <template slot="title">
              <Icon :type="item.icon" :size="iconSize"></Icon>
              <span class="layout-text">{{item.text}}</span>
            </template>
            <template v-for="m in item.submenu">
              <Menu-item :name="m.name">{{m.text}}</Menu-item>
            </template>
          </Submenu>
        </template>
      </Menu>
    </i-col>
    <i-col :span="spanRight" style="overflow-y: scroll;padding: 40px;">
      <router-view></router-view>
    </i-col>
  </i-row>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      menu: {
        default: [],
        type: Array
      }
    },
    data() {
      return {
        spanLeft: 3,
        spanRight: 21
      }
    },
    mounted() {},
    computed: {
      iconSize() {
        return this.spanLeft === 3 ? 14 : 24
      }
    },
    methods: {
      toggleClick() {
        if (this.spanLeft === 3) {
          this.spanLeft = 1
          this.spanRight = 23
        } else {
          this.spanLeft = 3
          this.spanRight = 21
        }
      },
      route(name) {
        this.$emit('route', name)
      }
    }
  }
</script>
