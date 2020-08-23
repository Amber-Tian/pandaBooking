<template>
  <Layout class-prefix="layout">
    <div class="type-wrapper">
      <Types :type.sync="record.type"/>
    </div>
    <Tags :selected-tags.sync="record.selectedTags"/>
    <Notes :notes.sync="record.notes"/>
    <NumberPad :createdAt.sync="record.createdAt"
               ref="numberPad"
               :amount.sync="record.amount"
               @submit="saveRecord"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Tags.vue';
  import Notes from '@/components/Notes.vue';
  import Types from '@/components/Types.vue';
  import NumberPad from '@/components/NumberPad.vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';

  @Component({
    components: {NumberPad, Types, Notes, Tags}
  })
  export default class Money extends Vue {
    created() {
      this.$store.commit('fetchRecords');
      this.$store.commit('fetchTags');
    }

    get recordList() {
      return this.$store.state.recordList;
    }

    record: RecordItem = {
      selectedTags: [],
      notes: '',
      type: '-',
      amount: 0,
      createdAt: dayjs().toISOString()
    };

    saveRecord() {
      const continueSave = () => {
        this.$store.commit('createRecord', this.record);
        window.alert('记账完成');
        (this.$refs.numberPad as HTMLFormElement).clear();
        this.record.notes = '';
      };

      if (!this.record.selectedTags || this.record.selectedTags.length === 0) {
        if (window.confirm('未选标签继续吗？')) {
          continueSave();
        } else {return;}
      } else {
        continueSave();
      }
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
  }
</style>
<style lang="scss" scoped>
  .type-wrapper {
    width: 100%;
    position: absolute;
    top: 0;
  }
</style>