import WebButton from './WebButton';

// WebButton renders a native <button> HTML element. We verify it is a valid
// function component without attempting to render it in the RN test environment.
describe('WebButton Component', () => {
  it('should be a function component', () => {
    expect(typeof WebButton).toBe('function');
  });

  it('should be defined', () => {
    expect(WebButton).toBeDefined();
  });
});
