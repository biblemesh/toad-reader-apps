import { render, fireEvent, screen } from '@testing-library/react-native';
import { TouchableWithoutFeedback } from 'react-native';
import HeaderSearch from './HeaderSearch';

jest.mock('../major/Search', () => () => null);
jest.mock('../../hooks/useWideMode', () => () => false);

const defaultProps = {
  bookId: 'book-1',
  toggleShowSearch: jest.fn(),
  idpId: '1',
  goTo: jest.fn(),
};

describe('HeaderSearch Component', () => {
  it('should return null when showSearch is false', () => {
    const { toJSON } = render(
      <HeaderSearch {...defaultProps} showSearch={false} />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should render without crashing when showSearch is true', () => {
    const { toJSON } = render(
      <HeaderSearch {...defaultProps} showSearch={true} />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should call toggleShowSearch when the backdrop is pressed', () => {
    const mockToggle = jest.fn();
    render(
      <HeaderSearch
        {...defaultProps}
        showSearch={true}
        toggleShowSearch={mockToggle}
      />,
    );

    fireEvent.press(screen.UNSAFE_getByType(TouchableWithoutFeedback));

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
