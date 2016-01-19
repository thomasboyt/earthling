/*eslint-env mocha */

import expect from 'expect';
import {spawnSync} from 'child_process';
import path from 'path';
import {sync as mkdirpSync} from 'mkdirp';
import {sync as rimrafSync} from 'rimraf';

import exists from '../src/util/exists';

/*
 * Really dumb integration test.
 *
 * 1. `earthling init temp-folder`
 * 2. `earthling build`
 * 3. exit code 0 = pass
 */

const earthlingPath = path.join(__dirname, '../bin/earthling');

const projectPath = path.join(process.cwd(), '_integration_temp/');

describe('earthling template', function() {
  this.timeout(0);

  it('can be created and built', () => {
    if (exists(projectPath)) {
      rimrafSync(projectPath);
    }

    mkdirpSync(projectPath);

    const initProc = spawnSync(earthlingPath, ['init', projectPath, '--force'], {
      stdio: ['ignore', process.stdout, process.stderr],
      encoding: 'utf-8'
    });
    expect(initProc.status).toEqual(0);

    // We use Firefox here so we can run this test on Travis w/ no extra configuration
    const testProc = spawnSync(earthlingPath, ['test', '--single-run', '--browsers', 'Firefox'], {
      cwd: projectPath,
      stdio: 'inherit',
      encoding: 'utf-8'
    });
    expect(testProc.status).toEqual(0);

    rimrafSync(projectPath);
  });
});
