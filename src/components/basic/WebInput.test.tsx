import WebInput from './WebInput';

// WebInput renders native <div>/<input> HTML elements. We verify it is a valid
// function component without attempting to render it in the RN test environment.
describe('WebInput Component', () => {
  it('should be a function component', () => {
    expect(typeof WebInput).toBe('function');
  });

  it('should be defined', () => {
    expect(WebInput).toBeDefined();
  });
});
