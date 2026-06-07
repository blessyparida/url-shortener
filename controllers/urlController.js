const {
    shortenURL,getOriginalURL,
} = require("../services/urlServices");
const {
trackClick,getAnalytics
}
=
require(
"../services/analyticsService"
);

async function createShortURL(req,res){

    try{

        const { url } = req.body;

        if(!url){

            return res.status(400).json({
                message:"URL required"
            });

        }

        const data =
        await shortenURL(url);

        res.status(201).json({
            success:true,
            data
        });

    }

    catch(error){

        console.log(error);

        res.status(500).json({
            success:false
        });

    }

}

async function redirectURL(
req,
res
){

try{

const {
code
}
=
req.params;

const data =
await getOriginalURL(
code
);

if(!data){

return res
.status(404)
.json({
message:
"Not found"
});

}
await trackClick(
code
);
res.redirect(
data.original_url
);

}

catch(error){

console.log(
error
);

res
.status(500)
.json({
success:false
});

}

}

async function analytics(
req,
res
){

try{

const {
code
}
=
req.params;

const result =
await getAnalytics(
code
);

res.json({

shortCode:
code,

totalClicks:
result.total

});

}

catch(error){

console.log(
error
);

res.status(500)
.json({
success:false
});

}

}

module.exports = {
    createShortURL,
    redirectURL,
    analytics
};