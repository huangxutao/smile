const chalk = require('chalk');
const {
    isEmptyFolder,
    chooseLibrary,
    fetchTemplates,
    chooseTemplate,
    cloneTemplate
} = require('./utils');

module.exports = async function init() {
    const currPath = process.cwd();
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
    const template = await chooseTemplate(templates);

    await cloneTemplate(template);
};