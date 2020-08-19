<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tags" :key="tag.id"
          :class="{selected: selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)"
      >
        {{tag.name}}
      </li>
    </ul>
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Tags extends Vue {
    get tags() {
      return this.$store.state.tagList;
    }

    @Prop(Array) selectedTags!: string[];

    toggle(tag: string) {
      const index: number = this.selectedTags.indexOf(tag);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(tag);
      }
      this.$emit('update:selected', this.selectedTags);
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
    overflow: auto;
    font-size: 14px;
    padding: 16px;

    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        background: $bg;
        height: 24px;
        border-radius: 12px;
        line-height: 24px;
        padding: 0 16px;
        margin: 4px 6px;

        &.selected {
          background: $color-theme;
          color: white;
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>