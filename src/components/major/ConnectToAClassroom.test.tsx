import { render } from '@testing-library/react-native';
import ConnectToAClassroom from './ConnectToAClassroom';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('expo-camera', () => ({
  CameraView: () => null,
  useCameraPermissions: () => [null, jest.fn()],
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));
jest.mock('../../hooks/useRouterState', () => () => ({
  historyPush: jest.fn(),
  historyReplace: jest.fn(),
}));
jest.mock('../../utils/toolbox', () => ({
  getDataOrigin: () => 'https://test.example.com',
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getIdsFromAccountId: () => ({ idpId: 'idp1' }),
  safeFetch: jest.fn(),
}));
jest.mock('../../utils/syncUserData', () => ({ refreshUserData: jest.fn() }));
jest.mock('../../utils/Toast', () => ({ show: jest.fn() }));
jest.mock('../basic/BackFunction', () => () => null);
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/DialogInput', () => () => null);
jest.mock('../basic/Button', () => () => null);

const defaultProps = {
  open: true,
  requestHide: jest.fn(),
  bookId: 'book1',
  idps: { idp1: { domain: 'test.example.com' } },
  accounts: { 'idp1:user1': { cookie: 'test-cookie' } },
  books: { book1: { accounts: { 'idp1:user1': {} } } },
  setCurrentClassroom: jest.fn(),
};

describe('ConnectToAClassroom Component', () => {
  it('should render without crashing', () => {
    expect(() =>
      render(<ConnectToAClassroom {...defaultProps} />),
    ).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<ConnectToAClassroom {...defaultProps} open={false} />),
    ).not.toThrow();
  });

  it('should render without crashing with no bookId', () => {
    expect(() =>
      render(
        <ConnectToAClassroom
          {...defaultProps}
          bookId={undefined}
          books={{ undefined: { accounts: {} } }}
        />,
      ),
    ).not.toThrow();
  });
});
