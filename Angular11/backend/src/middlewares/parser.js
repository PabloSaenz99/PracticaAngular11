const parser = (req, res, next) => {
    time = responseTime(process.hrtime());
    console.log(" -----------------------------------------------------------------------------------------------");
    console.log(`\x1b[33m Request method: ${req.method}`);
    console.log(` Request url: ${req.url}`);
    console.log(`\x1b[35m Request params: ${JSON.stringify(req.params)}`);
    console.log(`\x1b[35m Request body: ${JSON.stringify(req.body)}`);
    console.log(`\x1b[35m Result cookies: ${JSON.stringify(req.cookies)}`);

    console.log(`\x1b[34m Result status code: ${res.statusCode}`);
    console.log(`\x1b[34m Response time: ${time}ms`);
    console.log(" -----------------------------------------------------------------------------------------------");

    next();
}

const responseTime = start => {
  const NS_PER_SEC = 1e9;     // convert to nanoseconds
  const NS_TO_MS = 1e6;       // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

module.exports = parser;