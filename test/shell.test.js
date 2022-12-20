const { spawn } = require("child_process");
const { join } = require("path");

// tests
const runTest = async () => {
  const childProcess = spawn("node", ["./bin/firebase-cli.js"], {
    cwd: join(__dirname, ".."),
  });
  childProcess.stdout.on("data", (data) => {
    console.log(`${data}`);
  });
  childProcess.stderr.on("data", (data) => {
    console.error(`${data}`);
  });
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  console.log('run');
  childProcess.stdin.write(Buffer.from("exit()"));
  await new Promise((res) => {
    setTimeout(res, 200);
  });
  childProcess.stdin.write(Buffer.from("\r"));
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  console.log('com');
  console.log('res', childProcess);
  return childProcess.exitCode;
};

// test timeout (for safety)
setTimeout(() => {
  console.error("Timeout.");
  process.exit(1);
}, 10000);

// run tests
runTest()
  .then((code) => {
    if (code !== 0) {
      console.error(`Exit code: ${code}`);
      process.exit(1);
    }
    console.info(`Completed.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });
