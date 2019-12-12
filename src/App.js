import React, { Fragment, Component } from 'react';
import './App.css';
import Button from './components/Button';
import Log from './components/Log';
import timestamp from 'time-stamp';

const MIN_DELAY = 1000;
const MAX_DELAY = 10000;
const TIMESTAMP_FORMAT = 'HH:mm:ss YYYY/MM/DD';
const BUTTONS = [
  {name: 'button1', key: 'b1', title: 'Button 1'}, 
  {name: 'button2', key: 'b2', title: 'Button 2'}, 
  {name: 'button3', key: 'b3', title: 'Button 3'}
];

let stack = [];

class App extends Component {
  constructor () {
    super();
    this.state = {
      log: '',
      stack,
      step: 0,
    };
    this.baseState = this.state;
  }
  
  getDelay = () => {
    return Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY);
  }

  hasContinue = () => !!this.state.stack[this.state.step];
  
  writeLog = (taskObj) => {
    const { name, timeout, startStamp } = taskObj;
    const logMessage = `${timestamp(TIMESTAMP_FORMAT)}: ${name} was pressed with ${Math.floor(timeout/1000)}s timeout ${startStamp}`;
    this.setState({
      log: `${this.state.log}
      
      ${logMessage}`})
  }

  runTask = (taskObj) => {
    setTimeout(()=> {
      this.writeLog(taskObj);
      this.setState({ step: this.state.step + 1 });
      if (this.hasContinue()) this.run(this.state.step);
      else this.setState({running: false});
    }, taskObj.timeout);
  }

  run = (step) => {
    if (!this.state.running) this.setState({running: true});
    this.runTask(this.state.stack[step]);
  }

  fillTaskInfo(name) {
    return {
      name,
      timeout: this.getDelay(),
      startStamp: timestamp(TIMESTAMP_FORMAT),
    }
  } 
  
  onButtonClick = (event) => {
    const { name } = event.target;
    const obj = this.fillTaskInfo(name);
    stack.push(obj);
    this.setState({ stack });
    if (!this.state.running) this.run(this.state.step)
    console.log(name, stack);
  }

  resetApp = () => {
    this.setState(this.baseState);
  }
  
  render() {
    return (
      <div className="appHolder">
        { BUTTONS.map(button => 
          <Button 
            name={button.name}
            title={button.title}
            key={button.key} 
            action={this.onButtonClick}
          />) }
        <Log log={this.state.log}/>
        <Button name='reset' title="Reset" action={this.resetApp}/>
      </div>  
    )
  }
}

export default App;
