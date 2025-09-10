import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

/**
 * Los endpoints de la API REST de Express pueden ser definidos aquí.
 * Descomenta y define endpoints según sea necesario.
 *
 * Ejemplo:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Manejar petición de API
 * });
 * ```
 */

/**
 * Servir archivos estáticos desde /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Manejar todas las demás peticiones renderizando la aplicación Angular.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Iniciar el servidor si este módulo es el punto de entrada principal.
 * El servidor escucha en el puerto definido por la variable de entorno `PORT`, o por defecto en el 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Manejador de peticiones usado por Angular CLI (para dev-server y durante build) o Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
