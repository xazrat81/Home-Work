import { Component, Prop, Vue } from 'vue-property-decorator'
import { VueComponent } from '@/shims-vue'
import { IWeek } from '@/models/Week.model'
import { IDay } from '@/models/Day.model'
import Day from './Day'

interface Props {
    currentDate: Date | undefined
    weekArray: IDay | undefined
    defaultWeek: IWeek[] | undefined
    daysInMonth: number,
    weekOrder: number
}

@Component
export default class Week extends VueComponent<Props> {

    @Prop()
    private currentDate!: Date
    @Prop() 
    private weekArray!: any[]
    @Prop() 
    private defaultWeek!: IWeek[]
    @Prop() 
    private daysInMonth!: number
    @Prop()
    private weekOrder!: number

    onDateSelect(day: IDay) {
        this.$emit('date-selected', day)
    }

    

    render() {
        return (
            <tr>
                { this.weekArray.map((day: IDay, index: number) => {
                    return (
                        <Day 
                            day={day} 
                            on-date-selected={this.onDateSelect}
                            currentDate={this.currentDate} 
                        />
                    )
                }) }
            </tr>
        )
    }
}