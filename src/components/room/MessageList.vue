<template lang="pug">
  div
    ul(v-if="messages.length" class="list mt0 pa2 ma2")
      ChatMessage(
        v-for="message in messages",
        :key="message.id",
        :message="message"
      )
    div(v-else)
      p(class="black-80") No one has posted here yet...
</template>

<script>
import ChatMessage from '@/components/room/Message';
import firebase from '@/firebase';
import _findIndex from 'lodash/findindex';

export default {
  data() {
    return {
      db: firebase.database(),
      roomRef: '',
      messages: []
    }
  },
  components: {
    ChatMessage
  },
  watch: {
    '$route'() {
      this.subscribe();
    }
  },
  methods: {
    subscribe() {
      this.messages = [];
      this.roomRef = this.db.ref(`messages/${this.$route.params.room}`);

      this.roomRef.off();

      this.roomRef.on('child_added', snap => {
        this.messages.push(snap.val());
      });

      this.roomRef.on('child_changed', snap => {
          let msg = snap.val();
          let key = snap.key;
          let target = _findIndex(this.messages, {key});

          this.$set(this.messages, target, msg);
      });

      this.roomRef.on('child_removed', snap => {
          let key = snap.key;
          let target = _findIndex(this.messages, {key});
          this.messages = this.messages.filter(m => m.key !== key);
          this.$set(this.messages);
      });
    }
  },
  created() {
    this.subscribe();
  },
  beforeDestroy() {
    this.roomRef.off();
  }
}
</script>
