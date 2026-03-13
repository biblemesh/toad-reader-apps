import { render, screen } from '@testing-library/react-native';
import Dialog from './Dialog';

jest.mock('react-dom', () => ({ createPortal: jest.fn(() => null) }));
jest.mock('../../hooks/useDimensions', () => () => ({
  window: { width: 400, height: 800 },
}));
jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../basic/CoverAndSpin', () => () => null);

describe('Dialog Component', () => {
  it('should return null when open is false', () => {
    const { toJSON } = render(<Dialog open={false} title="Test" />);
    expect(toJSON()).toBeNull();
  });

  it('should render the title when open is true', () => {
    render(<Dialog open={true} title="My Dialog" />);
    expect(screen.getByText('My Dialog')).toBeTruthy();
  });

  it('should render with a message without crashing', () => {
    expect(() =>
      render(<Dialog open={true} title="Test" message="Hello World" />),
    ).not.toThrow();
  });

  it('should render a confirm dialog with default buttons', () => {
    expect(() =>
      render(
        <Dialog
          open={true}
          type="confirm"
          title="Confirm"
          onConfirm={jest.fn()}
          onCancel={jest.fn()}
        />,
      ),
    ).not.toThrow();
  });

  it('should render a submitting spinner', () => {
    expect(() =>
      render(<Dialog open={true} title="Loading" submitting={true} />),
    ).not.toThrow();
  });
});
