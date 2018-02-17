const fs = require('fs');
const path = require('path');
const request = require('request');
const ora = require('ora');
const download = require('download-git-repo');
const colors = require('colors');
const inquirer = require('inquirer');

/**
 * 检测目录是否为空
 * @param {String} path 
 */
function isEmptyFolder (path) {
    let empty = true;

    if (fs.existsSync(path)) {
        const result = fs.readdirSync(path);
        empty = !result.length;
    }

    return empty;
}

/**
 * 选择 Vue or React
 * @param {Array} librarys
 */
function chooseLibrary (librarys = [ 'Vue', 'React' ]) {
    return new Promise ((resolve, reject) => {
        inquirer.prompt([{
            type: 'list',
            name: 'library',
            message: 'Which library to build ?',
            choices: librarys
        }]).then((answers) => {
            resolve(answers.library)
        });
    });
}

/**
 * Fetch templates
 * @param {String} library
 */
function fetchTemplates (library = 'react') {
    const spinner = ora('fetch template list...');
    const option = {
        url: 'https://api.github.com/users/huangxutao/repos',
        headers: { 'User-Agent': 'tpl' }
    };

    return new Promise((resolve, reject) => {
        const handleResponse = async (err, res, body) => {
            const resBody = JSON.parse(body);
            const tpls = [];
    
            spinner.stop();
            // 筛选符合条件的
            resBody.forEach((repo) => {
                const reg = new RegExp(`^tpl-${library.toLocaleLowerCase()}`);
    
                if (reg.test(repo.name)) {
                    tpls.push({
                        name: `${repo.name}    ${repo.description}`,
                        repoName: repo.name,
                        owner: repo.owner.login
                    });
                }
            });
            resolve(tpls);
        };
        
        request(option, handleResponse);
    });
}

/**
 * 模板选择
 * @param {Array} templates 
 */
function chooseTemplate (templates) {
    return new Promise ((resolve, reject) => {
        inquirer.prompt([{
            type: 'list',
            name: 'template',
            message: 'Which template to init ?',
            choices: templates
        }]).then((answers) => {
            templates.forEach((tpl) => {
                if (tpl.name === answers.template) {
                    resolve(tpl);
                    return;
                }
            });
        });
    });
}

/**
 * clone 模板
 * @param {Object} tpl
 */
function cloneTemplate (tpl) {
    return new Promise((resolve, reject) => {
        const spinner = ora('downloading template...').start();

        download(`${tpl.owner}/${tpl.repoName}`, `./test/tmp/${tpl.repoName}`, { clone: true }, function (err) {
            spinner.stop();
            console.log(err ? 'Error' : '✔ Download successed !'.bold.green)
        })
    });
}

exports = Object.assign(exports, {
    isEmptyFolder,
    chooseLibrary,
    fetchTemplates,
    chooseTemplate,
    cloneTemplate
});