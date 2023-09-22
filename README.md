# next-method-handler

`next-method-handler` is a utility library for handling HTTP methods in Next.js API routes. It simplifies the process of defining route handlers for different HTTP methods (GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD) without the need for complex conditional statements.

## Installation

You can install `next-method-handler` via npm or yarn:

```bash
npm install next-method-handler
```

or

```bash
yarn add next-method-handler
```

## Usage

### Import the Library

```ts
import { NextRoutesOptions, createNextRoutes } from 'next-method-handler';
```

### Define Your Route Handlers

Create an object that defines your route handlers for various HTTP methods:

```ts
const routes: NextRoutesOptions = {
  get(req, res) {
    // Your GET handler logic here
  },
  post(req, res) {
    // Your POST handler logic here
  },
};
```

### Export the Route Handler from Your API Route

Use `createNextRoutes` to create the route handler:

```ts
export default createNextRoutes(routes);
```

Now, your API route is equipped to handle different HTTP methods with clean and easy-to-maintain code.

## Example

Here's a simple example of using `next-method-handler` to create an API route:

```ts
// Import necessary modules
import { NextRoutesOptions, createNextRoutes } from 'next-method-handler';

// Define route handlers
const routes: NextRoutesOptions = {
  get(req, res) {
    res.json({
      message: `Hello from ${req.method} method`,
    });
  },
  post(req, res) {
    res.json({
      message: `Hello from ${req.method} method`,
    });
  },
  patch(req, res) {
    res.json({
      message: `Hello from ${req.method} method`,
    });
  },
  put(req, res) {
    res.json({
      message: `Hello from ${req.method} method`,
    });
  },
  delete(req, res) {
    res.json({
      message: `Hello from ${req.method} method`,
    });
  },
  options(req, res) {
    const allowedHeader = ['x-custom-header'];
    res.json({
      message: `Hello from ${req.method} method`,
      allowedHeaders: allowedHeader,
    });
  },
  head(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', '42');

    res.status(200).end();
  },
};

// Create the route handler
export default createNextRoutes(routes);
```

## Options

| HTTP Method | Parameters (`req`: NextApiRequest, `res`: NextApiResponse) |
| ----------- | ---------------------------------------------------------- |
| GET         | ✓                                                          |
| POST        | ✓                                                          |
| PUT         | ✓                                                          |
| PATCH       | ✓                                                          |
| DELETE      | ✓                                                          |
| OPTIONS     | ✓                                                          |
| HEAD        | ✓                                                          |

Note: Each HTTP method includes req: NextApiRequest (request) and res: NextApiResponse (response) parameters in your route handler, providing access to the request and response objects for custom handling.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [node-mocks-http](https://www.npmjs.com/package/node-mocks-http)

## Contributions

Contributions are welcome! If you encounter any issues or have suggestions for improvements, please open an issue or submit a pull request.
