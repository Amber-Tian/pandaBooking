<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) amount!: number;
    output = this.amount.toString();

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 16) {return;}
      if (this.output === '0') {
        if ('0123456789'.indexOf(input) >= 0) {
          this.output = input;
        } else {
          this.output += input;
        }
        return;
      }
      if (this.output.indexOf('.') >= 0 && input === '.') {return;}

      this.output += button.textContent;
    }

    remove() {
      if (this.output.length === 1) {
        this.output = '0';
      } else {
        this.output = this.output.slice(0, -1);
      }
    }

    clear() {
      this.output = '0';
    }

    ok() {
      if (this.output === '0' || this.output === '0.') {return;} else {
        this.$emit('update:amount', parseFloat(this.output));
        this.$emit('submit', this.output);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .numberPad {
    .output {
      font-size: 32px;
      font-family: Consolas, monospace;
      text-align: right;
      padding: 8px 16px;
      box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, .25),
      inset 0 3px 3px -3px rgba(0, 0, 0, .25);
    }

    .buttons {
      height: 64*4px;
      @extend %clearFix;
      background: linear-gradient(to bottom right, lighten($color-theme, 4*6%) ,$color-theme );

      > button {
        width: 25%;
        height: 64px;
        float: left;
        background: transparent;
        border: 1px solid lighten($color-theme, 4*6%);

        &.ok {
          height: 64*2px;
          float: right;
        }

        &.zero {
          width: 25*2%;
        }
      }
    }
  }
</style>