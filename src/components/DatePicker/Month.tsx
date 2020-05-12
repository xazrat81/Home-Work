import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Week from './Week'

import styles from './Month.css?module'
import { IMonth } from '@/models/Month.model';
import { IWeek } from '@/models/Week.model';
import { IDay } from '@/models/Day.model';

interface Props {
    currentDate: Date | undefined
    currentMonth: IMonth | undefined
    currentYear: number | undefined
    defaultWeek: IWeek[]
}

@Component
export default class Month extends VueComponent<Props> {

    @Prop() 
    private currentDate!: Date
    @Prop() 
    private currentMonth!: IMonth
    @Prop() 
    private currentYear!: number
    @Prop() 
    private defaultWeek!: IWeek[]

    public get daysInMonth(): number {
        return 32 - new Date(this.currentYear, this.currentMonth.order, 32).getDate()
    }

    public get weeksInMonth(): any[] {

        let result: any[] = []
        let countWeeks: number = 0
        let countDays: number = 0
        result.push([])
        
        for(let i: number = 0; i < this.daysInMonth; i++) {
            
            result[countWeeks].push({ 
                get dayOfWeek() {
                    return this.dateString.getDay()
                },
                dateString: new Date(this.currentYear, this.currentMonth.order, i+1),
                get dateNumber() {
                    return this.dateString.getDate()
                }
            })

            if(result[countWeeks][countDays].dayOfWeek === 0) {
                if(countWeeks === 0) {
                    while(result[countWeeks].length < 7) {
                        result[countWeeks].unshift({ dateString: new Date() })
                    }
                }
                countWeeks++
                result.push([])
                countDays = 0
            } else {
                countDays++
            }
        }
        return result
    }

    onDateSelect(day: IDay) {
        this.$emit('date-selected', day)
    }

    render() {
        return (
            <div class={styles.table_wrapper}>
                <div class={styles.table_header}>
                    {this.currentMonth.name} {this.currentYear}
                </div>
                <table>
                    <thead>
                        <tr>
                            { this.defaultWeek.map(day => {
                                return (
                                    <th>{ day.name }</th>
                                )
                            }) }
                        </tr>
                    </thead>
                    <tbody>
                        { this.weeksInMonth.map((week: any, index: number) => {
                            return (
                                <Week 
                                    currentDate={this.currentDate}
                                    weekArray={week}
                                    weekOrder={index + 1}
                                    defaultWeek={this.defaultWeek}
                                    daysInMonth={this.daysInMonth}
                                    on-date-selected={this.onDateSelect}
                                />
                            )
                        }) }
                    </tbody>
                </table>
            </div>
        )
    }
}
