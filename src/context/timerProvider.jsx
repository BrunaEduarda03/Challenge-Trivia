import React, { Component } from 'react'
import TimerContext from './timerContext'

export default class timerProvider extends Component {
  state = {
    timer:30
  }

  componentDidMount(){
    // this.countDown();
  }

  reset = () => {
    this.setState({timer:30})
  }

  componentWillUnmount() {
    this.handleScore()
  }

  countDown = () => {
    const oneSecond = 1000;
    this.interval = setInterval(() => {
      const { timer } = this.state;
      if (timer > 0) {
        this.setState((prev) => ({ timer: prev.timer - 1 }));
      }
      if (timer === 0) { 
        return this.stopTimer(); 
      }
    }, oneSecond);
  };

  stopTimer = () => {
    clearInterval(this.interval);
  };

  render() {
    const contextValue = {
      timer : this.state.timer,
      stopTimer: this.stopTimer,
      reset:this.reset,
      countDown:this.countDown,
    }
    const {children} = this.props
    console.log(contextValue);
    return (
      <TimerContext.Provider value={contextValue}>
        {children}
      </TimerContext.Provider>
    )
  }
}

