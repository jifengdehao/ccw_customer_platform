/**
* 2017/10/16
* author zhangwenlong
* email zhangwenlong@ccw163.com
* 功能：业务组件-用户端管理侧栏菜单配置
*/
<template>
  <div id="custom">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'custom',
    data () {
      return {
        menu: [
//        {
//          name: 'account_manage',
//          text: '用户账号管理',
//          icon: 'ios-people',
//          noDropdown: true
//        },
//        {
//          name: '',
//          text: '消息推送功能',
//          icon: 'ios-chatbubble',
//          noDropdown: false,
//          submenu: [
//            {
//              name: 'system_message_push',
//              text: '系统消息推送'
//            },
//            {
//              name: 'activity_message_push',
//              text: '活动消息推送'
//            },
//            {
//              name: 'daily_menu_push',
//              text: '每日菜谱推送'
//            },
//            {
//              name: 'app_notice_push',
//              text: '应用通知推送'
//            }
//          ]
//        },
//        {
//          name: '',
//          text: '用户端设置',
//          icon: 'gear-a',
//          noDropdown: false,
//          submenu: [
//            {
//              name: 'banner_manage',
//              text: 'banner图管理'
//            },
//            {
//              name: 'market_push',
//              text: '市场推送管理'
//            },
//            {
//              name: 'start_price_see',
//              text: '起送价查看'
//            },
//            {
//              name: 'evaluation_tag_manage',
//              text: '评价标签管理'
//            }
//          ]
//        },
//        {
//          name: 'account_balance',
//          text: '用户余额积分',
//          icon: 'ios-people',
//          noDropdown: true
//        }
        ]
      }
    },
    created () {
      this.getCustomMenu()
    },
    methods: {
      route (name) {
        this.$router.push('/custom/' + name)
      },
      getCustomMenu () {
        if (sessionStorage.getItem('menu')) {
          let menuIcon = ['ios-people', 'ios-chatbubble', 'gear-a', 'ios-people']
          let resMenu = JSON.parse(sessionStorage.getItem('menu'))
          resMenu.forEach((item) => {
            if (item.url === 'custom') {
              this.menu = item.childMenusList.map((item, index) => {
                if (item.childMenusList.length > 0) {
                  return {
                    id: item.menusId,
                    name: item.menuName,
                    icon: menuIcon[index],
                    url: item.url,
                    noDropdown: false,
                    submenu: item.childMenusList.map((item) => {
                      return {name: item.menuName, url: item.url}
                    })
                  }
                }
                return {id: item.menusId, name: item.menuName, icon: menuIcon[index], url: item.url, noDropdown: true}
              })
            }
          })
        }
      }
    },
    components: {
      SideBar
    }
  }
</script>
