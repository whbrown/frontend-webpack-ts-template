/**
 * Required External Modules
 */

// import dotenv = require('dotenv');
// const process = require('dotenv').config()
// import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

// dotenv.config();

/**
 * App Variables
 */
// if (!process.env.PORT) {
//   process.exit(1);
// }

// const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

const server = app.listen(7000, () => {
  console.log(`Listening on port ${7000}`);
});

/**
 * Webpack HMR Activation
 */


type ModuleId = string | number;

interface WebpackHotModule {
  hot?: {
    data: unknown;
    accept(
      dependencies: string[],
      callback?: (updatedDependencies: ModuleId[]) => void,
    ): void;
    accept(dependency: string, callback?: () => void): void;
    accept(errHandler?: (err: Error) => void): void;
    dispose(callback: (data: unknown) => void): void;
  };
}

declare const module: WebpackHotModule;

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.close());
}