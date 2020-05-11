import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';

import styles from './TodoList.css?module'

interface Props {

}

@Component
export default class TodoList extends VueComponent<Props> {

  render() {
    return (
      <div class={styles.todolist_header}>
        События
      </div>
    )
  }
}
