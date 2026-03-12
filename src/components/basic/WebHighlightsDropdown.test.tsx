import { render } from '@testing-library/react-native';
import WebHighlightsDropdown from './WebHighlightsDropdown';

// Web-only component: returns null when Platform.OS !== 'web' (test env uses 'ios').
describe('WebHighlightsDropdown Component', () => {
  it('should return null on non-web platforms', () => {
    const { toJSON } = render(
      <WebHighlightsDropdown
        selectOptions={[{ id: 'h1', title: 'Blue' }]}
        selectedIndexes={[]}
        displayValue="All"
        onSelect={jest.fn()}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should be a function component', () => {
    expect(typeof WebHighlightsDropdown).toBe('function');
  });
});
