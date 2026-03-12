import Iframe from './Iframe';

// Iframe is a web-only component that wraps the native <iframe> element via
// react-native's createElement. It cannot be rendered in the native test
// environment, so we verify it is correctly exported and structured.

describe('Iframe Component', () => {
  it('should export a function component', () => {
    expect(typeof Iframe).toBe('function');
  });

  it('should be defined', () => {
    expect(Iframe).toBeDefined();
  });
});
