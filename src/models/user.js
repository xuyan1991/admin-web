import { query as queryUsers, queryCurrent, create as createUser, update as updateUser, deleteUser } from '@/services/user';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryUsers, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *create({ payload }, { call, put }) {
      const response = payload.id ? yield call(updateUser,payload) : yield call(createUser, payload);
      console.log(response.errorCode);
      if (response.errorCode === 0) {
        yield put({
          type:'fetch'
        });  
      }
    },
    *delete({ payload }, { call, put }) {
      const response = yield call(deleteUser, payload);
      console.log(response.errorCode)
      if (response.errorCode === 0) {
        yield put({
          type:'fetch'
        });  
      }
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.data,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
