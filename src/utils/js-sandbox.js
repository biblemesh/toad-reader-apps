class Implementation {
  constructor(value) {
    this.value = value;
  }

  consume(setter) {
    setter(this.value);
  }
}

class Handle {
  constructor(result) {
    this.result = result;
  }

  call(...args) {
    if (!(this.typeof() === 'function')) {
      throw new Error(`Trying to call a ${this.typeof()}`);
    }
    return this.result.call(...args);
  }

  dispose() {}

  setProp(name, value) {
    this.result[name] = value;
  }

  typeof() {
    return typeof this.result;
  }
}

/**
 * @param {typeof import('@nyariv/sandboxjs').default} Sandbox
 * @return {import('quickjs-emscripten').QuickJSContext}
 */
function getSandboxContext(Sandbox) {
  const globals = {};
  return {
    callFunction: (fn, ...args) => {
      try {
        return {
          value: fn.call(
            ...args.map((impl) => {
              if (typeof impl === 'object' && impl instanceof Implementation) {
                return impl.value;
              } else {
                return impl;
              }
            }),
          ),
        };
      } catch (e) {
        return { error: e };
      }
    },
    dump: (val) => {
      if (typeof val === 'object' && val instanceof Handle) {
        return val.result;
      } else {
        return val;
      }
    },
    runtime: {
      executePendingJobs: () => null,
    },
    global: new Handle(globals),
    evalCode: (code) => {
      const sandbox = new Sandbox({ globals });
      const exec = sandbox.compile(code + ';return FindProxyForURL');
      try {
        return { value: exec({}).run() };
      } catch (e) {
        return { error: e };
      }
    },
    newNumber: (number) => new Implementation(number),
    newPromise: () => {
      throw new Error('Async functions are not supported at present');
    },
    newFunction: (name, fn) => new Implementation(fn),
    newString: (str) => new Implementation(str),
    resolvePromise: (result) => Promise.resolve({ value: result }),
    setProp: (scope, name, handle) => {
      scope.setProp(name, handle);
    },
    typeof: (handle) => handle.typeof(),
    unwrapResult: (result) => {
      if (result.error) {
        throw result.error;
      } else {
        if (
          typeof result.value === 'object' &&
          result.value instanceof Handle
        ) {
          return result.value;
        } else {
          return new Handle(result.value);
        }
      }
    },
  };
}

/**
 * A wrapper around Sandbox.JS to provide the same API as the quickjs-emscripten module
 * @return {Promise<Partial<import('quickjs-emscripten').QuickJSWASMModule>>}
 */
export default async function getQuickJS() {
  const Sandbox = (await import('@nyariv/sandboxjs')).default;
  return {
    newContext: getSandboxContext.bind(null, Sandbox),
  };
}
