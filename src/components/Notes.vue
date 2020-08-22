<template>
  <div>
    <label class="notes">
      <span>备注</span>
      <input
          type="text"
          :value="notes"
          @blur="onValueChang($event.target.value)"
          @focus="$store.commit('changePadType')"
          placeholder="在这里输入备注">
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
      this.$store.commit('changePadType')
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

    input {
      padding: 16px;
      background: transparent;
      border: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>