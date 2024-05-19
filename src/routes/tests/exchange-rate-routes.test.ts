import { describe, it, expect, vi } from 'vitest';
import { Router } from 'express';

import router from '../exchange-rate-routes';
import * as controllers from '../../controllers';

describe('Express Router', () => {
  it('should define routes for /rate and /subscribe', () => {
    const expressRouter = Router();

    expressRouter.get('/rate', controllers.getRate);
    expressRouter.post('/subscribe', controllers.subscribe);

    const routerPaths = router.stack.map((layer) => layer.route?.path);
    const expressRouterPaths = expressRouter.stack.map((layer) => layer.route?.path);

    expect(routerPaths).toEqual(expressRouterPaths);
  });

  it('should use correct controller for /rate', () => {
    const expressRouter = Router();

    expressRouter.get('/rate', controllers.getRate);

    const route = router.stack.find((r) => r.route?.path === '/rate');

    expect(route?.route?.stack[0].handle.toString()).toEqual(controllers.getRate.toString());
  });

  it('should use correct controller for /subscribe', () => {
    const expressRouter = Router();

    expressRouter.post('/subscribe', controllers.subscribe);

    const route = router.stack.find((r) => r.route?.path === '/subscribe');

    expect(route?.route?.stack[0].handle.toString()).toEqual(controllers.subscribe.toString());
  });
});
