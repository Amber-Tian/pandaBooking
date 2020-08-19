<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click.native="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <label class="tagName">
      <span class="name">标签名</span>
      <input ref="input" type="text" placeholder="请输入标签名" :value="tag.name">
    </label>
    <div class="button-wrapper">
      <button class="updateTag" @click="updateTag($refs.input.value)">保存</button>
      <button class="removeTag" @click="removeTag">删除</button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class EditLabel extends Vue {
    get tag() {
      return this.$store.state.currentTag;
    }

    created() {
      const id = this.$route.params.id;
      this.$store.commit('setCurrentTag', id);
      if (!this.tag) {
        this.$router.replace('/404');
      }
    }

    removeTag() {
      const confirm = window.confirm('确定删除标签？');
      if (this.tag && confirm) {
        this.$store.commit('removeTag', this.tag.id);
        this.$router.back();
      } else {return;}
    }

    updateTag(name: string) {
      this.$store.commit('updateTag', {
        id: this.tag.id, name
      });
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 12px 16px;

    > .leftIcon {
      width: 24px;
      height: 24px;
    }

    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }

  .tagName {
    background: #fff;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 16px;
    margin-top: 8px;

    .name {
      /*padding-right: 16px;*/
    }

    input {
      padding: 16px;
      background: transparent;
      border: none;
      flex-grow: 1;
    }
  }

  %item {
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 20px;
    margin: 0 36px;
    color: #fff;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;

    > .removeTag {
      @extend %item;
      background-color: #FF4D4F;
    }

    > .updateTag {
      @extend %item;
      background-color: $color-theme;
    }
  }


</style>