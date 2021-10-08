"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.installBuild = exports.installHusky = exports.installCZ = exports.installPrettier = exports.installESLint = void 0;
/**
 * 实现各个功能的安装方法
 */
var shell = __importStar(require("shelljs"));
var fs_1 = require("fs");
var common_1 = require("./common");
var chalk_1 = require("chalk");
/**
 * 安装 ESLint
 */
function installESLint() {
    shell.exec('npm i eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin -D');
    // 添加 .eslintrc.js
    var eslintrc = "module.exports = {\n   \"env\": {\n     \"es2021\": true,\n     \"node\": true\n   },\n   \"extends\": [\n     \"eslint:recommended\",\n     \"plugin:@typescript-eslint/recommended\"\n   ],\n   \"parser\": \"@typescript-eslint/parser\",\n   \"parserOptions\": {\n     \"ecmaVersion\": 12,\n     \"sourceType\": \"module\"\n   },\n   \"plugins\": [\n     \"@typescript-eslint\"\n   ],\n   \"rules\": {\n   }\n };\n   ";
    try {
        (0, fs_1.writeFileSync)('./.eslintrc.js', eslintrc, { encoding: 'utf-8' });
    }
    catch (err) {
        (0, common_1.printMsg)("" + (0, chalk_1.red)('Failed to write .eslintrc.js file content'));
        (0, common_1.printMsg)("" + (0, chalk_1.red)('Please add the following content in .eslintrc.js'));
        (0, common_1.printMsg)("" + (0, chalk_1.red)(eslintrc));
    }
    // 改写 package.json
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['eslint:comment'] =
        '使用 ESLint 检查并自动修复 src 目录下所有扩展名为 .ts 的文件';
    packageJson.scripts['eslint'] = 'eslint --fix src --ext .ts --max-warnings=0';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installESLint = installESLint;
/**
 * 安装 Prettier
 */
function installPrettier() {
    shell.exec('npm i prettier -D');
    // 添加 .prettierrc.js
    var prettierrc = "module.exports = {\n   // \u4E00\u884C\u6700\u591A 80 \u5B57\u7B26\n   printWidth: 80,\n   // \u4F7F\u7528 2 \u4E2A\u7A7A\u683C\u7F29\u8FDB\n   tabWidth: 2,\n   // \u4E0D\u4F7F\u7528 tab \u7F29\u8FDB\uFF0C\u800C\u4F7F\u7528\u7A7A\u683C\n   useTabs: false,\n   // \u884C\u5C3E\u9700\u8981\u6709\u5206\u53F7\n   semi: true,\n   // \u4F7F\u7528\u5355\u5F15\u53F7\u4EE3\u66FF\u53CC\u5F15\u53F7\n   singleQuote: true,\n   // \u5BF9\u8C61\u7684 key \u4EC5\u5728\u5FC5\u8981\u65F6\u7528\u5F15\u53F7\n   quoteProps: 'as-needed',\n   // jsx \u4E0D\u4F7F\u7528\u5355\u5F15\u53F7\uFF0C\u800C\u4F7F\u7528\u53CC\u5F15\u53F7\n   jsxSingleQuote: false,\n   // \u672B\u5C3E\u4F7F\u7528\u9017\u53F7\n   trailingComma: 'all',\n   // \u5927\u62EC\u53F7\u5185\u7684\u9996\u5C3E\u9700\u8981\u7A7A\u683C { foo: bar }\n   bracketSpacing: true,\n   // jsx \u6807\u7B7E\u7684\u53CD\u5C16\u62EC\u53F7\u9700\u8981\u6362\u884C\n   jsxBracketSameLine: false,\n   // \u7BAD\u5934\u51FD\u6570\uFF0C\u53EA\u6709\u4E00\u4E2A\u53C2\u6570\u7684\u65F6\u5019\uFF0C\u4E5F\u9700\u8981\u62EC\u53F7\n   arrowParens: 'always',\n   // \u6BCF\u4E2A\u6587\u4EF6\u683C\u5F0F\u5316\u7684\u8303\u56F4\u662F\u6587\u4EF6\u7684\u5168\u90E8\u5185\u5BB9\n   rangeStart: 0,\n   rangeEnd: Infinity,\n   // \u4E0D\u9700\u8981\u5199\u6587\u4EF6\u5F00\u5934\u7684 @prettier\n   requirePragma: false,\n   // \u4E0D\u9700\u8981\u81EA\u52A8\u5728\u6587\u4EF6\u5F00\u5934\u63D2\u5165 @prettier\n   insertPragma: false,\n   // \u4F7F\u7528\u9ED8\u8BA4\u7684\u6298\u884C\u6807\u51C6\n   proseWrap: 'preserve',\n   // \u6839\u636E\u663E\u793A\u6837\u5F0F\u51B3\u5B9A html \u8981\u4E0D\u8981\u6298\u884C\n   htmlWhitespaceSensitivity: 'css',\n   // \u6362\u884C\u7B26\u4F7F\u7528 lf\n   endOfLine: 'lf'\n };\n   ";
    try {
        (0, fs_1.writeFileSync)('./.prettierrc.js', prettierrc, { encoding: 'utf-8' });
    }
    catch (err) {
        (0, common_1.printMsg)("" + (0, chalk_1.red)('Failed to write .prettierrc.js file content'));
        (0, common_1.printMsg)("" + (0, chalk_1.red)('Please add the following content in .prettierrc.js'));
        (0, common_1.printMsg)("" + (0, chalk_1.red)(prettierrc));
    }
    // 改写 package.json
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['prettier:comment'] =
        '自动格式化 src 目录下的所有 .ts 文件';
    packageJson.scripts['prettier'] = 'prettier --write "src/**/*.ts"';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installPrettier = installPrettier;
/**
 * 安装 CZ，规范 git 提交信息
 */
function installCZ() {
    shell.exec('npx commitizen init cz-conventional-changelog --save --save-exact');
    shell.exec('npm i @commitlint/cli @commitlint/config-conventional -D');
    // 添加 commitlint.config.js
    var commitlint = "module.exports = {\n   extends: ['@commitlint/config-conventional']\n };\n   ";
    try {
        (0, fs_1.writeFileSync)('./commitlint.config.js', commitlint, { encoding: 'utf-8' });
    }
    catch (err) {
        (0, common_1.printMsg)("" + (0, chalk_1.red)('Failed to write commitlint.config.js file content'));
        (0, common_1.printMsg)("" + (0, chalk_1.red)('Please add the following content in commitlint.config.js'));
        (0, common_1.printMsg)("" + (0, chalk_1.red)(commitlint));
    }
    // 改写 package.json
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['commit:comment'] = '引导设置规范化的提交信息';
    packageJson.scripts['commit'] = 'cz';
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installCZ = installCZ;
/**
 * 安装 husky 和 lint-staged，以实现 git commit 时自动化校验
 * @param hooks，需要自动执行的钩子
 * @param lintStaged，需要钩子运行的命令
 */
function installHusky(hooks, lintStaged) {
    // 初始化 git 仓库
    shell.exec('git init');
    // 在安装 husky 和 lint-staged
    shell.exec('npm i husky lint-staged -D');
    // 设置 package.json
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson['husky'] = {
        hooks: __assign({ 'pre-commit': 'lint-staged' }, hooks),
    };
    packageJson['lint-staged'] = {
        '*.ts': lintStaged.map(function (item) { return "npm run " + item; }),
    };
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installHusky = installHusky;
/**
 * 安装构建工具，目前主要用于小项目，所以使用 typescript 原生的构建功能即可
 */
function installBuild(feature) {
    // 设置 package.json
    var packageJson = (0, common_1.readJsonFile)('./package.json');
    packageJson.scripts['build:comment'] = '构建';
    var order = '';
    if (feature.includes('ESLint')) {
        order += 'npm run eslint';
    }
    if (feature.includes('Prettier')) {
        order += ' && npm run prettier';
    }
    order += ' && rm -rf lib && tsc --build';
    packageJson.scripts['build'] = order;
    (0, common_1.writeJsonFile)('./package.json', packageJson);
}
exports.installBuild = installBuild;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zdGFsbEZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5zdGFsbEZlYXR1cmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0dBRUc7QUFDSCw2Q0FBaUM7QUFDakMseUJBQW1DO0FBQ25DLG1DQUE4RTtBQUM5RSwrQkFBNEI7QUFFNUI7O0dBRUc7QUFDSCxTQUFnQixhQUFhO0lBQzNCLEtBQUssQ0FBQyxJQUFJLENBQ1IsNEVBQTRFLENBQzdFLENBQUM7SUFDRixrQkFBa0I7SUFDbEIsSUFBTSxRQUFRLEdBQUcsa2FBb0JmLENBQUM7SUFDSCxJQUFJO1FBQ0YsSUFBQSxrQkFBYSxFQUFDLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ2xFO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixJQUFBLGlCQUFRLEVBQUMsS0FBRyxJQUFBLFdBQUcsRUFBQywyQ0FBMkMsQ0FBRyxDQUFDLENBQUM7UUFDaEUsSUFBQSxpQkFBUSxFQUFDLEtBQUcsSUFBQSxXQUFHLEVBQUMsa0RBQWtELENBQUcsQ0FBQyxDQUFDO1FBQ3ZFLElBQUEsaUJBQVEsRUFBQyxLQUFHLElBQUEsV0FBRyxFQUFDLFFBQVEsQ0FBRyxDQUFDLENBQUM7S0FDOUI7SUFFRCxrQkFBa0I7SUFDbEIsSUFBTSxXQUFXLEdBQUcsSUFBQSxxQkFBWSxFQUFjLGdCQUFnQixDQUFDLENBQUM7SUFDaEUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNuQyx5Q0FBeUMsQ0FBQztJQUM1QyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLDZDQUE2QyxDQUFDO0lBQzlFLElBQUEsc0JBQWEsRUFBYyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBeENELHNDQXdDQztBQUVE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