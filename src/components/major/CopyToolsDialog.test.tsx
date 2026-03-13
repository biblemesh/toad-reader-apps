import { render } from '@testing-library/react-native';
import CopyToolsDialog from './CopyToolsDialog';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://test.example.com',
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  safeFetch: jest.fn(),
  cloneObj: (obj: unknown) => JSON.parse(JSON.stringify(obj)),
}));
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/CheckBox', () => () => null);
jest.mock('../basic/Select', () => () => null);

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
};

describe('CopyToolsDialog Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<CopyToolsDialog {...defaultProps} />)).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<CopyToolsDialog {...defaultProps} open={false} />),
    ).not.toThrow();
  });
});
