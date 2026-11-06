import type { Language, TestCase } from '@/lib/curriculum'

export type TestResult = {
  passed: boolean
  actual?: unknown
  error?: string
}

export type RunResult = {
  results: TestResult[]
  logs: string[]
  error?: string
}

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js'
const RUN_TIMEOUT_MS = 5000

const WORKER_SOURCE = `
let pyodidePromise = null;
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const lastLine = (msg) => String(msg).trim().split('\\n').filter(Boolean).slice(-1)[0] || String(msg);
const show = (v) => typeof v === 'string' ? v : (() => { try { return JSON.stringify(v) } catch { return String(v) } })();

function getPython() {
  if (!pyodidePromise) {
    importScripts('${PYODIDE_URL}');
    pyodidePromise = loadPyodide();
  }
  return pyodidePromise;
}

function runJavaScript(code, fnName, tests, logs) {
  const write = (...args) => logs.push(args.map(show).join(' '));
  const sandboxConsole = { log: write, info: write, warn: write, error: write };
  const factory = new Function('console', '"use strict";\\n' + code + '\\n;return typeof ' + fnName + ' === "function" ? ' + fnName + ' : undefined;');
  const fn = factory(sandboxConsole);
  if (!fn) throw new Error('No se encontró la función "' + fnName + '". Revisá que esté definida con ese nombre.');
  return tests.map((test) => {
    try {
      const actual = fn(...structuredClone(test.args));
      return { passed: same(actual, test.expected), actual };
    } catch (err) {
      return { passed: false, error: (err && err.name ? err.name + ': ' : '') + (err && err.message ? err.message : String(err)) };
    }
  });
}

async function runPython(id, code, fnName, tests, logs) {
  if (!pyodidePromise) self.postMessage({ id, type: 'status', message: 'Cargando intérprete de Python (solo la primera vez)…' });
  const py = await getPython();
  self.postMessage({ id, type: 'ready' });
  py.setStdout({ batched: (line) => logs.push(line) });
  py.setStderr({ batched: (line) => logs.push(line) });
  const namespace = py.globals.get('dict')();
  try {
    py.runPython(code, { globals: namespace });
  } catch (err) {
    throw new Error(lastLine(err.message));
  }
  const fn = namespace.get(fnName);
  if (!fn) throw new Error('No se encontró la función "' + fnName + '". Revisá que esté definida con ese nombre.');
  return tests.map((test) => {
    try {
      const raw = fn(...test.args.map((arg) => py.toPy(arg)));
      const actual = raw && typeof raw.toJs === 'function' ? raw.toJs({ dict_converter: Object.fromEntries }) : raw;
      return { passed: same(actual === undefined ? null : actual, test.expected), actual };
    } catch (err) {
      return { passed: false, error: lastLine(err.message) };
    }
  });
}

self.onmessage = async (event) => {
  const { id, language, code, fnName, tests } = event.data;
  const logs = [];
  try {
    const results = language === 'python'
      ? await runPython(id, code, fnName, tests, logs)
      : (self.postMessage({ id, type: 'ready' }), runJavaScript(code, fnName, tests, logs));
    self.postMessage({ id, type: 'result', results, logs });
  } catch (err) {
    self.postMessage({ id, type: 'result', results: [], logs, error: (err && err.message) || String(err) });
  }
};
`

let worker: Worker | null = null
let runCounter = 0

function getWorker() {
  if (!worker) {
    const url = URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }))
    worker = new Worker(url)
  }
  return worker
}

export function runTests({
  language,
  code,
  fnName,
  tests,
  onStatus,
}: {
  language: Language
  code: string
  fnName: string
  tests: TestCase[]
  onStatus?: (message: string) => void
}): Promise<RunResult> {
  const id = ++runCounter
  const activeWorker = getWorker()

  return new Promise((resolve) => {
    let timer: ReturnType<typeof setTimeout> | undefined

    const cleanup = () => {
      if (timer) clearTimeout(timer)
      activeWorker.removeEventListener('message', handleMessage)
    }

    const handleMessage = (event: MessageEvent) => {
      const data = event.data
      if (data.id !== id) return
      if (data.type === 'status') {
        onStatus?.(data.message)
      } else if (data.type === 'ready') {
        timer = setTimeout(() => {
          cleanup()
          activeWorker.terminate()
          worker = null
          resolve({
            results: [],
            logs: [],
            error: `Tiempo de ejecución excedido (${RUN_TIMEOUT_MS / 1000}s). ¿Hay un bucle infinito?`,
          })
        }, RUN_TIMEOUT_MS)
      } else if (data.type === 'result') {
        cleanup()
        resolve({ results: data.results, logs: data.logs, error: data.error })
      }
    }

    activeWorker.addEventListener('message', handleMessage)
    activeWorker.postMessage({ id, language, code, fnName, tests })
  })
}
