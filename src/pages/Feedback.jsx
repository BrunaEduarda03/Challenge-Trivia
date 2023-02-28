import { number } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';

class Feedback extends React.Component {
  componentDidMount() {
    const {
      player: { name, score, gravatarEmail },
    } = this.props;
    const existRanking = !!localStorage.getItem('ranking');
    const imgGravatar = md5(gravatarEmail).toString();
    if (!existRanking) {
      const obj = [
        {
          name,
          score,
          picture: imgGravatar,
        },
      ];
      localStorage.setItem('ranking', [JSON.stringify(obj)]);
    } else {
      const data = localStorage.getItem('ranking');
      localStorage.setItem(
        'ranking',
        JSON.stringify([
          ...JSON.parse(data),
          { name, score, picture: imgGravatar },
        ]),
      );
    }
  }

  render() {
    const { assertions, score } = this.props;
    const three = 3;
    return (
      <div className='flex flex-col w-[100vw] h-[100vh]'>
      <Header />
      <div className="bg-[url('Abstract-Wallpaper-4k.jpg')] bg-cover	w-[100vw] h-[100vh] flex flex-col items-center justify-center">
        <div className=" border-black border-2 bg-[#27224d] w-[80vw] h-[300px] rounded-3xl text-white flex flex-col items-center justify-center lg:w-[300px] lg:h-[300px]">
        <div className="flex flex-col w-[100%] h-[100%] pt-[15px]">
          {assertions < three ? (
            <p data-testid="feedback-text"
            className='font-bold text-2xl p-4'
            >Could be better...</p>
          ) : (
            <p data-testid="feedback-text"
            className='font-bold text-2xl p-4'
            >Well Done!</p>
          )}
          <p data-testid="feedback-total-score"
          className='font-bold italic bg-purple-500 py-4 text-3xl'
          >{score} pontos</p>
           <p data-testid="feedback-total-question"
          className='p-1 text-xl my-3'
          >{assertions} de 5 <br/>acertos</p>
          <div className="flex items-center justify-center border-t-2 border-[#fafafa] rounded-br-3xl rounded-bl-3xl h-[100%]">
            <Link to="/" className=' hover:bg-[#fafafa] hover:text-[#27224d] h-[100%] w-[100%] flex rounded-bl-3xl items-center justify-center'>
              <button type="button" data-testid="btn-play-again"
              className='w-[100%] hover:bg-red'
              >
                Play Again
              </button>
            </Link>
            <hr className='w-[2px] h-[100%] bg-[#fafafa]'/>
            <Link to="/ranking" className=' hover:bg-[#fafafa] hover:text-[#27224d] w-[100%] h-[100%] rounded-br-3xl flex items-center justify-center'>
              <button type="button" data-testid="btn-ranking"
              className='w-[100%]'
              >
                Ranking
              </button>
            </Link>
            </div>
        </div>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  player: state.player,
});

Feedback.propTypes = {
  assertions: number,
  score: number,
}.isRequired;

export default connect(mapStateToProps, null)(Feedback);
