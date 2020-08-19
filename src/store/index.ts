import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId';
import clone from '@/lib/clone';
import router from '@/router';

Vue.use(Vuex);

type RootState = {
  tagList: Tag[]
  recordList: RecordItem[]
  currentTag?: Tag
}
const store = new Vuex.Store({
  state: {
    tagList: [],
    recordList: [],
    currentTag: undefined
  } as RootState,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣')
        store.commit('createTag', '食')
        store.commit('createTag', '住')
        store.commit('createTag', '行')
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (name) {
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const id = createId().toString();
          state.tagList.push({id, name});
          store.commit('saveTags');
        }
      } else if (name === '') {
        window.alert('标签名不能为空');
      } else {return;}
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (id === state.tagList[i].id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
    },
    updateTag(state, payload: {id: string, name: string}) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const tag = state.tagList.filter(item => item.id === id)[0];
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0 && tag.name !== name) {
          window.alert('标签名重复')
        } else {
          tag.name = name;
          store.commit('saveTags');
          router.back();
        }
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    createRecord(state, record) {
      const record2 = clone(record);
      record2.createdAt = new Date();
      state.recordList.push(record2);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    }
  },
  actions: {},
  modules: {}
});

export default store;