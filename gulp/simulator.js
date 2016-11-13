const spawn = require('child_process').spawn;
const { thread, ifn } = require('fun-util');

const checkStream = done => thread(String, message => {
  if (message.match(/port/) && message.match(/3000/)) {
    done();
  }
});

const run = ({ simulator, cwd, done }) => {
  if (simulator) {
    simulator.kill('SIGINT');
  }
  const child = spawn('rackup', ['-p', '3000'], { cwd });
  child.stdout.on('data', checkStream(done));
  child.stderr.on('data', checkStream(done));
  return child;
};

const simulator = cwd => {
  let simulator = null;
  return {
    run: done => simulator = run({ simulator, cwd, done })
  };
};

module.exports = simulator;
