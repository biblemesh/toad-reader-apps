import { render } from '@testing-library/react-native';
import AccessCodeDialog from './AccessCodeDialog';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://test.example.com',
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  safeFetch: jest.fn(),
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/Input', () => () => null);

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  accessCodeInfo: { title: 'Test Access Code', inputLabel: 'Code' },
  handleNewLibrary: jest.fn(),
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie', libraryHash: 'hash123' } },
};

describe('AccessCodeDialog Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<AccessCodeDialog {...defaultProps} />)).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<AccessCodeDialog {...defaultProps} open={false} />),
    ).not.toThrow();
  });

  it('should render with empty accessCodeInfo', () => {
    expect(() =>
      render(<AccessCodeDialog {...defaultProps} accessCodeInfo={{}} />),
    ).not.toThrow();
  });
});
