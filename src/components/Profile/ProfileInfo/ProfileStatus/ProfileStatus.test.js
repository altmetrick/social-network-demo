import ProfileStatus from './ProfileStatus';

import { fireEvent, getByRole, render, screen } from '@testing-library/react';

describe('ProfileStates', () => {
  test('render ProfileStatus', () => {
    render(<ProfileStatus userStatus={'hello world'} />);

    expect(screen.getByText(/hello/)).toBeInTheDocument();
  });

  test('after click on status should be textarea', () => {
    render(<ProfileStatus userStatus="My new status" isOwner={true} />);

    screen.debug();

    expect(screen.queryByRole('textbox')).toBeNull();

    fireEvent.click(screen.getByText('My new status'));

    expect(screen.queryByRole('textbox')).toBeInTheDocument();
    screen.debug();

    fireEvent.change(screen.queryByRole('textbox'), {
      target: { value: 'Status changed by fire event' },
    });

    screen.debug();
  });
});
