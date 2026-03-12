import QRCode from './QRCode';

describe('QRCode Component', () => {
  it('should export null for non-web platforms', () => {
    expect(QRCode).toBeNull();
  });
});
