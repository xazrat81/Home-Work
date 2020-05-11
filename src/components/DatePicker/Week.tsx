import { Component, Prop, Vue } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import { IWeek } from '@/models/Week.model'
import { IDay } from '@/models/Day.model'
import Day from './Day'

interface Props {
    weekArray: IDay | undefined
    defaultWeek: IWeek[] | undefined
    daysInMonth: number,
    weekOrder: number
}

@Component
export default class Week extends VueComponent<Props> {

    @Prop() 
    private weekArray!: any[]
    @Prop() 
    private defaultWeek!: IWeek[]
    @Prop() 
    private daysInMonth!: number
    @Prop()
    private weekOrder!: number

    render() {
        return (
            <tr>
                { this.weekArray.map((day: IDay, index: number) => {
                    return (
                        <Day day={day} />
                    )
                }) }
            </tr>
        )
    }
}