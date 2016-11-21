const spawn = require('child_process').spawn;
const { thread, ifn } = require('fun-util');

const checkStream = (done, port) => thread(String, message => {
  if (message.match(/port/) && message.match(new RegExp(port))) {
    done();
  }
});

const run = ({ process, cwd, done, cmd, args, port }) => {
  if (process) {
    process.kill('SIGINT');
  }
  const child = spawn(cmd, args, { cwd });
  ['stdout', 'stderr'].forEach(stream => {
    child[stream].on('data', checkStream(done, port));
  });
  return child;
};

const process = ({ cwd, cmd, args, port }) => {
  let process = null;
  return {
    run: done => process = run({ process, cwd, done, cmd, args, port })
  };
};

module.exports = process;
