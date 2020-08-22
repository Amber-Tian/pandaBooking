<template>
  <Layout>
    <Logo/>
    <div class="types">
      <Types :type.sync="type"/>
    </div>
    <div>
      <ul v-if="resultList.length">
        <li v-for="(item, index) in resultList" :key="index">
          <h3 class="title">{{beautifyTime(item.title)}} <span>￥{{totalMoney(item.item)}}</span></h3>
          <ul>
            <li class="record" v-for="(value, index2) in item.item" :key="index2">
              <span>{{showTagName(value.selectedTags)}}</span>
              <span class="notes">{{value.notes}}</span>
              <span class="time">{{showDetailTime(value.createdAt)}}</span>
              <span class="money">￥{{value.amount}}</span>
              <span class="delete">删除</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="noResult" v-else>
        目前没有相关记录
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Types from '@/components/Types.vue';
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Logo from '@/components/Logo.vue';

  @Component({
    components: {Logo, Types}
  })
  export default class Statistic extends Vue {
    type = '-';

    totalMoney(item: RecordItem[]) {
      const amounts = item.map(i => i.amount);
      return amounts.reduce((total, i) => {
        return total + i;
      }, 0);
    }

    get recordList() {
      return this.$store.state.recordList;
    }

    get resultList() {
      const {recordList} = this;
      if (recordList.length === 0) {return [];}
      const newList = clone(recordList).filter((i: RecordItem) => i.type === this.type).sort((a: any, b: any) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) {return [];}
      const resultList = [{title: dayjs(newList[0].createdAt).format('YYYY年M月D日'), item: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const last = resultList[resultList.length - 1];
        // if (dayjs(last.title).isSame(dayjs(newList[i].createdAt), 'day')) {
        if (last.title === dayjs(newList[i].createdAt).format('YYYY年M月D日')) {
          last.item.push(newList[i]);
        } else {
          resultList.push({title: dayjs(newList[i].createdAt).format('YYYY年M月D日'), item: [newList[i]]});
        }
      }
      return resultList;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    showTagName(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(item => item.name).join('&');
    }

    showDetailTime(time: string) {
      if (dayjs(time).hour()) {
        return dayjs(time).format('H:mm:ss');
      }
    }

    beautifyTime(string: string) {
      const now = dayjs().format('YYYY年M月D日');
      const beforeOneDay = dayjs().subtract(1, 'day').format('YYYY年M月D日');
      const beforeTwoDay = dayjs().subtract(2, 'day').format('YYYY年M月D日');

      if (now === string) {
        return '今天';
      } else if (beforeOneDay === string) {
        return '昨天';
      } else if (beforeTwoDay === string) {
        return '前天';
      } else if (dayjs().year().toString() === string.substring(0, 4)) {
        return string.substring(5);
      } else {
        return string;
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";

  .noResult {
    padding: 16px;
    text-align: center;
  }

  .types ::v-deep li {
    background-color: #f5f5f5;

    &.selected {
      background-color: #fff;
    }
  }

  %item {
    padding: 0 16px;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .title {
    @extend %item;
  }

  .record {
    @extend %item;
    background-color: #fff;
    overflow: hidden;

    &:not(:last-child) {
      border-bottom: 1px dashed #ccc;
    }

    > .delete {
      color: #FF4D4F;
      padding-left: 16px;
      margin-right: -66px;
      border-left: 1px dashed #ccc;
    }

    > .notes {
      margin-right: auto;
      margin-left: 16px;
      color: #999;
    }

    > .time {
      margin-left: auto;
      margin-right: 16px;
      color: #999;
    }

    > .money {
      padding-right: 16px;
    }
  }
</style>