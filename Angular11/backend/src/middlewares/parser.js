const parser = (req, res, next) => {
    time = responseTime(process.hrtime());
    console.log(`Request method: ${req.method}`);
    console.log(`Request url: ${req.url}`);
    console.log(`Request params: ${req.params}`);
    
    console.log(`Result status code: ${res.statusCode}`);
    console.log(`Response time: ${time}ms`);
    next();
}

const responseTime = start => {
    const NS_PER_SEC = 1e9;     //  convert to nanoseconds
    const NS_TO_MS = 1e6;       // convert to milliseconds
    const diff = process.hrtime(start);
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  };

module.exports = parser;