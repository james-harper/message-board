<template lang="pug">
  button(
    :class="computedClasses",
    class="gilroy b br3 tc ba b--grey grow",
    @click.prevent="click()",
  ) {{text}}
</template>

<script>
export default {
  name: 'chat-button',
  props: {
    text: {
      default: 'Submit',
      type: String
    },
    size: {
      default: 'medium',
      type: String
    },
    disabled: {
      default: false,
      type: Boolean
    },
    colour: {
      default: 'dark-green',
      type: String
    }
  },
  computed: {
    computedClasses() {
      return [
        this.sizeClass,
        this.colourClass,
        this.enabledClass
      ].join(' ');
    },
    sizeClass() {
      let sizes = {
        small: 'f6 ph3 pv1',
        medium: 'f5 ph4 pv2',
        large: 'f4 ph5 pv3'
      }

      return sizes[this.size] || sizes.medium;
    },
    colourClass() {
      let textColour = 'white ';
      let btnColour = `bg-${this.colour}`;
      return textColour + btnColour;
    },
    enabledClass() {
      return (this.disabled) ?
        'o-60 not-allowed disabled':
        'pointer';
    }
  },
  methods: {
    click() {
      return this.$emit('click', this);
    }
  }
}
</script>
