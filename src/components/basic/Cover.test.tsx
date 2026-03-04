import { render, screen } from '@testing-library/react-native';
import Cover from './Cover';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: {
    expoConfig: { extra: { DEV_USE_DEVELOPMENT_BACKEND: false } },
  },
}));

jest.mock('redux', () => ({
  bindActionCreators: () => ({}),
}));

jest.mock('react-redux', () => ({
  connect: () => (Component) => Component,
}));

jest.mock('expo-image', () => ({
  Image: () => null,
}));

jest.mock('../../hooks/useRouterState', () => ({
  Link: ({ children }) => children,
}));

jest.mock('../../hooks/useDownloadProgress', () => () => 0);
jest.mock('../../hooks/useCoverHref', () => () => 'covers/book.jpg');
jest.mock('./CoverAndSpin', () => () => null);
jest.mock('./CoverCheck', () => () => null);

jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://api.example.com',
  getIDPOrigin: () => 'https://idp.example.com',
}));

const defaultProps = {
  bookId: 'book-1',
  bookInfo: {
    title: 'My Book Title',
    flags: [],
    downloadStatus: 0,
    accounts: { '1:user1': {} },
  },
  bookWidth: 100,
  bookHeight: 130,
  downloadProgressByBookId: {},
  idps: { '1': { domain: 'example.com' } },
};

describe('Cover Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<Cover {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the book title', () => {
    render(<Cover {...defaultProps} />);
    expect(screen.getByText('My Book Title')).toBeTruthy();
  });

  it('should render "Trial" badge when flags include trial', () => {
    render(
      <Cover
        {...defaultProps}
        bookInfo={{ ...defaultProps.bookInfo, flags: ['trial'] }}
      />,
    );
    expect(screen.getByText('Trial')).toBeTruthy();
  });
});
