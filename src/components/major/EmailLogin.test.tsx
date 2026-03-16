import { render, screen } from '@testing-library/react-native';
import EmailLogin from './EmailLogin';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: {} } },
}));
jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('expo-image', () => ({ Image: () => null }));
jest.mock(
  '../../hooks/useInstanceValue',
  () => (value: unknown) => () => value,
);
jest.mock('../../hooks/useRouterState', () => () => ({
  routerState: {},
  clearKeyFromRouterState: jest.fn(),
}));
jest.mock('../../utils/toolbox', () => ({
  safeFetch: jest.fn(),
  getReqOptionsWithAdditions: (opts: unknown) => opts,
  getDataOrigin: () => 'https://test.example.com',
  isValidEmail: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
}));
jest.mock(
  '../basic/SafeLayout',
  () =>
    ({ children }: { children: unknown }) =>
      children,
);
jest.mock('../basic/CoverAndSpin', () => () => null);
jest.mock('../basic/Input', () => () => null);
jest.mock('../basic/Button', () => () => null);

const defaultProps = {
  idpId: 'idp1',
  onSuccess: jest.fn(),
  idps: {
    idp1: {
      domain: 'test.example.com',
      name: 'Test IDP',
      emailConsentText: '',
    },
  },
  addAccount: jest.fn(),
};

describe('EmailLogin Component', () => {
  it('should render without crashing in email stage', () => {
    expect(() => render(<EmailLogin {...defaultProps} />)).not.toThrow();
  });

  it('should render with emailConsentText', () => {
    expect(() =>
      render(
        <EmailLogin
          {...defaultProps}
          idps={{
            idp1: {
              ...defaultProps.idps.idp1,
              emailConsentText: 'By logging in you agree to our terms.',
            },
          }}
        />,
      ),
    ).not.toThrow();
  });

  it('should render the IDP name', () => {
    render(<EmailLogin {...defaultProps} />);
    expect(screen.getByText('Test IDP')).toBeTruthy();
  });
});
