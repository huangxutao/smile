const Utils = require('./utils');

module.exports = function () {
    Utils.checkPath().then((path) => {
        Utils.chooseLib().then((libName) => {
            Utils.cloneTemplate().then(() => {
                console.log('clone into', path, ' ➜ ', libName)
            })
        });
    });
};