import { render } from '@testing-library/react-native';
import BookSubscriptionsDialog from './BookSubscriptionsDialog';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
}));
jest.mock('../../utils/toolbox', () => ({
  cloneObj: (obj: unknown) => JSON.parse(JSON.stringify(obj)),
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  getDataOrigin: () => 'https://test.example.com',
  safeFetch: jest.fn(),
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getVersionString: (v: string) => v,
}));
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/Select', () => () => null);

const defaultProps = {
  open: true,
  bookId: 'book1',
  bookTitle: 'Test Book',
  assignedSubscriptions: [],
  onClose: jest.fn(),
  idps: { idp1: { domain: 'test.example.com', useEnhancedReader: false } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  subscriptions: [],
  setSubscriptions: jest.fn(),
};

describe('BookSubscriptionsDialog Component', () => {
  it('should render without crashing', () => {
    expect(() =>
      render(<BookSubscriptionsDialog {...defaultProps} />),
    ).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<BookSubscriptionsDialog {...defaultProps} open={false} />),
    ).not.toThrow();
  });

  it('should render with subscriptions', () => {
    expect(() =>
      render(
        <BookSubscriptionsDialog
          {...defaultProps}
          subscriptions={[{ id: 1, label: 'Premium' }]}
          assignedSubscriptions={[{ id: 1, version: 'BASE' }]}
        />,
      ),
    ).not.toThrow();
  });
});
