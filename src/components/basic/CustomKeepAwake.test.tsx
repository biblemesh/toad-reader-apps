import { render } from '@testing-library/react-native';
import { useKeepAwake } from 'expo-keep-awake';
import CustomKeepAwake from './CustomKeepAwake';

jest.mock('expo-keep-awake', () => ({
  useKeepAwake: jest.fn(),
}));

describe('CustomKeepAwake Component', () => {
  it('should render null', () => {
    const { toJSON } = render(<CustomKeepAwake />);
    expect(toJSON()).toBeNull();
  });

  it('should call useKeepAwake on mount', () => {
    render(<CustomKeepAwake />);
    expect(jest.mocked(useKeepAwake)).toHaveBeenCalled();
  });
});
