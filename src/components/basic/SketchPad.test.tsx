import { render } from '@testing-library/react-native';
import Button from './Button';
import SketchPad from './SketchPad';

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: { SKETCH_COLOR_OPTIONS: 3 } } },
}));
jest.mock('inline-i18n', () => ({ i18n: (str: string) => str }));
jest.mock('@react-native-community/hooks', () => ({
  useLayout: () => ({ onLayout: jest.fn(), width: 0, height: 0 }),
}));
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ bottom: 0, top: 0, left: 0, right: 0 }),
}));
jest.mock('../../../getSketchCode', () => () => '<html></html>');
jest.mock('../../utils/postMessage', () => ({ postMessage: jest.fn() }));
jest.mock('../../hooks/useNonBlurringOnPress', () => (handler: () => void) => ({
  onPress: handler,
}));
jest.mock('../major/WebView', () => () => null);
jest.mock('./Button', () => jest.fn(() => null));
jest.mock('./ColorSwitcher', () => ({
  __esModule: true,
  default: jest.fn(() => null),
  defaultColorOptions: ['#000000', '#ff0000', '#00ff00'],
}));
jest.mock('./Icon', () => () => null);

const defaultProps = {
  sketch: null,
  updateSketchInEdit: jest.fn(),
  onDone: undefined,
};

describe('SketchPad Component', () => {
  beforeEach(() => {
    jest.mocked(Button).mockClear();
  });

  it('should render without crashing in view mode', () => {
    const { toJSON } = render(<SketchPad {...defaultProps} mode="view" />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render without crashing in edit mode', () => {
    const { toJSON } = render(<SketchPad {...defaultProps} mode="edit" />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render Button when onDone is provided', () => {
    render(<SketchPad {...defaultProps} onDone={jest.fn()} />);
    expect(jest.mocked(Button).mock.calls.length).toBeGreaterThan(0);
  });

  it('should not render Button when onDone is not provided', () => {
    render(<SketchPad {...defaultProps} />);
    expect(jest.mocked(Button).mock.calls.length).toBe(0);
  });
});
