<template lang="pug">
  li(class="flex items-center lh-copy pa3 ph0-l bb b--black-10")
    div(class="dtc w2 w3-ns")
      span(v-html="emojify(message.user.avatar)", class="ba b--black-10 tc db br2 w2 w3-ns h2 h3-ns", :title="message.user.name")
    div(class="dtc v-mid pl3")
      h1(class="f6 f5-ns dib fw6 lh-title black mv0") {{message.user.name}}
      small(class="dib moon-gray pl1") {{timeAgo}}
      h2(class="f6 fw4 mt0 mb0 black-60", v-html="message.message")
</template>

<script>
import {emojify} from '@/helpers';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

export default {
  props: ['message'],
  computed: {
    timeAgo() {
      return distanceInWordsToNow(new Date(this.message.timestamp)) + ' ago';
    }
  },
  methods: {
    emojify(text) {
      return emojify(text, 36);
    }
  }
}
</script>
