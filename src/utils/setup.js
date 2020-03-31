const fs = require("fs-extra");

fs.createReadStream(".env.example")
  .pipe(fs.createWriteStream(".env"));
