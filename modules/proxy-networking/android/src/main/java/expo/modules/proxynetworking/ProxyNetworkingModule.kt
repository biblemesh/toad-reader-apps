package expo.modules.proxynetworking

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import okhttp3.OkHttpClient
import java.net.InetSocketAddress
import java.net.Proxy

internal class ProxySetException(
  cause: Throwable,
) : CodedException(message = "Failed to configure proxy: ${cause.message}", cause = cause)

class ProxyNetworkingModule : Module() {
  fun isProxySet(): Boolean = OkHttpClientProvider.createClient().proxy !== null

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() =
    ModuleDefinition {
      // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
      // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
      // The module will be accessible from `requireNativeModule('ProxyNetworking')` in JavaScript.
      Name("ProxyNetworking")

      // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
      Function("setProxy") { host: String, port: Double ->
        try {
          if (isProxySet()) {
            throw IllegalStateException("Proxy is already set")
          }
          OkHttpClientProvider.setOkHttpClientFactory(
            object : OkHttpClientFactory {
              override fun createNewNetworkModuleClient(): OkHttpClient {
                val proxy =
                  Proxy(
                    Proxy.Type.SOCKS,
                    InetSocketAddress(host, port.toInt()),
                  )
                return OkHttpClientProvider
                  .createClientBuilder()
                  .proxy(proxy)
                  .build()
              }
            },
          )
        } catch (e: Exception) {
          throw ProxySetException(e)
        }
      }

      Function("unsetProxy") {
        try {
          if (!isProxySet()) {
            throw IllegalStateException("Proxy is not set")
          }
          OkHttpClientProvider.setOkHttpClientFactory(null)
        } catch (e: Exception) {
          throw ProxySetException(e)
        }
      }

      Function("isProxySet") {
        isProxySet()
      }
    }
}
