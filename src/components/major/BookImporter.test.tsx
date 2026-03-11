import { render } from '@testing-library/react-native';
import BookImporter from './BookImporter';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../hooks/useRouterState', () => ({
  __esModule: true,
  default: () => ({ historyPush: jest.fn() }),
  Link: ({ children }: { children: unknown }) => children,
}));
jest.mock('./FileImporter', () => () => null);

const defaultProps = {
  open: true,
  accountId: 'idp1:user1',
  updateBooks: jest.fn(),
  onClose: jest.fn(),
  replaceExisting: false,
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  idps: { idp1: { domain: 'test.example.com' } },
};

describe('BookImporter Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<BookImporter {...defaultProps} />)).not.toThrow();
  });

  it('should render in replace-existing mode', () => {
    expect(() =>
      render(<BookImporter {...defaultProps} replaceExisting={true} />),
    ).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<BookImporter {...defaultProps} open={false} />),
    ).not.toThrow();
  });
});
