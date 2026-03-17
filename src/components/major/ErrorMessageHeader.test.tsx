import { render, screen } from '@testing-library/react-native';
import ErrorMessageHeader from './ErrorMessageHeader';
import useRouterState from '../../hooks/useRouterState';

jest.mock('../../utils/toolbox', () => ({
  isStatusBarHidden: () => false,
  setStatusBarHidden: jest.fn(),
}));
jest.mock('../../hooks/useSetTimeout', () => () => [jest.fn()]);
jest.mock('../../hooks/useRouterState', () =>
  jest.fn(() => ({
    historyGoBack: jest.fn(),
    routerState: { title: 'My Error', critical: false },
  })),
);
jest.mock('../basic/AppHeader', () => {
  const { Text } = jest.requireActual('react-native');
  return ({ title }: { title: string }) => <Text>{title}</Text>;
});
jest.mock('../basic/HeaderIcon', () => () => null);

describe('ErrorMessageHeader Component', () => {
  it('should render with the title from routerState', () => {
    render(<ErrorMessageHeader />);
    expect(screen.getByText('My Error')).toBeTruthy();
  });

  it('should render default "Error" title when no title in routerState', () => {
    (useRouterState as jest.Mock).mockReturnValue({
      historyGoBack: jest.fn(),
      routerState: { title: undefined, critical: false },
    });
    render(<ErrorMessageHeader />);
    expect(screen.getByText('Error')).toBeTruthy();
  });

  it('should render without crashing when critical is true', () => {
    (useRouterState as jest.Mock).mockReturnValue({
      historyGoBack: jest.fn(),
      routerState: { title: 'Critical Error', critical: true },
    });
    expect(() => render(<ErrorMessageHeader />)).not.toThrow();
  });
});
