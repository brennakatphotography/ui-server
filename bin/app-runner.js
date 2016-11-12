const spawn = require('child_process').spawn;
const { ifn, thread, trim } = require('fun-util');

const nullify = () => null;

const getFlag = flag => {
  let string = process.argv.find(arg => arg.match(new RegExp(`^--${flag}`)));
  if (string === undefined) return false;
  let value = string.toLowerCase().split('=')[1];
  if (value === 'true' || value === undefined) {
    return true;
  } else if (value === 'false') {
    return false;
  }
  return value;
};

const enableAll = children => () => {
  if (!getFlag('never-log'))
  children.forEach(({ child, color, startedOutput }) => {
    if (!startedOutput) enableOutput(child, color);
  });
};

const enableOutput = (child, color) => {
  onOutput(child, thread(trim, color, console.log));
};

const onOutput = (child, listener) => {
  child.stdout.on('data', thread(String, listener));
  child.stderr.on('data', thread(String, listener));
};

const onExit = (child, listener) => {
  child.on('exit', listener);
};

const createAbort = children => () => {
  spawn('pkill', ['-f', 'leiningen']);
  children.forEach(({ child }) => {
    child.kill('SIGTERM');
  });
  process.exit();
};

const initPromise = ({ child, healthCheck, timeout, abort }) => {
  return new Promise((resolve, reject) => {
    onOutput(child, ifn(healthCheck, resolve, nullify));
    setTimeout(reject, (timeout || 20) * 1000);
    onExit(child, abort);
  });
}

const initProcess = abort => ({ args, color, healthCheck, timeout }) => {
  const child = spawn.apply(null, args);
  const promise = initPromise({ child, healthCheck, timeout, abort });
  const startedOutput = !getFlag('silent');
  if (startedOutput) enableOutput(child, color);
  return { child, promise, color, startedOutput };
};

const shouldStart = ({ onlyIfFlags, notIfFlags }) => {
  const yesFlags = onlyIfFlags || [];
  const noFlags = notIfFlags || [];
  return yesFlags.every(getFlag) && !noFlags.some(getFlag);
};

module.exports = ({ processes, onStarted, onStopped, onFailed }) => {
  const abort = () => createAbort(children)();
  const children = processes.filter(shouldStart).map(initProcess(abort));
  Promise.all(children.map(({ promise }) => promise))
    .then(onStarted || nullify)
    .then(enableAll(children))
    .catch(thread(onFailed || nullify, abort));
  process.on('SIGINT', thread(onStopped || nullify, abort));
};
