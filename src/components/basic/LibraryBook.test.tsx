import { render, fireEvent, screen, act } from '@testing-library/react-native';
import { Alert, TouchableOpacity } from 'react-native';
import useRouterState from '../../hooks/useRouterState';
import LibraryBook from './LibraryBook';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('../../redux/actions', () => ({
  removeFromBookDownloadQueue: jest.fn(),
  setDownloadStatus: jest.fn(),
  pushToBookDownloadQueue: jest.fn(),
  clearTocAndSpines: jest.fn(),
  clearUserDataExceptProgress: jest.fn(),
}));
jest.mock('../../hooks/useRouterState', () =>
  jest.fn(() => ({ historyPush: jest.fn() })),
);
jest.mock('../../utils/removeEpub', () => ({ removeEpub: jest.fn() }));
jest.mock('../../utils/analytics', () => ({ logEvent: jest.fn() }));
jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));

const defaultProps = {
  bookId: 'book-1',
  books: { 'book-1': { title: 'Book One', downloadStatus: 2 } },
  removeFromBookDownloadQueue: jest.fn(),
  setDownloadStatus: jest.fn(),
  pushToBookDownloadQueue: jest.fn(),
  clearTocAndSpines: jest.fn(),
  clearUserDataExceptProgress: jest.fn(),
};

describe('LibraryBook Component', () => {
  beforeEach(() => {
    jest.mocked(useRouterState).mockReturnValue({ historyPush: jest.fn() });
  });

  it('should render children inside a TouchableOpacity', () => {
    render(
      <LibraryBook {...defaultProps}>
        <></>
      </LibraryBook>,
    );
    expect(screen.UNSAFE_getByType(TouchableOpacity)).toBeTruthy();
  });

  it('should call historyPush when pressed and downloadStatus is 2', async () => {
    const mockHistoryPush = jest.fn();
    jest
      .mocked(useRouterState)
      .mockReturnValue({ historyPush: mockHistoryPush });

    render(
      <LibraryBook {...defaultProps}>
        <></>
      </LibraryBook>,
    );

    await act(async () => {
      fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));
    });

    expect(mockHistoryPush).toHaveBeenCalledWith('/book/book-1');
  });

  it('should call setDownloadStatus and pushToBookDownloadQueue when pressed and downloadStatus is 0', async () => {
    const mockSetDownloadStatus = jest.fn();
    const mockPush = jest.fn();

    render(
      <LibraryBook
        {...defaultProps}
        books={{ 'book-1': { title: 'Book One', downloadStatus: 0 } }}
        setDownloadStatus={mockSetDownloadStatus}
        pushToBookDownloadQueue={mockPush}
      >
        <></>
      </LibraryBook>,
    );

    await act(async () => {
      fireEvent.press(screen.UNSAFE_getByType(TouchableOpacity));
    });

    expect(mockSetDownloadStatus).toHaveBeenCalledWith({
      bookId: 'book-1',
      downloadStatus: 1,
    });
    expect(mockPush).toHaveBeenCalledWith({ bookId: 'book-1' });
  });

  it('should show an Alert on long press when downloadStatus is 2', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');

    render(
      <LibraryBook {...defaultProps}>
        <></>
      </LibraryBook>,
    );

    fireEvent(screen.UNSAFE_getByType(TouchableOpacity), 'longPress');

    expect(alertSpy).toHaveBeenCalledWith(
      'Remove from device',
      expect.any(String),
      expect.any(Array),
      expect.any(Object),
    );
  });
});
