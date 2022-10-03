import { statSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path/posix";

/**
 * @type {string}
 */
const sw = readFileSync('./service-worker/sw.js', 'utf-8')
const version = new Date().getTime()

function generateForScope(scope) {
  const files = getDirFiles(`./dist/${scope}`, `/${scope}`)
  const fileReplacement = `"${files.join('","')}"`

  const code = sw.replaceAll('/*sw-version*/', version)
   .replaceAll('/*sw-scope*/', scope)
   .replaceAll('/*sw-files*/', fileReplacement)

  writeFileSync(`./dist/${scope}/sw.js`, code)
}

function getDirFiles(dir, prepend) {
  return readdirSync(dir).flatMap(file => {
      const fileObj = join(dir, file);
      const newPrepend = join(prepend, file)

      if (statSync(fileObj).isDirectory()) {
        return getDirFiles(fileObj, newPrepend);
      } else {
        return newPrepend;
      }
  });
}

generateForScope('login')
generateForScope('veranstaltung')
generateForScope('verwaltung')