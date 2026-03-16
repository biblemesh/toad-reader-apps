import { render, screen } from '@testing-library/react-native';
import EnhancedAnalyticsTotalReading from './EnhancedAnalyticsTotalReading';

jest.mock('../../utils/toolbox', () => ({
  getHoursMinutesStr: (minutes: number) =>
    `${Math.floor(minutes / 60)}h ${minutes % 60}m`,
}));

describe('EnhancedAnalyticsTotalReading Component', () => {
  it('should render without crashing with empty readingBySpine', () => {
    const { toJSON } = render(
      <EnhancedAnalyticsTotalReading readingBySpine={[]} numStudents={10} />,
    );
    expect(toJSON()).not.toBeNull();
  });

  it('should display total reading time', () => {
    render(
      <EnhancedAnalyticsTotalReading
        readingBySpine={[
          { spine: 'Chapter 1', minutes: 60 },
          { spine: 'Chapter 2', minutes: 30 },
        ]}
        numStudents={3}
      />,
    );
    expect(screen.getByText('1h 30m')).toBeTruthy();
  });

  it('should display average per student', () => {
    render(
      <EnhancedAnalyticsTotalReading
        readingBySpine={[{ spine: 'Chapter 1', minutes: 60 }]}
        numStudents={2}
      />,
    );
    expect(screen.getByText('Avg: 0h 30m per student')).toBeTruthy();
  });
});
