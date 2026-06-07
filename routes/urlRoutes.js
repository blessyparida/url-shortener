const express =
require("express");

const router =
express.Router();

const {
createShortURL,redirectURL,analytics
}
=
require(
"../controllers/urlController"
);
const limiter =
require(
"../middleware/rateLimit"
);

router.post(

"/shorten",

limiter,

createShortURL

);
router.get(
"/:code",
redirectURL
);
router.get(
"/analytics/:code",
analytics
);
module.exports =
router;