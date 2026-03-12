import WebAutocomplete, { WebAutocompleteItem } from './WebAutocomplete';

// WebAutocomplete renders native DOM elements and attaches window/document event
// listeners in useEffect. It cannot be safely rendered in the React Native test
// environment. We verify the exports are valid functions.
describe('WebAutocomplete Component', () => {
  it('should export a function component', () => {
    expect(typeof WebAutocomplete).toBe('function');
  });

  it('should export WebAutocompleteItem as a function component', () => {
    expect(typeof WebAutocompleteItem).toBe('function');
  });
});
