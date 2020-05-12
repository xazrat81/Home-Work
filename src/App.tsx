import { Component, Vue } from 'vue-property-decorator';
import DatePicker from './components/DatePicker/DatePicker';

import './App.css'
import TodoList from './components/TodoList/TodoList';
import { IDay } from './models/Day.model';

@Component
export default class App extends Vue {

  currentDate: Date = new Date()

  selectDate(day: IDay) {
    this.currentDate = new Date(day.dateString)
  }

  render() {
    return (
      <div id="app">
        {/* <img alt="Vue logo" src={require('./assets/logo.png')} /> */}
        <DatePicker 
          currentDate={this.currentDate}
          on-date-selected={this.selectDate} 
        />
        <TodoList currentDate={this.currentDate} />
      </div>
    )
  }
}
