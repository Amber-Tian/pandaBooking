<template>
  <nav>
    <router-link to="/labels" active-class="selected" class="item">
      <Icon name="label" />
      标签
    </router-link>
    <router-link to="/money" active-class="selected" class="item">
      <Icon name="money" />
      记账
    </router-link>
    <router-link to="/statistics" active-class="selected" class="item">
      <Icon name="statistic" />
      统计
    </router-link>
  </nav>
</template>

<script lang="ts">
  export default {
    name: 'Nav'
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  nav {
    display: flex;
    box-shadow: 0 0 3px rgba(0,0,0,.25);
    > .item {
      padding: 2px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.333333%;
      flex-direction: column;
      .icon {
        width: 32px;
        height: 32px;
        margin: 2px 0;
      }
    }
    > .selected {
      color: $color-highlight;
    }
  }
</style>