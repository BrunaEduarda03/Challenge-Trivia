import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

const INPUT_PLAYER_NAME = 'input-player-name';
const INPUT_GRAVATAR_EMAIL = 'input-gravatar-email';

describe('Testa a página de Login', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });
  it('Verifica se o título trivia é renderizado na página', () => {
    const title = screen.getByRole('heading', { name: /trivia/i, level: 1 });
    expect(title).toBeInTheDocument();
  });
  it('Verifica se os inputs nome e e-mail estão renderizados na página', () => {
    const name = screen.getByTestId(INPUT_PLAYER_NAME);
    const email = screen.getByTestId(INPUT_GRAVATAR_EMAIL);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
  it('Verifica se os botões são renderizados na página', () => {
    const buttonPlay = screen.getByRole('button', { name: /play/i });
    const buttonSettings = screen.getByRole('button', { name: /configurações/i });

    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument();
  });
  it('Testa a validação da página', () => {
    const name = screen.getByTestId(INPUT_PLAYER_NAME);
    const email = screen.getByTestId(INPUT_GRAVATAR_EMAIL);
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, '');
    userEvent.type(email, 'teste1@trybe.com');
    expect(buttonPlay.disabled).toBeTruthy();

    /* userEvent.type(name, 'Bruna');
    userEvent.type(email, '{ selectall } ');
    expect(buttonPlay.disabled).toBeTruthy(); */

    userEvent.type(name, 'Bruna');
    userEvent.type(email, 'teste2@trybe.com');
    expect(buttonPlay.disabled).toBeFalsy();
  });
  it('Verifica se a pagina é redirecionada para /game ao clicar em Play', async () => {
    const name = screen.getByTestId(INPUT_PLAYER_NAME);
    const email = screen.getByTestId(INPUT_GRAVATAR_EMAIL);
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, 'Bruna');
    userEvent.type(email, 'teste@trybe.com');
    userEvent.click(buttonPlay);

    await waitFor(
      () => expect(screen.getByTestId('header-player-name')).toBeInTheDocument(),
      { timeout: 2000 },
    );
  });
});
