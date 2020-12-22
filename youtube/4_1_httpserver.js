const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>hello world</h1');
    res.write('<p>hello node</p>');
    res.end('<p>hello kevin</p>');
})
    .listen(8080, () => {
        console.log('8080 connecting');
    });
server.on('listening', () => {
    console.log('8080 listening....')
});
server.on('error', (error) => {
    console.error(error);
})