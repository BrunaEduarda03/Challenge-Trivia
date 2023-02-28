import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';

const INITIAL_STATE = localStorage.setItem('ranking', JSON.stringify([{
  name: 'John Leonne',
  score: '70',
  picture: 'c8bb287653544f727fea1b7a429ed61e' },
{ name: 'Bruna',
  score: '100',
  picture: 'c9bb287653544f727fea1b7a429ed61e' }]));

/* afterEach(() => {
  jest.clearAllMocks();
}); */

afterEach(cleanup);

describe('Testa a página de ranking', () => {
  beforeEach(cleanup);
  it('Verifica se os componentes estão renderizados na tela', () => {
    renderWithRouterAndRedux(<Ranking />, INITIAL_STATE);

    const userName1 = screen.getByTestId('player-name-0');
    const userName2 = screen.getByTestId('player-name-1');
    const userScore1 = screen.getByTestId('player-score-0');
    const userScore2 = screen.getByTestId('player-score-1');
    const btnHome = screen.getByTestId('btn-go-home');

    expect(userName1).toBeInTheDocument();
    expect(userName2).toBeInTheDocument();
    expect(userScore1).toBeInTheDocument();
    expect(userScore2).toBeInTheDocument();
    expect(btnHome).toBeInTheDocument();
  });

  it('Verifica a ordem do ranking', () => {
    renderWithRouterAndRedux(<Ranking />, INITIAL_STATE);

    const userScore1 = screen.getByTestId('player-score-0');
    const userScore2 = screen.getByTestId('player-score-1');

    expect(userScore1.textContent).toBe('100');
    expect(userScore2.textContent).toBe('70');
  });

  it('Verifica se não possúi jogadores no ranking', () => {
    localStorage.removeItem('ranking');
    renderWithRouterAndRedux(<Ranking />);

    const NoRanking = screen.getByText(/sem ranking/i);
    expect(NoRanking).toBeInTheDocument();
  });
});
