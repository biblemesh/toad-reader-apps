import { render } from '@testing-library/react-native';
import DisplaySettings from './DisplaySettings';

jest.mock('redux', () => ({ bindActionCreators: () => ({}) }));
jest.mock('react-redux', () => ({
  connect: () => (Component: unknown) => Component,
}));
jest.mock('./Dialog', () => () => null);
jest.mock('../basic/Icon', () => () => null);
jest.mock('../basic/BackFunction', () => () => null);

const defaultProps = {
  open: true,
  reportSpots: jest.fn(),
  displaySettings: { textSize: 100 },
  setTextSize: jest.fn(),
  requestHide: jest.fn(),
};

describe('DisplaySettings Component', () => {
  it('should render without crashing', () => {
    expect(() => render(<DisplaySettings {...defaultProps} />)).not.toThrow();
  });

  it('should render when closed', () => {
    expect(() =>
      render(<DisplaySettings {...defaultProps} open={false} />),
    ).not.toThrow();
  });
});
