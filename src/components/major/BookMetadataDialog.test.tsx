import { render } from '@testing-library/react-native';
import BookMetadataDialog from './BookMetadataDialog';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useMetadataValuesByKeyId', () => () => ({}));
jest.mock('../../utils/toolbox', () => ({
  cloneObj: (obj: unknown) => JSON.parse(JSON.stringify(obj)),
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  getDataOrigin: () => 'https://test.example.com',
  safeFetch: jest.fn(),
  getReqOptionsWithAdditions: (opts: unknown) => opts,
}));
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/Input', () => () => null);
jest.mock('../basic/Select', () => () => null);
jest.mock('./BookCoverEditor', () => () => null);

const defaultProps = {
  open: true,
  metadataValues: [],
  bookId: 'book1',
  isAudiobook: false,
  onClose: jest.fn(),
  handleNewLibrary: jest.fn(),
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie', libraryHash: 'hash123' } },
  metadataKeys: [],
};

describe('BookMetadataDialog Component', () => {
  it('should render without crashing', () => {
    expect(() =>
      render(<BookMetadataDialog {...defaultProps} />),
    ).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<BookMetadataDialog {...defaultProps} open={false} />),
    ).not.toThrow();
  });

  it('should render for an audiobook', () => {
    expect(() =>
      render(<BookMetadataDialog {...defaultProps} isAudiobook={true} />),
    ).not.toThrow();
  });

  it('should render with custom metadata keys', () => {
    expect(() =>
      render(
        <BookMetadataDialog
          {...defaultProps}
          metadataKeys={[
            { id: 'genre', name: 'Genre', options: ['Fiction', 'Non-fiction'] },
          ]}
        />,
      ),
    ).not.toThrow();
  });
});
