import { render, screen } from '@testing-library/react-native';
import EnhancedAnalyticsQuizScores from './EnhancedAnalyticsQuizScores';

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
  concatText: ({ text }: { text: string }) => text,
}));

describe('EnhancedAnalyticsQuizScores Component', () => {
  it('should show "no quizzes" text when averageScoresByQuiz is empty', () => {
    render(
      <EnhancedAnalyticsQuizScores
        averageScoresByQuiz={[]}
        width={400}
        singleUser={false}
      />,
    );
    expect(
      screen.getByText('This classroom does not contain any quizzes.'),
    ).toBeTruthy();
  });

  it('should render chart without crashing when data is provided', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsQuizScores
          averageScoresByQuiz={[
            { name: 'Quiz 1', avgFirstScore: 0.7, avgBestScore: 0.9 },
          ]}
          width={400}
          singleUser={false}
        />,
      ),
    ).not.toThrow();
  });

  it('should render in single user mode', () => {
    expect(() =>
      render(
        <EnhancedAnalyticsQuizScores
          averageScoresByQuiz={[
            { name: 'Quiz 1', avgFirstScore: 0.7, avgBestScore: 0.9 },
          ]}
          width={400}
          singleUser={true}
        />,
      ),
    ).not.toThrow();
  });
});
