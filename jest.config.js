module.exports = {
    // Set the maximum number of worker processes to use. For example, 4 workers:
    maxWorkers: 4,
    reporters: [
      "default", // keep the default reporter for console output
      ["jest-html-reporter", {
        "pageTitle": "Test Report",
        "outputPath": "test-report.html", // Output file path for the HTML report
        "includeFailureMsg": true, // Include detailed failure messages
        "includeConsoleLog": true, // Include console logs
        "sort": "titleAsc" // Sorts the test results by title in ascending order
      }]
    ]
  };
  