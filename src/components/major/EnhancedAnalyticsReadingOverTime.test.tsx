import { render, screen } from '@testing-library/react-native';
import EnhancedAnalyticsReadingOverTime from './EnhancedAnalyticsReadingOverTime';

jest.mock('../../utils/toolbox', () => ({
  getHoursMinutesStr: (ms: number) => `${Math.floor(ms / 3600000)}h`,
  getDateLine: () => 'Jan 1',
}));
jest.mock('./Victory', () => ({
  VictoryChart: () => null,
  VictoryTheme: { customMaterial: {} },
  VictoryAxis: () => null,
  VictoryLine: () => null,
  VictoryLegend: () => null,
}));
jest.mock('../basic/EnhancedAnalyticsScrollContainer', () => () => null);

const baseProps = {
  readingOverTime: {
    totals: [10, 20, 30],
    numReaders: [1, 2, 3],
    startTime: Date.now(),
  },
  width: 400,
  singleUser: false,
};

describe('EnhancedAnalyticsReadingOverTime Component', () => {
  it('should show "not enough data" when totals has fewer than 2 entries', () => {
    render(
      <EnhancedAnalyticsReadingOverTime
        {...baseProps}
        readingOverTime={{
          totals: [10],
          numReaders: [1],
          startTime: Date.now(),
        }}
      />,
    );
    expect(
      screen.getByText('There is not yet enough data to display this chart.'),
    ).toBeTruthy();
  });

  it('should render chart when there is enough data', () => {
    expect(() =>
      render(<EnhancedAnalyticsReadingOverTime {...baseProps} />),
    ).not.toThrow();
  });

  it('should render scroll container when chart is wider than available width', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsReadingOverTime
          {...baseProps}
          readingOverTime={{
            totals: [10, 20, 30, 40, 50, 60],
            numReaders: [1, 2, 3, 4, 5, 6],
            startTime: Date.now(),
          }}
          width={300}
        />,
      ),
    ).not.toThrow();
  });
});
