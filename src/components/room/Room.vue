<template lang="pug">
div(class="vh-100 pt5 pa2")
  div(class="fl w-100 h-70 overflow-scroll-y")
    router-view
  div.cf
  div(:class="formClass")
    ChatMessageForm(@submit="submit" @collapse="collapseForm")
</template>

<script>
import ChatButton from '@/components/generic/Button';
import ChatMessageForm from '@/components/room/MessageForm';
import ChatMessageList from '@/components/room/MessageList'

import firebase from '@/firebase';

export default {
  name: 'chat-room',
  data() {
    return {
      db: firebase.database(),
      formOpen: true
    }
  },
  components: {
    ChatButton,
    ChatMessageForm,
    ChatMessageList
  },
  computed: {
    formClass() {
      let formClass = 'bg-light-gray fixed w-100 bottom-0 left-0 h-10 pa3 b--light-gray bt';
      if (!this.formOpen) {
        formClass += ' collapsed';
      }

      return formClass;
    }
  },
  methods: {
    collapseForm(shouldCollapse) {
      this.formOpen = !shouldCollapse;
    },
    submit(message) {
      let timestamp =  Date.now();

      let submit = {
        user: window.App.user,
        message,
        timestamp
      };

      let roomRef = this.db.ref(`messages/${this.$route.params.room}/`);
      let post = roomRef.push(submit);

      let userPostRef = this.db.ref(`user_posts/${window.App.user.id}/${post.key}`);
      userPostRef.set({
        room: this.$route.params.room,
        message,
        timestamp
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.cf
  clear: both
  height: 178px

.collapsed
  height 42px !important
</style>
