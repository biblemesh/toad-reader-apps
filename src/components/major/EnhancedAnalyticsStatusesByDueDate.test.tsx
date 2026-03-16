import { render, screen } from '@testing-library/react-native';
import EnhancedAnalyticsStatusesByDueDate from './EnhancedAnalyticsStatusesByDueDate';

jest.mock('./Victory', () => ({
  VictoryChart: () => null,
  VictoryTheme: { customMaterial: {} },
  VictoryAxis: () => null,
  VictoryBar: () => null,
  VictoryStack: () => null,
  VictoryLegend: () => null,
  VictoryLabel: () => null,
}));
jest.mock('../basic/EnhancedAnalyticsScrollContainer', () => () => null);
jest.mock('../../utils/toolbox', () => ({
  fractionToPercent: (n: number) => `${Math.round(n * 100)}%`,
}));

describe('EnhancedAnalyticsStatusesByDueDate Component', () => {
  it('should show "no reading schedule" text when statuses are empty', () => {
    render(
      <EnhancedAnalyticsStatusesByDueDate
        readingScheduleStatuses={[]}
        width={400}
        numStudents={10}
        singleUser={false}
      />,
    );
    expect(
      screen.getByText(
        'There is currently no reading schedule for this classroom.',
      ),
    ).toBeTruthy();
  });

  it('should render chart without crashing when data is provided', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsStatusesByDueDate
          readingScheduleStatuses={[
            { dueAtText: 'Jan 1\n12:00', ontime: 5, late: 2 },
          ]}
          width={400}
          numStudents={10}
          singleUser={false}
        />,
      ),
    ).not.toThrow();
  });

  it('should render in single user mode', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsStatusesByDueDate
          readingScheduleStatuses={[
            { dueAtText: 'Jan 1\n12:00', ontime: 1, late: 0 },
          ]}
          width={400}
          numStudents={1}
          singleUser={true}
        />,
      ),
    ).not.toThrow();
  });
});
