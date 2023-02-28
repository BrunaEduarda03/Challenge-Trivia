import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Game from '../pages/Game';
import { mockResponse, mockTrivia } from './mocks/index.js';
import App from '../App';

const CORRECT_ANSWERS = 'correct-answer';
const WRONG_ANSWERS = 'wrong-answer-0';
const INPUT_PLAYER_NAME = 'input-player-name';
const INPUT_GRAVATAR_EMAIL = 'input-gravatar-email';
const tempoMax = 34000;

afterEach(() => {
  jest.clearAllMocks();
});

describe('Testa a página de Game', () => {
  it('Verifica se informações estão sendo renderizadas correntamente', async () => {
    renderWithRouterAndRedux(<Game />);
    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const questionCategory = await screen.findByTestId('question-category');
    const questions = screen.getByTestId('question-text');
    const correctAnswer = screen.getByTestId(CORRECT_ANSWERS);
    const wrongAnswer1 = screen.getByTestId('wrong-answer-0');
    const wrongAnswer2 = screen.getByTestId('wrong-answer-1');
    const wrongAnswer3 = screen.getByTestId('wrong-answer-2');

    expect(questionCategory).toBeInTheDocument();
    expect(questions).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    expect(wrongAnswer1).toBeInTheDocument();
    expect(wrongAnswer2).toBeInTheDocument();
    expect(wrongAnswer3).toBeInTheDocument();
  });

  it('Verifica se o botão next vai para proxima pergunta até ser direcionado a página feedback', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));

    const name = screen.getByTestId(INPUT_PLAYER_NAME);
    const email = screen.getByTestId(INPUT_GRAVATAR_EMAIL);
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    userEvent.type(name, 'Bruna');
    userEvent.type(email, 'teste@trybe.com');
    userEvent.click(buttonPlay);

    expect(global.fetch).toHaveBeenCalled();

    const correctAnswer1 = await screen.findByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer1);
    const btnNext1 = screen.getByTestId('btn-next');
    expect(btnNext1).toBeInTheDocument();
    userEvent.click(btnNext1);
    const questionCategory = screen.getByTestId('question-category');
    expect(questionCategory.textContent).toBe('Entertainment: musics');

    const correctAnswer2 = await screen.findByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer2);
    const btnNext2 = screen.getByTestId('btn-next');
    expect(btnNext2).toBeInTheDocument();
    userEvent.click(btnNext2);

    const correctAnswer3 = await screen.findByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer3);
    const btnNext3 = screen.getByTestId('btn-next');
    expect(btnNext3).toBeInTheDocument();
    userEvent.click(btnNext3);

    const correctAnswer4 = await screen.findByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer4);
    const btnNext4 = screen.getByTestId('btn-next');
    expect(btnNext4).toBeInTheDocument();
    userEvent.click(btnNext4);

    const correctAnswer5 = await screen.findByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer5);
    const btnNext5 = screen.getByTestId('btn-next');
    expect(btnNext5).toBeInTheDocument();
    userEvent.click(btnNext5);

    expect(history.location.pathname).toBe('/feedback');
    expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
  });

  it('Verifica se a cor correta do botão é chamada', async () => {
    renderWithRouterAndRedux(<Game />);

    expect(global.fetch).toHaveBeenCalled();

    const correctAnswer = await screen.findByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer);

    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));

    expect(screen.getByTestId(CORRECT_ANSWERS).getAttribute('class')).toMatch(
      'green-border',
    );

    expect(screen.getByTestId(WRONG_ANSWERS).getAttribute('class')).toMatch(
      'red-border',
    );
  });

  it('Verifica se o timer funciona como o esperado', async () => {
    const dois = 2000;

    renderWithRouterAndRedux(<Game />);

    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));

    let countDown = await screen.findByText(/30/i);
    expect(countDown).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, dois));

    countDown = await screen.findByText(/28/i);
    expect(countDown).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, dois));

    countDown = await screen.findByText(/26/i);
    expect(countDown).toBeInTheDocument();
  });

  it('Verifica se a função stopTimer é chamada', async () => {
    const dois = 2000;

    renderWithRouterAndRedux(<Game />);

    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));

    let countDown = await screen.findByText(/30/i);
    expect(countDown).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, dois));

    countDown = await screen.findByText(/28/i);
    expect(countDown).toBeInTheDocument();

    const correctAnswer = screen.getByTestId(CORRECT_ANSWERS);
    userEvent.click(correctAnswer);

    await new Promise((r) => setTimeout(r, dois));

    countDown = await screen.findByText(/28/i);
    expect(countDown).toBeInTheDocument();
  });

  it('desabilita botão ao clicar na resposta de alguma questão', async () => {
    renderWithRouterAndRedux(<Game />);

    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));

    const correctAnswer = await screen.findByTestId('correct-answer');
    userEvent.click(correctAnswer);

    const wrongAnswer = screen.getByTestId(WRONG_ANSWERS);
    expect(wrongAnswer).toBeDisabled();
  });

  it('testando Stop Timer', async () => {
    const tempoTimerMax = 32000;

    localStorage.setItem(
      'token',
      '8da7e7fcb629ad37a2cc96d4d993c42c1756fd63531c719ef71dc7059b83b5d0',
    );

    renderWithRouterAndRedux(<App />, {}, '/game');

    global.fetch = jest.fn(async () => ({
      json: async () => mockTrivia,
    }));
    const countDown1 = await screen.getByRole('heading', {
      name: /30/i,
      level: 1,
    });
    expect(countDown1).toBeInTheDocument();

    let countDown = await screen.findByText(/30/i);
    expect(countDown).toBeInTheDocument();

    await new Promise((r) => setTimeout(r, tempoTimerMax));

    countDown = await screen.getByRole('heading', { name: '0', level: 1 });
    expect(countDown).toBeInTheDocument();

    await waitFor(
      () => expect(
        screen.getByRole('heading', { name: '0', level: 1 }),
      ).toBeInTheDocument(),
      { timeout: tempoTimerMax },
    );
    localStorage.removeItem('token');
  },
  tempoMax);

  it('validando token invalido', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const name = screen.getByTestId(INPUT_PLAYER_NAME);
    const email = screen.getByTestId(INPUT_GRAVATAR_EMAIL);
    const buttonPlay = screen.getByRole('button', { name: /play/i });

    const api = Promise.resolve({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });

    const mockAPI = jest.spyOn(global, 'fetch').mockImplementation(() => api);

    userEvent.type(name, 'Bruna');
    userEvent.type(email, 'teste@trybe.com');
    userEvent.click(buttonPlay);

    expect(history.location.pathname).toBe('/');
    expect(mockAPI).toHaveBeenCalled();
  });
});
