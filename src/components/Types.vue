<template>
  <div>
    <ul class="types">
      <li :class="type === '-' && 'selected'" @click="selectType('-')">
        <Icon class="icon" v-if="type === '-'" name="bamboo"/>
        <span>支出</span>
      </li>
      <li :class="type === '+' && 'selected'" @click="selectType('+')">
        <Icon class="icon" v-if="type === '+'" name="bamboo"/>
        <span>收入</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Types extends Vue {
    // type 的值 '-'表示支出， '+'表示收入

    @Prop(String) readonly type: string | undefined;

    selectType(type: string) {
      if (type !== '-' && type !== '+') {
        throw new Error('type is unknown');
      } else {
        this.$emit('update:type', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .types {
    background: $color-theme;
    display: flex;
    text-align: center;
    font-size: 18px;

    > li {
      width: 50%;
      height: 54px;
      display: flex;
      justify-content: center;
      align-items: center;

      > .icon {
        margin-right: 8px;
      }

      &.selected {
        font-size: 24px;
      }

      /*<!--&.selected::after {-->*/
      /*<!--  content: '';-->*/
      /*<!--  position: absolute;-->*/
      /*<!--  bottom: 0;-->*/
      /*<!--  left: 0;-->*/
      /*<!--  width: 100%;-->*/
      /*<!--  height: 4px;-->*/
      /*<!--  background: $color-theme;-->*/
      /*<!--}-->*/
    }
  }
</style>