import { Component, Vue } from 'vue-property-decorator';
import DatePicker from './components/DatePicker/DatePicker';

import './App.css'
import TodoList from './components/TodoList/TodoList';

@Component
export default class App extends Vue {
  render() {
    return (
      <div id="app">
        {/* <img alt="Vue logo" src={require('./assets/logo.png')} /> */}
        <DatePicker />
        <TodoList />
      </div>
    )
  }
}
