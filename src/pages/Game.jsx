import React from 'react';
import { string, func } from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Timer from '../components/Timer';
import Questions from '../components/Questions';
import { setScore, updateAssertions } from '../Redux/actions';
import TimerContext from '../context/timerContext';
import {HiArrowSmRight} from 'react-icons/hi'
class Game extends React.Component {
  state = {
    questions: [],
    loading: true,
    isClicked: false,
    currentQuestion: 0,
    disabled: false,
    shuffleArray: [],
  };

  componentDidMount() {
    const {countDown} = this.context;
    this.getData();
    countDown();
    // this.countDown();
  }

  // componentWillUnmount() {
  //   this.stopTimer();
  // }

  // stopTimer = () => {
  //   clearInterval(this.interval);
  //   this.setState({ disabled: true });
  // };

  // countDown = () => {
  //   const oneSecond = 1000;
  //   this.interval = setInterval(() => {
  //     const { timer } = this.state;
  //     if (timer > 0) {
  //       this.setState((prev) => ({ timer: prev.timer - 1 }));
  //     }
  //     if (timer === 0) { return this.stopTimer(); }
  //   }, oneSecond);
  // };

   handleScore = () => {
    const { timer} = this.context;
    const {questions,currentQuestion } = this.state
    const { setScoreDispatch } = this.props;
    const { difficulty } = questions[currentQuestion];
    const points = { base: 10, easy: 1, medium: 2, hard: 3 };
    const formula = points.base + timer * points[difficulty];
    setScoreDispatch({ score: formula });
  };

  handleAnswers = ({ target }) => {
    const { updateAssertionsDispatch } = this.props;
    const { questions, currentQuestion } = this.state;
    const {stopTimer} = this.context;
    const correctAnswer = questions[currentQuestion].correct_answer;
    stopTimer();
    this.setState({ isClicked: true,disabled:true });
    if (target.innerHTML === correctAnswer) {
      updateAssertionsDispatch();
      this.handleScore()
    }
    
    // console.log(correctAnswer);
    // const allBtns = document.querySelectorAll('.answer')
    // allBtns.forEach(element => {
    //   if(target.innerHTML === correctAnswer && element.innerHTML === target.innerHTML){
    //     // element.classList.add('green-border');
    //     console.log(element.classList);
    //     console.log('certo');
    //   }else if(target.innerHTML === element.innerHTML){
    //     // element.classList.add('red-border');
    //     console.log('errado');
    //   }})
  };

  handleNext = () => {
    const { history } = this.props;
    const {reset,countDown,stopTimer} = this.context;
    this.setState({loading:true})
    const five = 5;
    this.setState(
      (prev) => ({
        currentQuestion: prev.currentQuestion + 1,
        isClicked: false,
        disabled: false,
      }),
      () => {
        const { currentQuestion } = this.state;
        if (currentQuestion === five) {
          stopTimer();
          reset();
          history.push('/feedback');
        } else {
          this.setState({loading:false})
          reset();
          countDown();
          this.shuffle();

        }
      },
    );
  };

 
  getData = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const res = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await res.json();
    if (data.response_code === 0) {
      this.setState({ questions: [...data.results] });
      this.shuffle();
    } else {
      localStorage.removeItem('token');
      history.push('/');
    }
  };

  shuffle = () => {
    const { questions, currentQuestion } = this.state;
    const range = 0.5;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;
    const correctAnswer = questions[currentQuestion].correct_answer;
    const allAnswers = [...incorrectAnswers, correctAnswer];
    const shuffleArray = allAnswers.sort(() => Math.random() - range);
    this.setState({ shuffleArray },() => this.setState({ loading: false }));
  }

  render() {
    const four = 4;
    const {
      questions, loading, isClicked, currentQuestion, disabled, shuffleArray
    } = this.state;
    const {timer} = this.context
    return (
      <div className="h-[110vh] w-[100vw] bg-[#0a0d35] text-white">
      <Header />
      <Timer />
      <div className="p-3 font-bold text-lg">
        {loading && <p className='text-[#0cd79b] font-bold lg:text-4xl'>Carregando</p>}
        {!loading && currentQuestion <= four &&(
          <Questions
            questions={ questions }
            handleAnswers={ this.handleAnswers }
            isClicked={ isClicked }
            shuffleArray={ shuffleArray }
            currentQuestion={ currentQuestion }
            disabled={ timer === 0 ? true : false}
          />
        )}
        {(isClicked || timer === 0) && (
          <button
            type="button"
            className='mt-5 w-10 h-10 rounded-2xl mx-auto lg:w-[50px] lg:h-[50px] flex items-center justify-center bg-[#fafafa]'
            data-testid="btn-next"
            onClick={ this.handleNext }
          >
            <HiArrowSmRight size={30} color={'#191919'}/>
          </button>
        )}
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  updateAssertionsDispatch: () => dispatch(updateAssertions()),
  setScoreDispatch: (state) => dispatch(setScore(state)),
});

Game.propTypes = {
  history: func,
  updateAssertionsDispatch: string,
}.isRequired;

Game.contextType = TimerContext;

export default connect(mapStateToProps, mapDispatchToProps)(Game);
