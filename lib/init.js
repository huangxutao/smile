const chalk = require('chalk');
const { exec } = require('child_process');
const {
    isEmptyFolder,
    chooseLibrary,
    fetchTemplates,
    chooseTemplate,
    cloneTemplate,
    installDependencies,
    startProject,
    getProjectInfo,
    rewriteProjectInfo
} = require('./utils');

module.exports = async function init(path) {
    const currPath = path || process.cwd();
    const emptyFolder = isEmptyFolder(currPath);

    // 检测目标路径是否可用
    if (!emptyFolder) {
        const str = chalk.yellow.bold(`🚫 Target directory has files, please choose other directory!!`);
        console.log(str);
        return;
    }

    // 所需技术选型
    const projectInfo = await getProjectInfo();
    const library = await chooseLibrary([ 'Vue', 'React' ]);

    // 获取并下载模板
    const templates = await fetchTemplates(library);

    if (templates && !templates.length) {
        const str = chalk.yellow.bold('👻 No template!');
        console.log(str);
        return;
    }

    const template = await chooseTemplate(templates);
    const cloneResult = await cloneTemplate(template, path, projectInfo);
    const rewriteResult = await rewriteProjectInfo(path + '/package.json', projectInfo)

    if (cloneResult === 'success' && rewriteResult === 'success') {
        const installResult = await installDependencies(path);

        if (installResult === 'success') {
            // await startProject(path);
            const str = chalk.green.bold('✔  Successed !\n🚀 npm start >> to run project.');
            console.log(str);
        }
    }
};