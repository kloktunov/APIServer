var url = require('url');

var urls = [
    'http://api.domain.com:3000',
    'http://domain.com/index?pass=gas',
    'http://domain.com/',
    'https://sdfasfasf.co'
];

for (x in urls) {
    var domain = url.parse(urls[x]).hostname;
    var domainRegex = /[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

	console.log(domain + ":" + domainRegex.test(domain));
}