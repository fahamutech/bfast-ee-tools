#!/usr/bin/env node
const os = require('os');
const path = require('path');
const file = require('fs-extra');
const BfastTools = require('./bfast.cli');
const bfast = new BfastTools();
(function () {
    const path = path.join(`${os.homedir()}`,'bfast-tools');
    if (file.existsSync(path)) {
        return;
    }
    file.mkdirsSync(path);
})();
bfast.start();
