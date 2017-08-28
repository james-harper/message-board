<template lang="pug">
  header(class="bg-green fixed w-100 pv1 z-999")
    div(class="mw9 pa2 pr4 white")
      nav(class="tracked ml1")
        router-link(
          tag="span",
          to="/",
          exact,
          class="dn dib-l gilroy link f4 dim white ml2 mr3 pointer"
          v-on:click.native="setCurrentRoom('home')"
        ) chat.
        router-link(
          tag="span",
          v-for="(room, key) in rooms",
          :to="{path: '/'+ key}",
          class="link white mr3 f4",
          :class="{'o-40': currentRoom !== key}",
          :key="key",
          :title="key",
          v-on:click.native="setCurrentRoom(key)"
        )
          a(class="no-underline", v-html="emojify(room)")
        div(v-if="user", class="fr gilroy dn-m dib-ns")
          span(class="pointer", title="This is you!")
            span(v-html="emojify(user.avatar)" class="pr2")
            span {{user.name}}
        div(v-else, class="fr gilroy dib-ns")
          span Loading...
</template>

<script>
import rooms from '@/rooms';
import user from '@/user'
import {emojify} from '@/helpers';

export default {
  name: 'chat-header',
  data() {
    return {
      rooms,
      currentRoom: this.$route.params.room || '',
      user: false
    }
  },
  methods: {
    emojify(text) {
      return emojify(text);
    },
    setCurrentRoom(room) {
      this.currentRoom = room;
    }
  },
  created() {
    Promise.resolve(user).then(user => {
      window.App.user = user;
      this.user = user;
    });
  }
}
</script>
