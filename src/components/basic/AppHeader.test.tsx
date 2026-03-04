import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import AppHeader from './AppHeader';

jest.mock('../../hooks/useWideMode', () => () => false);
jest.mock('../../hooks/useThemedStyleSets', () => () => ({
  baseThemedStyle: {},
  labelThemedStyle: {},
}));
jest.mock('../../utils/toolbox', () => ({ getToolbarHeight: () => 56 }));

describe('AppHeader Component', () => {
  it('should render title text', () => {
    render(<AppHeader title="My Title" />);
    expect(screen.getByText('My Title')).toBeTruthy();
  });

  it('should render subtitle when provided', () => {
    render(<AppHeader title="Title" subtitle="My Subtitle" />);
    expect(screen.getByText('My Subtitle')).toBeTruthy();
  });

  it('should not render subtitle when not provided', () => {
    render(<AppHeader title="Title" />);
    expect(screen.queryByText('My Subtitle')).toBeNull();
  });

  it('should return null when hide is true', () => {
    const { toJSON } = render(<AppHeader title="Hidden" hide />);
    expect(toJSON()).toBeNull();
  });

  it('should render left control when provided', () => {
    render(<AppHeader title="Title" leftControl={<Text>Back</Text>} />);
    expect(screen.getByText('Back')).toBeTruthy();
  });

  it('should render right controls when provided', () => {
    render(
      <AppHeader title="Title" rightControls={[<Text key="1">Action</Text>]} />,
    );
    expect(screen.getByText('Action')).toBeTruthy();
  });
});
