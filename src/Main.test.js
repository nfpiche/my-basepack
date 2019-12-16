import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

describe('<Main />', () => {
  it('renders a message', () => {
    const { getByTestId } = render(<Main />);

    expect(getByTestId('hello-world')).toBeInTheDocument();
  });
});
