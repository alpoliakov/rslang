import { render, screen } from '@testing-library/react';
import React from 'react';

import Footer from '../Footer';

describe('Footer', () => {
  test('render footer and check names of contributors', () => {
    render(<Footer />);

    expect(screen.getByText('@ya-mashnenko')).toBeInTheDocument();
    expect(screen.getByText('@alpoliakov')).toBeInTheDocument();
    expect(screen.getByText('@buiiz')).toBeInTheDocument();
    expect(screen.getByText('@w1r3d7')).toBeInTheDocument();
  });
});
