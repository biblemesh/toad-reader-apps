import { render, screen } from '@testing-library/react-native';
import ToastContainer from './ToastContainer';

jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 375, height: 812 },
}));

describe('ToastContainer Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<ToastContainer text="Saved!" />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the toast text', () => {
    render(<ToastContainer text="Upload complete" />);
    expect(screen.getByText('Upload complete')).toBeTruthy();
  });

  it('should render without crashing when text is empty', () => {
    const { toJSON } = render(<ToastContainer text="" />);
    expect(toJSON()).not.toBeNull();
  });
});
