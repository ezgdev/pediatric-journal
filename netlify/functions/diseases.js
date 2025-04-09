const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const query = event.queryStringParameters.query || 'flu';

    const url = `https://api.api-ninjas.com/v1/diseases?name=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Api-Key': 'wAxA8KC3UJuldUhLfNrZjw==vx9u5aqPX3Sfs4sV'
            }
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al obtener datos de API Ninja.' })
        };
    }
};