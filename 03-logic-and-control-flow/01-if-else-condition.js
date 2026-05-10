
let failedTests = 2;
let suiteStatus;

if (failedTests === 0) {
  suiteStatus = "PASS";
} else if (failedTests <= 2) {
  suiteStatus = "WARNING";
} else {
  suiteStatus = "FAIL";
}

console.log(suiteStatus);