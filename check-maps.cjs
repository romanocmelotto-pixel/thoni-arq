const https = require('https');

function follow(url) {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            console.log('Redirecting to:', res.headers.location);
            follow(res.headers.location);
        } else {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                const title = data.match(/<title>([^<]*)<\/title>/i);
                console.log('FINAL TITLE:', title ? title[1] : 'not found');
                
                // Match schema or interesting text
                const matches = data.match(/Thoni Arquitetura[^"]{0,300}/gi) || [];
                console.log('MATCHES:', matches.slice(0, 5));
            });
        }
    });
}

follow('https://maps.app.goo.gl/tUGAqpUQKQWyYbN77');
