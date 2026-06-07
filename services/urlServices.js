const pool = require("../db/db");
const generateCode = require("../utils/generateCode");
const redis =
require("../config/redis");

async function shortenURL(originalUrl) {

    const shortCode = generateCode();

    const result = await pool.query(
        `
        INSERT INTO urls
        (original_url, short_code)

        VALUES ($1,$2)

        RETURNING *
        `,
        [originalUrl, shortCode]
    );

    return result.rows[0];
}

async function getOriginalURL(
shortCode
){

const cached =
await redis.get(
shortCode
);

if(cached){

console.log(
"REDIS HIT"
);

return cached;

}

console.log(
"DB HIT"
);

const result =
await pool.query(

`
SELECT *
FROM urls

WHERE short_code=$1
`,

[shortCode]

);

if(
!result.rows.length
){

return null;

}

const data =
result.rows[0];

await redis.set(

shortCode,

data,

{
ex:300
}

);

return data;

}
module.exports = {
    shortenURL,
    getOriginalURL
};