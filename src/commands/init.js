import {template as compileTemplate} from 'lodash';
import path from 'path';
import {readFileSync, writeFileSync} from 'fs';
import {sync as mkdirpSync} from 'mkdirp';
import {execSync} from 'child_process';

import recursive from 'recursive-readdir';
import inquirer from 'inquirer';

import exists from '../util/exists';
import promiseWrap from '../util/promiseWrap';

const templateDir = path.join(__dirname, '../../template');

const recursiveP = promiseWrap(recursive);

function showPrompt(question) {
  return new Promise((resolve) => {
    question.name = '_';

    if (!process.stdin.isTTY) {
      // we're in a test or some other non-interactive environment, so just return a default
      resolve(question.default || '');
      return;
    }

    inquirer.prompt([question], (answers) => resolve(answers._));
  });
}

// thx ember-cli https://github.com/ember-cli/ember-cli/blob/master/lib/models/file-info.js
function processTemplate(content, context) {
  // default options include some weird extra shit that conflicts w/ template strings D:
  const options = {
    evaluate:    /<%([\s\S]+?)%>/g,
    interpolate: /<%=([\s\S]+?)%>/g,
    escape:      /<%-([\s\S]+?)%>/g
  };

  return compileTemplate(content, options)(context);
}

export default async function(outPath, options) {
  if (!options.force) {
    if (exists(outPath)) {
      console.log(`Destination ${outPath} already exists; refusing to build.`);
      console.log('Use --force to override.');
      return;
    }
  }
  const name = await showPrompt({
    type: 'input',
    message: 'Project name?',
    default: 'New Earthling Project',
  });

  const slug = await showPrompt({
    type: 'input',
    message: 'Project slug/NPM package name?',
    default: 'new-earthling-project',
  });

  const templateData = {
    name,
    slug,
    earthlingVersion: require('../../package').version
  };

  // Read template files
  const files = await recursiveP(templateDir);

  files.forEach((file) => {
    const content = processTemplate(readFileSync(file, {encoding: 'utf-8'}), templateData);

    const relPath = path.relative(templateDir, file);
    const dirname = path.dirname(relPath);

    let basename = path.basename(relPath);

    if (basename.startsWith('_')) {
      basename = basename.replace('_', '.');
    }

    const dirOutPath = path.join(path.resolve(process.cwd(), outPath), dirname);
    const fileOutPath = path.join(dirOutPath, basename);

    mkdirpSync(dirOutPath);

    writeFileSync(fileOutPath, content, {encoding: 'utf-8'});
  });

  const fullPath = path.resolve(outPath);

  console.log(`Created new Earthling project in ${fullPath}.`);

  const shouldNPMInstall = await showPrompt({
    type: 'confirm',
    message: 'Run npm install?',
    default: true
  });

  if (shouldNPMInstall) {
    execSync('npm install', {
      cwd: fullPath,
      stdio: 'inherit'
    });
  }
}
