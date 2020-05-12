import Vue from 'vue'
import Vuex from 'vuex'
import { ITodo } from './models/Todo.model'

Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    onTodoAdded(ctx: any, data: any) {
      let result = data.todos

      result.push({
        id: Date.now(),
        date: data.currentDate,
        text: data.inputValue
      })
      ctx.commit('updateTodos', result)
    }
  },
  mutations: {
      updateTodos(state: any, todos: ITodo[]) {
          state.todos = todos
      }
  },
  state: {
      todos: [
          { id: 1, date: new Date(2020, 4, 1), text: 'Задание 1' },
          { id: 2, date: new Date(2020, 4, 3), text: 'Задание 2' },
          { id: 3, date: new Date(2020, 4, 5), text: 'Задание 3' },
          { id: 4, date: new Date(2020, 4, 10), text: 'Задание 4' },
          { id: 5, date: new Date(2020, 4, 12), text: 'Задание 5' }
      ]
  },
  getters: {
      allTodos(state: any): ITodo[] {
          return state.todos
      }
  }
})
