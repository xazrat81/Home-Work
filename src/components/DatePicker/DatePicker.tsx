import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Month from './Month'
import { IMonth } from '@/models/Month.model'
import { IWeek } from '@/models/Week.model';

import styles from './DatePicker.css?module'
import { IDay } from '@/models/Day.model';

interface Props {
  currentDate: Date | undefined
}

@Component
export default class DatePicker extends VueComponent<Props> {

  @Prop()
  private currentDate!: Date

  public months: IMonth[] = [
    { order: 0, name: 'Январь' },
    { order: 1, name: 'Февраль' },
    { order: 2, name: 'Март' },
    { order: 3, name: 'Апрель' },
    { order: 4, name: 'Май' },
    { order: 5, name: 'Июнь' },
    { order: 6, name: 'Июль' },
    { order: 7, name: 'Август' },
    { order: 8, name: 'Сентябрь' },
    { order: 9, name: 'Октябрь' },
    { order: 10, name: 'Ноябрь' },
    { order: 11, name: 'Декабрь' },
  ]

  public defaultWeek: IWeek[] = [
    { order: 1, name: 'Пн' },
    { order: 2, name: 'Вт' },
    { order: 3, name: 'Ср' },
    { order: 4, name: 'Чт' },
    { order: 5, name: 'Пт' },
    { order: 6, name: 'Сб' },
    { order: 0, name: 'Вс' }

  ]

  get currentMonth() {
    return this.months.find(month => month.order === this.currentDate.getMonth())
  }

  get currentYear() {
    return this.currentDate.getFullYear()
  }

  onDateSelect(day: IDay) {
    this.$emit('date-selected', day)
  }


  render() {
    return (
      <div class={styles.wrapper}>
        <Month 
          currentDate={this.currentDate}
          currentMonth={this.currentMonth}
          currentYear={this.currentYear}
          defaultWeek={this.defaultWeek}
          on-date-selected={this.onDateSelect}
        />
      </div>
    )
  }
}
