const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = express();

const complicatedFunc = async () => {

  for (let i = 0; i < 20; i++) {
    const file = fs.readFileSync('large-file-0.json', 'utf8')
    const data = JSON.parse(file)
  }
}

server.get('/', async (req, res) => {
  let error = ''
  try {
    await complicatedFunc();
  }
  catch (err) {
    console.error(err);
    error = err;
  }
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
          <p>Error: ${error}</p>
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
