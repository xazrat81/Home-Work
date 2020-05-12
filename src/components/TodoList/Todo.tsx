import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import styles from './Todo.css?module'
import { ITodo } from '@/models/Todo.model';

interface Props {
    todo: ITodo
    completed: boolean
}

@Component
export default class Todo extends VueComponent<Props> {

  @Prop()
  private todo!: ITodo
  @Prop()
  private completed!: boolean

  todoStyles: any[] = [styles.todo_block]

  @Watch('completed')
  completeTodo() {
        if(this.completed) {
            this.todoStyles.push(styles.completed)
        } else {
            this.todoStyles.splice(1)
        }
    }

  render() {
    return (
      <div class={this.todoStyles}>
          {this.todo.text}
      </div>
    )
  }
}
