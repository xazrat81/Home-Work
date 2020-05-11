import { Component, Prop, Vue } from 'vue-property-decorator';
import { VueComponent } from '@/shims-vue';
import Month from './Month'
import { IMonth } from '@/models/Month.model'
import { IWeek } from '@/models/Week.model';

import styles from './DatePicker.css?module'

interface Props {
  
}

@Component
export default class DatePicker extends VueComponent<Props> {

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

  public currentDate: Date = new Date()

  get currentMonth() {
    return this.months.find(month => month.order === this.currentDate.getMonth())
  }

  get currentYear() {
    return this.currentDate.getFullYear()
  }


  render() {
    return (
      <div class={styles.wrapper}>
        <Month 
          currentMonth={this.currentMonth}
          currentYear={this.currentYear}
          defaultWeek={this.defaultWeek}
        />
      </div>
    )
  }
}
