import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import { IDay } from '@/models/Day.model'

import styles from './Day.css?module'
import { mapGetters } from 'vuex'
import { ITodo } from '@/models/Todo.model'

interface Props {
    currentDate: Date | undefined
    day: IDay
}

@Component({
    computed: {
        ...mapGetters({
          todos: 'allTodos'
        })
      }
})
export default class Day extends VueComponent<Props> {

    @Prop()
    private currentDate!: Date
    @Prop()
    private day!: IDay

    public todos!: ITodo[]
    public cellStyles: any[] = [styles.cell_content, styles.hoverable]

    @Watch('currentDate')
    markDate() {
        if(this.currentDate.getDate() === new Date(this.day.dateString).getDate()) {
            this.cellStyles = [styles.cell_content, styles.hoverable, styles.selected]
        } 
        else if(this.todos.some((todo: ITodo) => {
            return todo.date.getDate() === this.day.dateString.getDate()
        })) {
            this.cellStyles = [styles.cell_content, styles.hoverable, styles.has_todos]
        } else {
            this.cellStyles = [styles.cell_content, styles.hoverable]
        }
    }

    onDateSelect() {
        this.$emit('date-selected', this.day)
    }

    mounted() {
        this.markDate()
    }

    render() {
        if(this.day.dateNumber) {
            return (
                <td class={styles.cell} onclick={this.onDateSelect}>
                    <div class={this.cellStyles}>
                        {this.day.dateNumber}
                    </div>
                </td>
            )
        } else {
            return (
                <td class={styles.cell}>
                    <div class={styles.cell_content}>
                        {this.day.dateNumber}
                    </div>
                </td>
            )
        }
        
    }
}