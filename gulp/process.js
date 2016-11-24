const spawn = require('child_process').spawn;
const { thread, ifn } = require('fun-util');

const checkStream = (child, done, port) => thread(String, message => {
  if (message.match(/port/) && message.match(new RegExp(port))) {
    done();
  }
  child.emit('stdout', message);
});

const run = ({ proc, cwd, done, cmd, args, port }) => {
  if (proc) {
    proc.kill('SIGINT');
  }
  process.env.GULP = 'GULP';
  const child = spawn(cmd, args, { cwd });
  ['stdout', 'stderr'].forEach(stream => {
    child[stream].on('data', checkStream(child, done, port));
  });
  return child;
};

const proc = ({ cwd, cmd, args, port }) => {
  let proc = null;
  return {
    run: done => proc = run({ proc, cwd, done, cmd, args, port })
  };
};

module.exports = proc;
