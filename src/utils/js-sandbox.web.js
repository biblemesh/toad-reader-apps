/**
 * A simple wrapper around the original getQuickJS, as this works fine on web and is probably more secure.
 * @return {Promise<import('quickjs-emscripten').QuickJSWASMModule>}
 */
export default async function getQuickJS() {
  const { getQuickJS: getQuickJS_real } = await import('quickjs-emscripten');
  return await getQuickJS_real();
}
