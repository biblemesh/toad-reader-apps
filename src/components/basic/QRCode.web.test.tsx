import QRCodeWeb from './QRCode.web';

jest.mock('qrcode.react', () => ({ QRCodeSVG: () => null }));

describe('QRCode.web Component', () => {
  it('should export a component', () => {
    expect(QRCodeWeb).toBeDefined();
  });

  it('should be a function component', () => {
    expect(typeof QRCodeWeb).toBe('function');
  });
});
