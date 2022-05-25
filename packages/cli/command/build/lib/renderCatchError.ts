import { existsSync } from "fs";
import JoyCon from "joycon";
import { resolve } from "path";

const joy = new JoyCon({
  files: [
    "src/plugins/catch-error.js",
    "src/plugins/catch-error.mjs",
    "src/plugins/catch-error.cjs",
    "src/plugins/catch-error.ts",
    "src/plugins/catch-error.cts",
    "src/plugins/catch-error.mts",
    "src/plugins/catch-error.mts",
    "src/plugins/catch-error.jsx",
    "src/plugins/catch-error.tsx",
  ],
});

export default function renderCatchError(isDev: boolean) {
  const cwd = process.cwd()
  const fileCatchError = joy.resolveSync(joy.options.files, cwd);

  if (fileCatchError) {
    return `import plugins__catch_error from "../${resolve(cwd, fileCatchError)}"

app.use(plugins__catch_error)
`
  }

  if (isDev) {
    return `import { inspect } from "util"
app.use((error, req, res, next) => {
  res.end(\`
<!DOCTYPE html>
<html>
  <head>
    <title>Server Error</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <code style="white-space: pre">\$\{inspect(error)\}</code>
  </body>
</html>
\`)
  next()
})`
  }

  return `app.use((error, req, res, next) => {
  next()
})`
}
