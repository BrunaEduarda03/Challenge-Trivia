import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { func } from 'prop-types';
import { getToken } from '../Redux/actions';
import {BsFillPlayFill,BsFillTrophyFill} from 'react-icons/bs'
import {AiTwotoneSetting} from 'react-icons/ai'
class Login extends React.Component {
  state = {
    playerName: '',
    playerEmail: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(
      {
        [name]: value,
      },
      () => this.validateButton(),
    );
  };

  handleClick = async () => {
    const { tokenDispatch, history } = this.props;
    const { playerName, playerEmail } = this.state;
    await tokenDispatch({ playerName, playerEmail });
    history.push('/game');
  };

  validateButton = () => {
    const { playerName, playerEmail } = this.state;
    if (playerName.length > 1 && playerEmail.length > 1) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  };
//nao to conseguindo entrar na sala pelo cel
  render() {
    const { playerName, playerEmail, buttonDisabled } = this.state;

    return (
      <div className="bg-[url('bg-login.jpg')] bg-cover	w-[100vw] h-[100vh] flex justify-center items-center">
        <div className="border-[#303978] border-2 w-[80vw] lg:w-[900px] h-[600px] rounded-3xl glass-bg">
          <main className='flex flex-col h-[100%] justify-center'>
          {/* <h1 className="text-6xl p-4">Trivia</h1> */}
          <img src="logo.png" alt="" className='w-[80%] md:w-[220px] lg:w-[300px] mx-auto p-4'/>
          <form className='flex flex-col gap-5 '>
            <label htmlFor="playerName" className='flex items-center justify-center'>
              <input
                type="text"
                name="playerName"
                placeholder='Name'
                className='m-2 border-b-2 border-gray-500 p-2 text-white bg-transparent'
                data-testid="input-player-name"
                onChange={ this.handleChange }
                value={ playerName }
              />
            </label>
            <label htmlFor="playerEmail" className='flex items-center justify-center'>
              <input
                placeholder='Email'
                type="text"
                className='m-2 border-b-2 border-gray-500 p-2 text-white bg-transparent'
                name="playerEmail"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
                value={ playerEmail }
              />
            </label>
            <button
                type="button"
                data-testid="btn-play"
                className='w-14 h-10 bg-[#fe5353] rounded-lg mx-auto mt-3 flex items-center justify-center'
                onClick={ this.handleClick }
                disabled={ buttonDisabled }
              >
                <BsFillPlayFill size={28} color={'#fafafa'}/>
              </button>
            <div className="flex items-center justify-center gap-7">
            <button
                type="button"
                data-testid="btn-play"
                className='w-12 h-8 flex items-center justify-center bg-[#01de98] rounded-lg '
                onClick={ this.handleClick }
                disabled={ buttonDisabled }
              >
                <AiTwotoneSetting size={24} color={'#191919'}/>
              </button>
              <Link to="/ranking">
                <button type="button" data-testid="btn-settings"
                className='w-12 h-8 flex items-center justify-center bg-[#01de98] rounded-lg '
                >
                  <BsFillTrophyFill size={21}/>
                </button>
              </Link>
            </div>
        
          </form>
          </main>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenDispatch: (payload) => dispatch(getToken(payload)),
});

Login.propTypes = {
  tokenDispatch: func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
