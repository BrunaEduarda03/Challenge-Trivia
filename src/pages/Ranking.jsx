import React from 'react';
import { Link } from 'react-router-dom';
import {IoMdArrowRoundBack} from 'react-icons/io'
class Ranking extends React.Component {
  state = {
    ranking: [],
    firstThrees:[],
  };

  componentDidMount() {
    const existRanking = !!localStorage.getItem('ranking');
    if (existRanking) {
      const newArr = [...JSON.parse(localStorage.getItem('ranking'))];
      newArr.sort((a, b) => b.score - a.score);
      console.log(newArr);
      const firstThrees = newArr.splice(0,3);
      this.setState({ ranking: [...newArr],firstThrees });
      console.log(firstThrees);
    }
  }

  render() {
    const { ranking, firstThrees } = this.state;
    const existRanking = !!localStorage.getItem('ranking');
    return (
      <div className='w-[100%] h-[100vh] bg-[url("ranking-bg.jpg")] '>
        <div className="lg:w-[800px] lg:mx-auto h-[100%] glass-bg">
          <div className="">
            <Link to="/">
              <IoMdArrowRoundBack color='white' size={30} className='absolute left-5 top-10'/>
            </Link>
            <h1 data-testid="ranking-title" className='p-10 m-auto font-bold text-4xl text-white'>Ranking</h1>
          </div>
            {existRanking && (
              <div className="flex justify px-2 justify-between">
              {firstThrees.length>= 2 && (
                <div className="flex flex-col justify-end items-center">
                  <div className="">
                  <h1 className='p-2 font-bold text-2xl text-[#59cad8]'>2º</h1>
                  <img
                      src={ `https://www.gravatar.com/avatar/${firstThrees[1].imgGravatar}` }
                      alt=""
                      className='w-[90%] mx-auto rounded-3xl border-2 border-[#979696]'
                    />
                    <h1 className='font-bold text-white text-lg p-1 text-ellipsis overflow-hidden w-[100px]'>{firstThrees[1].name}</h1>
                  </div>
                  <h2 className='flex items-center justify-center italic border-2 rounded-2xl w-[60px] h-[30px] border-[#918f8f67] border-solid text-lg text-white'>
                      {firstThrees[1].score}
                  </h2>
                </div>)}
                {firstThrees.length>= 1 && (
                  <div className={firstThrees.length === 1 && 'm-auto'}>
                    <div className="">
                    <h1 className='p-2 font-bold text-3xl text-[#faac50]'>1º</h1>
                    <img
                        src={ `https://www.gravatar.com/avatar/${firstThrees[0].imgGravatar}` }
                        alt=""
                        className='mx-auto rounded-3xl border-2 border-[#979696]'
                      />
                      <h1 className='font-bold text-white text-2xl p-2 text-ellipsis overflow-hidden w-[100px]'>{firstThrees[0].name}</h1>
                    </div>
                    <h2 className='flex items-center justify-center italic border-2 rounded-2xl w-[60px] h-[30px] border-white border-solid text-lg text-white m-auto'>
                        {firstThrees[0].score}
                    </h2>
                  </div>)}
                {firstThrees.length>= 3 && (
              <div className="flex flex-col justify-end items-center">
                  <div className="">
                  <h1 className='p-2 font-bold text-2xl text-[#ee3788]'>3º</h1>
                  <img
                      src={ `https://www.gravatar.com/avatar/${firstThrees[2].imgGravatar}` }
                      alt=""
                      className='w-[90%] mx-auto rounded-3xl border-2 border-[#979696]'
                    />
                    <h1 className='font-bold text-white text-lg p-1 text-ellipsis overflow-hidden w-[100px]'>{firstThrees[2].name}</h1>
                  </div>
                  <h2 className='flex items-center justify-center italic border-2 rounded-2xl w-[60px] h-[30px] border-[#918f8f67] border-solid text-lg text-white'>{firstThrees[2].score}</h2>
                </div>)}
              </div>
            )}
            <div className="bg-white absolute bottom-0 w-[100%] lg:w-[800px] h-[35vh] overflow-scroll rounded-tr-3xl rounded-tl-3xl ">
            {existRanking && ranking.length >= 1 && (
                ranking.map((person, i) => (
                    <div className="border-solid p-2 border-2 flex items-center" key={ Math.random() }>
                      <p className='text-[#807c8a] absolute left-3 '>{i + 4}</p>
                      <div className="flex items-center justify-center ml-4">
                      <img
                        src={ `https://www.gravatar.com/avatar/${person.imgGravatar}` }
                        alt=""
                        className='w-[35px] mx-3 rounded-xl'
                      />
                      <p className='font-bold color-[#251b45]' data-testid={ `player-name-${i}` }>{person.name}</p>
                      </div>
                      <p className='right-3 font-light absolute border-[#918f8f67] border-2 rounded-2xl w-[60px] h-[30px] border-solid' data-testid={ `player-score-${i}` }>{person.score}</p>
                    </div>
                ))
            )}
            </div>
            {!existRanking && <p>Sem ranking</p>}
        </div>
      </div>
    );
  }
}

export default Ranking;
