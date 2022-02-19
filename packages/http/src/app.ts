import 'reflect-metadata';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import hpp from 'hpp';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@databases';
import { authMiddleware, authChecker } from '@middlewares/auth.middleware';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, responseLogger, errorLogger } from '@utils/logger';
import { CatalogPatch } from '@/patch/data/catalog.patch';
import { ProductPatch } from '@/patch/data/product.patch';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(resolvers) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    if (Array.isArray(resolvers) && resolvers.length > 0) this.connectToDatabase();
    this.initializeMiddlewares();
    if (Array.isArray(resolvers) && resolvers.length > 0) this.initApolloServer(resolvers);
    this.initializeErrorHandling();
  }

  public async listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`🎮 http://localhost:${this.port}/graphql`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await createConnection(dbConnection);
      this.migrateData();
    } catch (e) {
      console.error('connect db error', e);
    }
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private async initApolloServer(resolvers) {
    try {
      const schema = await buildSchema({
        resolvers: resolvers,
        authChecker: authChecker,
      });

      const apolloServer = new ApolloServer({
        schema: schema,
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground],
        context: async ({ req }) => {
          try {
            const user = await authMiddleware(req);
            return { user };
          } catch (error) {
            throw new Error(error);
          }
        },
        formatResponse: (response, request) => {
          responseLogger(request);

          return response;
        },
        formatError: error => {
          errorLogger(error);

          return error;
        },
        // introspection: true,
      });

      await apolloServer.start();
      apolloServer.applyMiddleware({ app: this.app, cors: true, path: '/graphql' });
    } catch (e) {
      console.error('Init Apollo Error', e);
    }
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private migrateData() {
    new CatalogPatch().run();
    new ProductPatch().run();
  }
}

export default App;
