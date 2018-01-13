<template lang="pug">
  label(
    class="fl gilroy w-80 f6 b db mb2"
    @click.prevent="click()",
  ) {{text}}
</template>

<script>
export default {
  name: 'chat-label',
  props: {
    text: {
      default: '',
      type: String
    }
  },
  methods: {
    click() {
      return this.$emit('click', this);
    }
  }
}
</script>
