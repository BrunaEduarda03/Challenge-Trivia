import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { number, shape, string } from 'prop-types';

class Header extends React.Component {
  render() {
    const {
      player: {  score, gravatarEmail },
    } = this.props;
    const imgGravatar = md5(gravatarEmail).toString();

    return (
      <header className='flex justify-around bg-[#0e1146] w-[100%] h-[40px] md:h-[80px] items-center'>
        <img
          data-testid="header-profile-picture"
          className='w-[20px] h-[20px] md:w-[40px] md:h-[40px]'
          src={ `https://www.gravatar.com/avatar/${imgGravatar}` }
          alt="gravatar profile"
        />
        <h2 data-testid="header-score" className='text-[#38b8d2] text-lg lg:text-2xl'>{score}</h2>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: shape({
    name: string,
    score: number,
    gravatarEmail: string,
  }),
}.isRequired;

export default connect(mapStateToProps, null)(Header);
