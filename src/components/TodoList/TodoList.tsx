import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Todo from './Todo'
import { mapGetters } from 'vuex'

import styles from './TodoList.css?module'
import { ITodo } from '@/models/Todo.model';

interface Props {
  currentDate: Date
}

@Component({
  computed: {
    ...mapGetters({
      todos: 'allTodos'
    })
  }
})
export default class TodoList extends VueComponent<Props> {

  @Prop()
  private currentDate!: Date

  public todosByDate: ITodo[] = []
  public inputValue: string = ''
  public completed: boolean = false
  public todos!: ITodo[]

  @Watch('currentDate')
  handleDateChange() {
    this.todosByDate = this.todos.filter((todo: ITodo) => {
      return new Date(todo.date).getFullYear() === new Date(this.currentDate).getFullYear() &&
      new Date(todo.date).getMonth() === new Date(this.currentDate).getMonth() &&
      new Date(todo.date).getDate() === new Date(this.currentDate).getDate()
    })
  }
  @Watch('todos')
  handleTodosChange() {
    this.handleDateChange()
  }

  handleInput(event: any) {
    this.inputValue = event.target.value
  }

  handleCheckboxChange(event: any) {
    event.target.checked ? this.completed = true : this.completed = false
  }

  addTodo(event: any) {
    if(event.key === 'Enter') {
      this.$store.dispatch('onTodoAdded', {
        currentDate: this.currentDate,
        inputValue: this.inputValue,
        todos: this.todos
      })
      event.target.value = ''
    }
  }

  mounted() {
    console.log(this.todos)
    this.handleDateChange()
  }

  render() {
    return (
      <div class={styles.todolist}>
        <div class={styles.todolist_header}>
          События
        </div>
        <div>
          <input 
            type="checkbox" 
            id="complete" 
            class={styles.checkbox_complete} 
            onChange={this.handleCheckboxChange}
          />
          <label for="complete" class={styles.checkbox_label}>
            Выполнить задание
          </label>
          <div class={styles.todo_input_wrapper}>
            <input 
              type="text" 
              class={styles.todo_input} 
              placeholder="Текст" 
              onInput={this.handleInput}
              onKeyup={this.addTodo}
            />
          </div>
        </div>
        <div>
          { this.todosByDate.map((todo: ITodo) => {
            return (
              <Todo todo={todo} completed={this.completed} />
            )
          }) }
        </div>
      </div>
    )
  }
}
