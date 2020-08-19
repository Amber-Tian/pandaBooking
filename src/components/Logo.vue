<template>
  <div class="logoNav">
    <Icon name="panda" class="logo"/>
    <p>熊猫记账</p>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class Logo extends Vue {
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .logoNav {
    min-height: 54px;
    background-color: $color-theme;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > .logo {
      width: 40px;
      height: 40px;
      margin-left: 12px;
    }

    > p {
      font-size: 20px;
      text-align: center;
      margin-right: 50%;
      transform: translate(50%);
    }
  }
</style>