import { Component, Prop, Vue } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import { IDay } from '@/models/Day.model'

import styles from './Day.css?module'

interface Props {
    day: IDay
}

@Component
export default class Day extends VueComponent<Props> {

    @Prop()
    private day!: any

    render() {
        if(this.day.dateNumber) {
            return (
                <td class={styles.cell}>
                    <div class={[styles.cell_content, styles.hoverable]}>
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