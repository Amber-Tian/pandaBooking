<template>
  <div class="nav-wrapper">
    <div class="content" :class="classPrefix && `${classPrefix}-content`">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import Nav from '@/components/Nav.vue';

  @Component({components: {Nav}})
  export default class Layout extends Vue {
    @Prop(String) classPrefix!: string;
  }
</script>

<style lang="scss" scoped>
  .nav-wrapper {
    display: flex;
    height: 100vh;
    flex-direction: column;
  }

  .content {
    overflow: auto;
    flex-grow: 1;
  }
</style>