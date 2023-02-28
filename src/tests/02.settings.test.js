import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Settings from '../pages/Setting';

describe('Testa a página de Configurações', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<Settings />);
  });
  it('Verifica se o título Configurações é renderizado na página', () => {
    const title = screen.getByRole('heading', { name: /configurações/i, level: 1 });
    expect(title).toBeInTheDocument();
  });
});
