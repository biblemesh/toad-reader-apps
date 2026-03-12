import { render, screen, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { openURL } from '../../utils/toolbox';
import BookPageMessage from './BookPageMessage';

jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
}));

jest.mock('../../utils/toolbox', () => ({
  openURL: jest.fn(),
}));

describe('BookPageMessage Component', () => {
  it('should render the text message', () => {
    render(<BookPageMessage text="Some message" />);
    expect(screen.getByText('Some message')).toBeTruthy();
  });

  it('should show an alert when pressed with moreInfoText', () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    render(<BookPageMessage text="Info" moreInfoText="More details" />);
    fireEvent.press(screen.getByText('Info'));

    expect(alertSpy).toHaveBeenCalledWith('Info', 'More details');
    alertSpy.mockRestore();
  });

  it('should call openURL when pressed with externalHref', () => {
    render(
      <BookPageMessage text="Visit site" externalHref="https://example.com" />,
    );
    fireEvent.press(screen.getByText('Visit site'));

    expect(jest.mocked(openURL)).toHaveBeenCalledWith(
      expect.objectContaining({ url: 'https://example.com' }),
    );
  });
});
