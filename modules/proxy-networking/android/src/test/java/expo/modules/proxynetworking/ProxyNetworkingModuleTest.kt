package expo.modules.proxynetworking

import com.facebook.react.modules.network.OkHttpClientProvider
import expo.modules.kotlin.exception.CodedException
import expo.modules.test.core.legacy.ModuleMock
import expo.modules.test.core.legacy.ModuleMockHolder
import org.junit.After
import org.junit.Assert.assertFalse
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Assert.fail
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner

private interface ProxyNetworkingModuleTestInterface {
  @Throws(CodedException::class)
  fun setProxy(
    host: String,
    port: Double, // must be Double to be equivalent of JS's Number type
  )

  @Throws(CodedException::class)
  fun unsetProxy()

  fun isProxySet(): Boolean
}

private inline fun withProxyNetworkingMock(block: ModuleMockHolder<ProxyNetworkingModuleTestInterface, ProxyNetworkingModule>.() -> Unit) =
  ModuleMock.createMock(
    ProxyNetworkingModuleTestInterface::class,
    ProxyNetworkingModule(),
    block = block,
  )

@RunWith(RobolectricTestRunner::class)
class ProxyNetworkingModuleTest {
  @After
  fun tearDown() {
    OkHttpClientProvider.setOkHttpClientFactory(null)
  }

  @Test fun `setProxy simple`() =
    withProxyNetworkingMock {
      module.setProxy("example.com", 1234.0)
      assertTrue("proxy should be set", module.isProxySet())
    }

  @Test fun `setProxy when already set`() =
    withProxyNetworkingMock {
      module.setProxy("example.com", 1234.0)
      val exc =
        runCatching {
          module.setProxy("example.net", 5678.0)
        }.exceptionOrNull()
      assertNotNull("setProxy should fail if already set", exc)
    }

  @Test fun `unsetProxy simple`() =
    withProxyNetworkingMock {
      module.setProxy("example.com", 1234.0)
      module.unsetProxy()
      assertFalse("proxy should not be set", module.isProxySet())
    }

  @Test fun `unsetProxy when not already set`() =
    withProxyNetworkingMock {
      val exc =
        runCatching {
          module.unsetProxy()
        }.exceptionOrNull()
      assertNotNull("unsetProxy should fail if not set", exc)
    }
}
