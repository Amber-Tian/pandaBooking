<template>
  <Layout>
    <Logo/>
    <div class="tags">
      <router-link
          :to="`/labels/edit/${tag.id}`"
          class="tag"
          v-for="tag in tags"
          :key="tag.id">
        <span>{{tag.name}}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Logo from '@/components/Logo.vue';

  @Component({components: {Logo}})
  export default class Labels extends Vue {
    created() {
      this.$store.commit('fetchTags');
    }

    get tags() {
      return this.$store.state.tagList;
    }

    createTag() {
      const name = window.prompt('请输入标签名');
      this.$store.commit('createTag', name);
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .tags {
    background-color: #fff;
    padding-left: 16px;

    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      color: #000;

      svg {
        color: #333;
        margin-right: 16px;
        width: 18px;
        height: 18px;
      }
    }
  }

  .createTag {
    background-color: $color-theme;
    color: #ffffff;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;

    &-wrapper {
      text-align: center;
      padding: 16px;
      margin-top: 44-16px;
    }
  }
</style>