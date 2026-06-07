const pool =
require("../db/db");

async function trackClick(
shortCode
){

await pool.query(

`
INSERT INTO analytics
(short_code)

VALUES ($1)
`,

[shortCode]

);

}

async function getAnalytics(
shortCode
){

const result =
await pool.query(

`
SELECT
COUNT(*) AS total
FROM analytics

WHERE short_code=$1
`,

[shortCode]

);

return result.rows[0];

}

module.exports = {
trackClick,getAnalytics
};