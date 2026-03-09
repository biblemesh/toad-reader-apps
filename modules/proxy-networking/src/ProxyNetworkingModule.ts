import { NativeModule, requireNativeModule } from 'expo';

declare class ProxyNetworkingModule extends NativeModule {
  setProxy(url: string): void;
  unsetProxy(): void;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ProxyNetworkingModule>('ProxyNetworking');
