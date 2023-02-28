import React, { Component } from 'react';
import { shape, func } from 'prop-types';
import * as S from './questionsStyle'
import '../App.css';

export default class Questions extends Component {
  state = {
    /* shuffleArray: [], */
  }

  /*   componentDidMount() {
    // const { shuffleArray } = this.state; const { questions, handleAnswers, isClicked, currentQuestion, disabled } = this.props;
    this.shuffle();
  } */

  /*  shuffle = () => {
    const { questions, currentQuestion } = this.props;
    const range = 0.5;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;
    const correctAnswer = questions[currentQuestion].correct_answer;
    const allAnswers = [...incorrectAnswers, correctAnswer];
    const shuffleArray = allAnswers.sort(() => Math.random() - range);
    this.setState({ shuffleArray });
  } */

  shouldComponentUpdate(nextProps){
    const {currentQuestion, disabled} = this.props;
    return (nextProps.currentQuestion !== currentQuestion 
      || nextProps.disabled !== disabled );
  }
  
  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  // handleClick = (e) => {
  //   const {handleAnswers } = this.props;
  //   handleAnswers(e)
  //   this.color(e)
  // }
  // color = ({target}) => {
  //   const {questions,currentQuestion } = this.props;
  //   const correctAnswer = questions[currentQuestion].correct_answer;
  //   const allBtns = document.querySelectorAll('.answer')
  //   allBtns.forEach(element => {
  //     if(target.innerHTML === correctAnswer && element.innerHTML === target.innerHTML){
  //       element.classList.add('green-border');
  //       console.log(element.classList);
  //       console.log('certo');
  //     }else if(target.innerHTML === element.innerHTML){
  //       element.classList.add('red-border');
  //       console.log('errado');
  //     }
  //   })
  //   // if (!isClicked) return '';
  //   // if (target.value === correctAnswer) {
  //   //   return 'green-border';
  //   // }else{  
  //   //   allBtns.forEach(e => {
  //   //     if(e.value === correctAnswer) e.classList.add('green-border')
  //   //   })
  //   // }
 
  // };


  render() {
    const {
      questions, disabled, currentQuestion, isClicked, shuffleArray,handleAnswers,
    } = this.props;
    // const { shuffleArray } = this.state;
    // const range = 0.5;
    const incorrectAnswers = questions[currentQuestion].incorrect_answers;
    const correctAnswer = questions[currentQuestion].correct_answer;
    const categoryQuestions = questions[currentQuestion].category;
    const currQuestion = questions[currentQuestion].question;
    //  const allAnswers = [...incorrectAnswers, correctAnswer];
    console.log(correctAnswer);
    // const shuffleArray = allAnswers.sort(() => Math.random() - range);
    console.log(shuffleArray);
    return (
      <div className='bg-[#0a0d35]'>
        <h2 className="p-2 lg:text-2xl" data-testid="question-category" >
          {categoryQuestions}
        </h2>
        <h3 data-testid="question-text" className='p-5 lg:text-3xl'>
          {this.decodeEntity(currQuestion)}
        </h3>
        <div className="bg-white p-5 rounded-3xl text-black flex flex-col gap-5 w-[90vw] lg:w-[1000px] mx-auto" data-testid="answer-options">
          {shuffleArray.map((answer) => 
            answer === correctAnswer ? 
            (
              <S.CorrectAnswer 
                key={ Math.random() }
                type="button"
                className='correct-answer lg:text-3'
                data-testid='correct-answer' 
                onClick={ (e) => {
                  handleAnswers(e)
                  e.target.style.backgroundColor='green'
                } }
                disabled={ disabled }
                isClicked={isClicked}
                > 
                {this.decodeEntity(answer)}
              </S.CorrectAnswer>
            ) : (
              <S.WrongAnswer 
              key={ Math.random() }
              type="button"
              className='lg:text-3'
              data-testid={
                answer === correctAnswer
                  ? 'correct-answer'
                  : `wrong-answer-${incorrectAnswers.indexOf(answer)}`
              }
              onClick={ (e) => {
                handleAnswers(e)
                console.log(e.target);
                e.target.style.backgroundColor = 'red';
                document.querySelector('.correct-answer').style.backgroundColor='green'
                
              } }
              disabled={ disabled }
              >
                {this.decodeEntity(answer)}
              </S.WrongAnswer>
            )
          )}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: shape,
  changeQuestion: func,
}.isRequired;
