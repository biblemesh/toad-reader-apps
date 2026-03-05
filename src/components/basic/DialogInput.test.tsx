import { render } from '@testing-library/react-native';
import DialogInput from './DialogInput';

jest.mock('./Input', () => () => null);

describe('DialogInput Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(
      <DialogInput value="" onChangeText={jest.fn()} />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should render without crashing with all props provided', () => {
    const { toJSON } = render(
      <DialogInput
        value="Hello"
        onChangeText={jest.fn()}
        label="My Label"
        placeholder="Type here..."
      />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should render without crashing when no props are provided', () => {
    const { toJSON } = render(<DialogInput />);
    expect(toJSON()).not.toBeNull();
  });
});
