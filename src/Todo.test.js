import React from 'react';
import { render } from '@testing-library/react';
import Todo from './Todo';

// smoke test
it('renders without crashing', function () {
    render(<Todo id="1" task="feed dog" complete={false} />);
});

// snapshot test
it('matches snapshot when incomplete', function () {
    const { asFragment } = render(<Todo id="1" task="feed dog" complete={false} />);
    expect(asFragment()).toMatchSnapshot();
});

it('matches snapshot when complete', function () {
    const { asFragment } = render(<Todo id="1" task="feed dog" complete={true} />);
    expect(asFragment()).toMatchSnapshot();
});