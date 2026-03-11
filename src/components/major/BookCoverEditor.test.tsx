import { render } from '@testing-library/react-native';
import BookCoverEditor from './BookCoverEditor';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('expo-image', () => ({ Image: () => null }));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://test.example.com',
  getIDPOrigin: () => 'https://test.example.com',
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
}));
jest.mock('../basic/Icon', () => () => null);
jest.mock('./FileImporter', () => () => null);

const defaultProps = {
  bookId: 'book1',
  coverHref: 'epub_content/covers/cover.png',
  updateCoverHref: jest.fn(),
  submitting: false,
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  idps: { idp1: { domain: 'test.example.com' } },
};

describe('BookCoverEditor Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<BookCoverEditor {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render without a coverHref', () => {
    expect(() =>
      render(<BookCoverEditor {...defaultProps} coverHref={undefined} />),
    ).not.toThrow();
  });

  it('should render in submitting state', () => {
    expect(() =>
      render(<BookCoverEditor {...defaultProps} submitting={true} />),
    ).not.toThrow();
  });
});
