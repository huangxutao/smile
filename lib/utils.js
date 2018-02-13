const fs = require('fs');
const path = require('path');
const colors = require('colors');
const inquirer = require('inquirer');

/**
 * 检测目录是否为空
 * @param {String} path 
 */
function _isEmptyFolder (path) {
    let empty = true;
    // console.log('当前目录：', path)

    if (fs.existsSync(path)) {
        const result = fs.readdirSync(path);
        empty = !(result && result.length)
    }

    // console.log('目录为空：', empty)
    return empty;
}

/**
 * 确认目标目录
 */
function checkPath () {
    return new Promise ((resolve, reject) => {
        const currPath = process.cwd();

        if (_isEmptyFolder(currPath)) {
            console.log(`⚠️  ⚠️  ⚠️   Target directory has files, please choose other directory!  ⚠️  ⚠️  ⚠️ 
                \nexit!!`.bold.yellow);
            return;
        }

        resolve(currPath);
    });
}

/**
 * 选择 Vue or React
 */
function chooseLib () {
    return new Promise ((resolve, reject) => {
        inquirer.prompt([{
            type: 'list',
            name: 'library',
            message: 'Which library to build ?',
            choices: [ 'Vue', 'React' ]
        }]).then((answers) => {
            resolve(answers.library)
        });
    });
}

/**
 * clone 模板
 */
function cloneTemplate () {
    return new Promise((resolve, reject) => {
        resolve();
    });
}

/**
 * 
 */
function run () {

}

exports = Object.assign(exports, {
    checkPath,
    chooseLib,
    cloneTemplate
});