import { render } from '@testing-library/react-native';
import CoverAndSpin from './CoverAndSpin';
import SaveStateHeaderIcon from './SaveStateHeaderIcon';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({ connect: () => (Component) => Component }));
jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));
jest.mock('react-use/lib/useToggle', () => () => [false, jest.fn()]);
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('./HeaderIcon', () => () => null);
jest.mock('./CoverAndSpin', () => jest.fn(() => null));

const defaultProps = { syncStatus: 'synced' };

describe('SaveStateHeaderIcon Component', () => {
  beforeEach(() => {
    jest.mocked(CoverAndSpin).mockClear();
  });

  it('should render without crashing', () => {
    const { toJSON } = render(<SaveStateHeaderIcon {...defaultProps} />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render CoverAndSpin when syncStatus is "patching"', () => {
    render(<SaveStateHeaderIcon syncStatus="patching" />);
    expect(jest.mocked(CoverAndSpin).mock.calls.length).toBeGreaterThan(0);
  });

  it('should not render CoverAndSpin when syncStatus is "synced"', () => {
    render(<SaveStateHeaderIcon syncStatus="synced" />);
    expect(jest.mocked(CoverAndSpin).mock.calls.length).toBe(0);
  });
});
