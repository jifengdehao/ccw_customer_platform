<template>
  <div id="seller">
    <side-bar :menu="menu" @route="route"></side-bar>
  </div>
</template>
<script type="text/ecmascript-6">
  import SideBar from 'components/sidebar/sidebar'

  export default {
    name: 'seller',
    data() {
      return {
        menu: [
          {
            name: 'seller_settled_manage',
            text: '商户入驻材料审核',
            icon: 'person-add',
            noDropdown: true
          },
          {
            name: 'seller_video_manage',
            text: '商户视频图片审核',
            icon: 'ios-videocam',
            noDropdown: true
          },
          {
            name: 'seller_account_manage',
            text: '商户账号管理',
            icon: 'ios-people',
            noDropdown: true
          },
          {
            name: 'seller_observant_manage',
            text: '商户守约管理',
            icon: 'flag',
            noDropdown: true
          },
          {
            name: 'bd_manage',
            text: 'BD及邀请码管理',
            icon: 'android-share-alt',
            noDropdown: true
          },
          {
            name: 'food_template_manage',
            text: '商品模版库管理',
            icon: 'ios-cloud',
            noDropdown: true
          },
          {
            name: 'seller_message_push',
            text: '商家消息推送',
            icon: 'clock',
            noDropdown: true
          },
          {
            name: 'seller_message_remind',
            text: '商家消息提醒',
            icon: 'chatbubble-working',
            noDropdown: true
          }
        ]
      }
    },
    methods: {
      route(name) {
        console.log(name)
        this.$router.push('/seller/' + name)
      }
    },
    components: {
      SideBar
    }
  }
</script>
