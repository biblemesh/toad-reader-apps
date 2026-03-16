import { render, screen } from '@testing-library/react-native';
import EnhancedAnalyticsQuizCompletions from './EnhancedAnalyticsQuizCompletions';

jest.mock('./Victory', () => ({
  VictoryChart: () => null,
  VictoryTheme: { customMaterial: {} },
  VictoryAxis: () => null,
  VictoryBar: () => null,
  VictoryLegend: () => null,
  VictoryLabel: () => null,
}));
jest.mock('../basic/EnhancedAnalyticsScrollContainer', () => () => null);
jest.mock('../../utils/toolbox', () => ({
  fractionToPercent: (n: number) => `${Math.round(n * 100)}%`,
  concatText: ({ text }: { text: string }) => text,
}));

describe('EnhancedAnalyticsQuizCompletions Component', () => {
  it('should show "no quizzes" text when completionsByQuiz is empty', () => {
    render(
      <EnhancedAnalyticsQuizCompletions
        completionsByQuiz={[]}
        width={400}
        numStudents={10}
      />,
    );
    expect(
      screen.getByText('This classroom does not contain any quizzes.'),
    ).toBeTruthy();
  });

  it('should render chart without crashing when data is provided', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsQuizCompletions
          completionsByQuiz={[{ name: 'Quiz 1', completions: 5 }]}
          width={400}
          numStudents={10}
        />,
      ),
    ).not.toThrow();
  });

  it('should render with many quizzes (triggers scroll container)', () => {
    const completionsByQuiz = Array.from({ length: 20 }, (_, i) => ({
      name: `Quiz ${i + 1}`,
      completions: i,
    }));
    expect(() =>
      render(
        <EnhancedAnalyticsQuizCompletions
          completionsByQuiz={completionsByQuiz}
          width={400}
          numStudents={10}
        />,
      ),
    ).not.toThrow();
  });
});
