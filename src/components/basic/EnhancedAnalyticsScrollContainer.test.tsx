import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import EnhancedAnalyticsScrollContainer from './EnhancedAnalyticsScrollContainer';

describe('EnhancedAnalyticsScrollContainer Component', () => {
  it('should render without crashing', () => {
    const { toJSON } = render(<EnhancedAnalyticsScrollContainer />);
    expect(toJSON()).not.toBeNull();
  });

  it('should render the chart content passed via the chart prop', () => {
    render(<EnhancedAnalyticsScrollContainer chart={<Text>My Chart</Text>} />);
    expect(screen.getByText('My Chart')).toBeTruthy();
  });

  it('should render without crashing when minWidth is provided', () => {
    const { toJSON } = render(
      <EnhancedAnalyticsScrollContainer
        chart={<Text>Chart</Text>}
        minWidth={600}
      />,
    );
    expect(toJSON()).not.toBeNull();
  });
});
