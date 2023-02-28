import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Feedback from '../pages/Feedback';

const INITIAL_STATE_1 = {
  player: {
    name: 'teste',
    assertions: 3,
    score: 0,
    gravatarEmail: 'teste@trybe.com',
  },

};

describe('Testa a página de feedback', () => {
  it('Verifica se os componentes estão renderizados na tela', () => {
    renderWithRouterAndRedux(<Feedback />);

    const feedbackMensage = screen.getByTestId('feedback-text');
    const feedbackScore = screen.getByTestId('feedback-total-score');
    const feedbackAssertions = screen.getByTestId('feedback-total-question');
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    const btnRanking = screen.getByTestId('btn-ranking');

    expect(feedbackMensage).toBeInTheDocument();
    expect(feedbackScore).toBeInTheDocument();
    expect(feedbackAssertions).toBeInTheDocument();
    expect(btnPlayAgain).toBeInTheDocument();
    expect(btnRanking).toBeInTheDocument();
  });
  it('Verifica se informações estão sendo renderizadas correntamente', () => {
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE_1);
    const feedbackMensage = screen.getByTestId('feedback-text');
    expect(feedbackMensage).toHaveTextContent(/Well Done!/i);
  });
});
