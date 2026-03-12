import { render } from '@testing-library/react-native';
import SelectWebPortalWrapper from './SelectWebPortalWrapper';

// This is a web-only component: Platform.OS !== 'web' returns null in the native test environment.
describe('SelectWebPortalWrapper Component', () => {
  it('should return null on non-web platforms', () => {
    const { toJSON } = render(
      <SelectWebPortalWrapper
        label="Choose"
        value="Option A"
        options={[{ title: 'Option A' }, { title: 'Option B' }]}
        onSelect={jest.fn()}
      />,
    );
    expect(toJSON()).toBeNull();
  });

  it('should be a function component', () => {
    expect(typeof SelectWebPortalWrapper).toBe('function');
  });
});
