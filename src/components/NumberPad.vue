<template>
  <div class="numberPad">
    <div class="wrapper">
      <label class="notes">
        <span>日期</span>
        <input :value="getTime(createdAt)"
               :max="today"
               @change="onValueChange($event.target.value)"
               type="date" placeholder="在这里输入日期">
      </label>
      <div class="output">{{output}}</div>
    </div>
    <div v-show="type" class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">
        <Icon class="deleteIcon" name="delete"/>
      </button>
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
  import dayjs from 'dayjs';

  @Component
  export default class NumberPad extends Vue {
    @Prop(Number) amount!: number;
    @Prop(String) createdAt!: string;
    output = this.amount.toString();
    today = dayjs().format('YYYY-MM-DD');

    get type() {
      return this.$store.state.padType;
    }

    getTime(value: string) {
      return dayjs(value).format('YYYY-MM-DD');
    }

    onValueChange(value: string) {
      let value2: string;
      if (dayjs(value).isSame(dayjs(), 'day')) {
        value2 = dayjs().toISOString();
      } else {value2 = value;}
      this.$emit('update:createdAt', value2);
    }

    inputContent(event: MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent!;
      if (this.output.length === 9) {return;}
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
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: inset 0 -3px 3px -3px rgba(0, 0, 0, .25),
      inset 0 3px 3px -3px rgba(0, 0, 0, .25);

      .notes {
        background: #f5f5f5;
        display: flex;
        align-items: center;
        font-size: 16px;
        padding-left: 8px;
        width: 55%;

        input {
          padding: 8px;
          background: transparent;
          border: none;
          width: 80%;
        }
      }

      .output {
        font-size: 32px;
        font-family: Consolas, monospace;
        text-align: right;
        padding: 8px;
        width: 45%;
      }
    }

    .buttons {
      height: 64*4px;
      @extend %clearFix;
      background: linear-gradient(to bottom right, lighten($color-theme, 4*6%), $color-theme);

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

        > .deleteIcon {
          width: 40%;
          height: 40%;
        }
      }
    }
  }
</style>