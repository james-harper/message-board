<template>
  <div id="app">
    <ChatHeader></ChatHeader>
    <router-view></router-view>
  </div>
</template>

<script>
import GilroyBold from '@/assets/fonts/Gilroy-ExtraBold.otf';
import ChatHeader from '@/components/header/Header'

export default {
  name: 'chat-app',
  data() {
    return {
      user: window.App.user
    }
  },
  components: {
    ChatHeader
  }
}
</script>

<style lang="stylus">
@font-face
  font-family: 'Gilroy Bold'
  src: url('assets/fonts/Gilroy-ExtraBold.otf')

@font-face
  font-family: 'Gilroy Light'
  src: url('assets/fonts/Gilroy-Light.otf')

body
  font-family: "Open Sans", Helvetica, Arial, sans-serif
  font-weight: 300

.not-allowed
  cursor: not-allowed

.gilroy
  font-family: 'Gilroy Light'

.gilroy-bold
  font-family: 'Gilroy Bold'

img.giphy
  height 150px
  weight 150px
</style>
