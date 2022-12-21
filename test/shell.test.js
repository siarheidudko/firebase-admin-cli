const { spawn } = require("child_process");
const { join } = require("path");

// tests
const runTest = async () => {
  const childProcess = spawn(
    "node",
    [join(__dirname, "..", "./bin/firebase-cli.js")],
    {
      cwd: join(__dirname, ".."),
      env: process.env,
    }
  );
  const childProcExitEvent = new Promise((res) => {
    childProcess.once("exit", (code) => {
      res(code);
    });
  });
  childProcess.stderr.on("data", (data) => {
    console.error(`${data}`);
  });
  const childProcStartEvent = new Promise((res) => {
    let resolved = false;
    childProcess.stdout.on("data", (data) => {
      console.info(`${data}`);
      if (!resolved && /Firebase Admin CLI \(.*\)>/i.test(`${data}`)) {
        resolved = true;
        res();
      }
    });
  });
  await childProcStartEvent;
  childProcess.stdin.write(Buffer.from("exit()"));
  // multiline input delay
  await new Promise((res) => {
    setTimeout(res, 200);
  });
  childProcess.stdin.write(Buffer.from("\r"));
  return await childProcExitEvent;
};

// test timeout (for safety)
setTimeout(() => {
  console.error("Timeout.");
  process.exit(1);
}, 30000);

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
