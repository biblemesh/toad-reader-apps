import { render } from '@testing-library/react-native';
import WebReflectionDropdown from './WebReflectionDropdown';

// Web-only component: returns null when Platform.OS !== 'web' (test env uses 'ios').
describe('WebReflectionDropdown Component', () => {
  it('should return null on non-web platforms', () => {
    const question = { uid: 'q1', title: 'What did you learn?' };
    const { toJSON } = render(
      <WebReflectionDropdown
        label="Question"
        orderedQuestions={[question]}
        currentQuestion={question}
        onSelect={jest.fn()}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should be a function component', () => {
    expect(typeof WebReflectionDropdown).toBe('function');
  });
});
