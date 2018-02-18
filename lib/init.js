const chalk = require('chalk');
const { exec } = require('child_process');
const {
    isEmptyFolder,
    chooseLibrary,
    fetchTemplates,
    chooseTemplate,
    cloneTemplate,
    installDependencies,
    startProject
} = require('./utils');

module.exports = async function init(path) {
    const currPath = path || process.cwd();
    const emptyFolder = isEmptyFolder(currPath);

    // 当前命令所在路径目录为空
    if (!emptyFolder) {
        const str = chalk.yellow.bold(`🚫 Target directory has files, please choose other directory!!`);
        console.log(str);
        return;
    }

    // 不为空的后续
    const library = await chooseLibrary([ 'Vue', 'React' ]);
    const templates = await fetchTemplates(library);

    if (templates && !templates.length) {
        const str = chalk.yellow.bold('👻 No template!');
        console.log(str);
        return;
    }

    const template = await chooseTemplate(templates);
    const cloneResult = await cloneTemplate(template, path);

    if (cloneResult === 'success') {
        const installResult = await installDependencies(path);

        if (installResult === 'success') {
            // await startProject(path);
            const str = chalk.green.bold('✔  Successed !\n🚀 npm start >> to run project.');
            console.log(str);
        }
    }
};