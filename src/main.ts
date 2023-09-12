import * as favicon from 'serve-favicon';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import helmet from 'helmet';

class BootstrapApp {
  private app: express.Application;
  private port: number;
  private name: string | undefined;

  public constructor() {
    this.app = express();
    this.port = Number(process.env.API_PORT) || 3050;
    this.name = process.env.API_NAME;
    this.setupMiddlewares();
  }

  private setupMiddlewares(): void {
    this.app.use(favicon(__dirname + '/../img/nestjs.ico'));
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        contentSecurityPolicy: {
          directives: {
            imgSrc: [
              `'self'`,
              'data:',
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
            manifestSrc: [
              `'self'`,
              'apollo-server-landing-page.cdn.apollographql.com',
            ],
            frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
          },
        },
      }),
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private async bootstrap() {
    const httpAdapter = new ExpressAdapter(this.app);
    const app = await NestFactory.create(AppModule, httpAdapter);
    app.useGlobalPipes();

    const config = new DocumentBuilder()
      .setTitle(`${this.name} API`)
      .setDescription(`Description of our ${this.name} API`)
      .setVersion('1.0.0')
      .addServer(`http://localhost:${this.port}`)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    await app.init();
    return app;
  }

  public async start(): Promise<void> {
    await this.bootstrap();
    this.app.listen(this.port, () => {
      console.log(
        `The server is available at url http://127.0.0.1:${this.port} 🤓`,
      );
    });
  }
}

const bootstrapApp = new BootstrapApp();
bootstrapApp.start();
