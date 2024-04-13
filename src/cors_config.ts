const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

const allowedDomains = process.env.ALLOWED_URLS!.split(",");

const options = {
  origin: (origin: any, callback: Function) => {
    if (allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      throw {
        status: 403,
        msg: "CORS authentication failed",
      };
    }
  },
};

module.exports = options;
