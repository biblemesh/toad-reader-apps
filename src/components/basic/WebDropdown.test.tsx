import { render } from '@testing-library/react-native';
import WebDropdown from './WebDropdown';

// Web-only component: returns null when Platform.OS !== 'web' (test env uses 'ios').
describe('WebDropdown Component', () => {
  it('should return null on non-web platforms', () => {
    const { toJSON } = render(
      <WebDropdown
        label="Questions"
        orderedQuestions={[{ uid: 'q1', title: 'Question 1' }]}
        selectedObjects={[]}
        onSelectRow={jest.fn()}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should be a function component', () => {
    expect(typeof WebDropdown).toBe('function');
  });
});
