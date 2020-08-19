<template>
  <div>
    <label class="notes">
      <span class="name">备注</span>
      <input type="text" :value="notes" @change="onValueChang($event.target.value)" placeholder="在这里输入备注">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    @Prop({default: ''}) readonly notes!: string;

    onValueChang(value: string) {
      this.$emit('update:notes', value);
    }
  }
</script>

<style lang="scss" scoped>
  .notes {
    background: #f5f5f5;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-left: 16px;

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
</style>