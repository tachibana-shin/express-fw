import express, { Express } from "express";

import { useBoot, useRouter } from "..";
import { warn } from "../helpers/log";
import rootConfigs from "../helpers/root-configs";

// eslint-disable-next-line functional/no-let
let app: Express;
export function createApp(port = rootConfigs.port || "3000"): Express {
  const appRoot = require.main.path//

  if (!app) {
    app = express();

    // install boot
    useBoot(app, appRoot);
    // install router & middleware
    useRouter(app, appRoot);

    app.listen(port, () => {
      console.log(`⚡️ App it running on port ${port}`);
    });
  } else {
    warn("Can't initial app because app is exists.");
  }

  return app;
}