import { render, screen } from '@testing-library/react-native';
import EnhancedAnalyticsReadingBySpine from './EnhancedAnalyticsReadingBySpine';

jest.mock('./Victory', () => ({
  VictoryChart: () => null,
  VictoryTheme: { customMaterial: {} },
  VictoryAxis: () => null,
  VictoryBar: () => null,
  VictoryLabel: () => null,
}));
jest.mock('../basic/EnhancedAnalyticsScrollContainer', () => () => null);
jest.mock('../../utils/toolbox', () => ({
  getHoursMinutesStr: (minutes: number) =>
    `${Math.floor(minutes / 60)}h ${minutes % 60}m`,
  concatText: ({ text }: { text: string }) => text,
}));

describe('EnhancedAnalyticsReadingBySpine Component', () => {
  it('should show "not enough data" text when readingBySpine is empty', () => {
    render(<EnhancedAnalyticsReadingBySpine readingBySpine={[]} width={400} />);
    expect(
      screen.getByText('There is not yet enough data to display this chart.'),
    ).toBeTruthy();
  });

  it('should render chart without crashing when data is provided', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsReadingBySpine
          readingBySpine={[{ spine: 'Chapter 1', minutes: 30 }]}
          width={400}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with many spines (triggers scroll container)', () => {
    const readingBySpine = Array.from({ length: 20 }, (_, i) => ({
      spine: `Chapter ${i + 1}`,
      minutes: i * 5,
    }));
    expect(() =>
      render(
        <EnhancedAnalyticsReadingBySpine
          readingBySpine={readingBySpine}
          width={400}
        />,
      ),
    ).not.toThrow();
  });
});
