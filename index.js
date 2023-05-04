const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = express();

server.get('/', async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
      <head>
        <title>Node Benchmark</title>
      </head>
      <body>
        <main>
          <h1>Node Benchmark</h1>
          <p>Current time: ${new Date().toISOString()}</p>
          <p>Request to render time (ms): <span id='render-time' /></p>
          
          <script>
            const renderTime = new Date() - performance.timing.requestStart
            document.getElementById('render-time').innerText = renderTime.toString()
            console.log('Render time (ms):', renderTime)
          </script>
        </main>
      </body>
    </html>
    `);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
