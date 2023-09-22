import { createRequest, createResponse } from 'node-mocks-http';
import { createNextRoutes } from './index';

describe('Testing my-routing-library', () => {
  it('should handle GET request', () => {
    const routes = {
      get(req, res) {
        res.status(200).json({ message: 'GET success' });
      },
    };
    const request = createRequest({
      method: 'GET',
      url: '/test-route',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(200);
    expect(JSON.parse(response._getData())).toEqual({ message: 'GET success' });
  });

  it('should handle POST request', () => {
    const routes = {
      post(req, res) {
        res.status(201).json({ message: 'POST success' });
      },
    };
    const request = createRequest({
      method: 'POST',
      url: '/test-route',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(201);
    expect(JSON.parse(response._getData())).toEqual({
      message: 'POST success',
    });
  });

  it('should handle PUT request', () => {
    const routes = {
      put(req, res) {
        res.status(204).send();
      },
    };
    const request = createRequest({
      method: 'PUT',
      url: '/test-route',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(204);
    expect(response._getData()).toBeFalsy();
  });

  it('should handle DELETE request', () => {
    const routes = {
      delete(req, res) {
        res.status(200).json({ message: 'DELETE success' });
      },
    };
    const request = createRequest({
      method: 'DELETE',
      url: '/test-route',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(200);
    expect(JSON.parse(response._getData())).toEqual({
      message: 'DELETE success',
    });
  });

  it('should handle PATCH request', () => {
    const routes = {
      patch(req, res) {
        res.status(400).json({ error: 'Bad Request' });
      },
    };
    const request = createRequest({
      method: 'PATCH',
      url: '/test-route',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(400);
    expect(JSON.parse(response._getData())).toEqual({
      error: 'Bad Request',
    });
  });

  it('should handle OPTIONS request', () => {
    const routes = {
      options(req, res) {
        res.setHeader('Allow', 'GET, POST, PUT, DELETE');
        res.status(204).send();
      },
    };
    const request = createRequest({
      method: 'OPTIONS',
      url: '/test-route',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(204);
    expect(response._getHeaders()).toHaveProperty(
      'allow',
      'GET, POST, PUT, DELETE'
    );
  });

  it('should handle HEAD request', () => {
    // Assume a resource exists, and we provide metadata
    const routes = {
      head(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Length', '42');
        res.status(200).send(); // HEAD response doesn't contain a body
      },
    };
    const request = createRequest({
      method: 'HEAD',
      url: '/test-resource',
    });
    const response = createResponse();

    const handler = createNextRoutes(routes);
    handler(request, response);

    expect(response._getStatusCode()).toBe(200);
    expect(response._getHeaders()).toHaveProperty(
      'content-type',
      'application/json'
    );
    expect(response._getHeaders()).toHaveProperty('content-length', '42');
    expect(response._getData()).toBeFalsy();
  });
});
