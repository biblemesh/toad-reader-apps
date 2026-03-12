import { render } from '@testing-library/react-native';
import WebAnalyticsDropdown from './WebAnalyticsDropdown';

// Web-only component: returns null when Platform.OS !== 'web' (test env uses 'ios').
describe('WebAnalyticsDropdown Component', () => {
  it('should return null on non-web platforms', () => {
    const { toJSON } = render(
      <WebAnalyticsDropdown
        label="Student"
        currentStudentIdx={-1}
        students={[{ fullname: 'Alice', email: 'alice@example.com' }]}
        onSelect={jest.fn()}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should be a function component', () => {
    expect(typeof WebAnalyticsDropdown).toBe('function');
  });
});
