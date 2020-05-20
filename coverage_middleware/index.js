var express = require('express'),
    im = require('istanbul-middleware'),
    isCoverageEnabled = true,
    app = express(),
    port = 9999;

// add the coverage handler
console.log('Coverage reporting at /coverage');
app.use('/coverage', im.createHandler({ verbose: true, resetOnGet: true }));

console.log('Starting server at: http://127.0.0.1:' + port + '/coverage');
app.listen(port);
