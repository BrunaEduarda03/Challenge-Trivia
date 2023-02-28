import React, { Component } from 'react'
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { setScore, updateAssertions } from '../Redux/actions';
import TimerContext from '../context/timerContext';

class Timer extends Component {
  // state={
  //   timer:30
  // }

  // componentDidMount(){
  //   this.countDown();
  // }

  // reset = () => {
  //   this.setState({timer:30})
  // }

  // componentWillUnmount() {
  //   this.handleScore()
  // }

  // countDown = () => {
  //   const oneSecond = 1000;
  //   this.interval = setInterval(() => {
  //     const { timer } = this.state;
  //     if (timer > 0) {
  //       this.setState((prev) => ({ timer: prev.timer - 1 }));
  //     }
  //     if (timer === 0) { 
  //       return this.stopTimer(); 
  //     }
  //   }, oneSecond);
  // };

  // stopTimer = () => {
  //   clearInterval(this.interval);
  // };

 


  render() {
    const {timer} = this.context;
    return (
      <>
      <h1 className='text-4xl lg:text-4xl text-[#0cd79b] font-bold p-5'>{timer}</h1>
      </>
    )
  }
}

Timer.contextType = TimerContext;

const mapDispatchToProps = (dispatch) => ({
  updateAssertionsDispatch: () => dispatch(updateAssertions()),
  setScoreDispatch: (state) => dispatch(setScore(state)),
});

Timer.propTypes = {
  updateAssertionsDispatch: string,
}.isRequired;

export default connect(null,mapDispatchToProps)(Timer)


