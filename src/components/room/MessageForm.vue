<template lang="pug">
div
  form(class="black-80 w-100")
    div(class="fl w-100")
      div(class="w-100")
        label(class="fl gilroy w-80 f6 b db mb2") {{labelText}}
        small(
          class="fr w-20 tr f6",
          :class="{'black-60': allowSubmission && message.length, 'dark-red': !allowSubmission && message.length}"
        ) {{message.length}}/{{maxLength}}
      textarea(
        name="comment",
        rows=4,
        v-model="message",
        class="db border-box hover-black w-100 ba b--black-20 pa2 br2 mb2"
        @keydown.ctrl.enter="submit()"
        @keydown.alt.enter="giphy()"
      )
      ChatButton(
        class="fr",
        text="Text",
        :disabled="!allowSubmission",
        @click="submit()"
      )
      ChatButton(
        class="fr",
        text="Gif",
        :disabled="!allowSubmission",
        @click="giphy()"
      )
</template>
<script>
import ChatButton from '@/components/generic/Button';
import Giphy from '@/giphy';
import _random from 'lodash/random';
import { linkify, convertLineBreaks } from '@/helpers';

export default {
  name: 'chat-message-form',
  data() {
    return {
      message: '',
      maxLength: 500,
    }
  },
  components: {
    ChatButton
  },
  watch: {
    '$route'() {
      this.message = '';
    }
  },
  computed: {
    labelText() {
      let room = this.$route.params.room;
      let exceptions = ['random', 'funny', 'sad'];
      return `Say something ${!exceptions.includes(room) ? 'about ' : ' ' } ${room}...`;
    },
    allowSubmission() {
      return this.message.length > 0 && this.message.length <= this.maxLength;
    }
  },
  methods: {
    submit(message) {
      message = message || this.message;

      // Perform any necessary html conversions
      message = linkify(
        convertLineBreaks(message), true
      );

      if (!this.allowSubmission) {
        return;
      }

      this.$emit('submit', message);
      this.message = '';
    },
    giphy() {
      Giphy.get(this.message, 10)
      .then(response => {
        let rand = _random(0, 10);
        let gif = response.data.data[rand].images.fixed_height.url;
        let html = `
          <img class="giphy" src="${gif}"></img>
          <br>
          <small>/giphy ${this.message}</small>
        `
        this.submit(html);
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
textarea
  resize: none
</style>
