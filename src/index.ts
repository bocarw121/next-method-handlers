import type { NextApiRequest, NextApiResponse } from "next";

export type NextRoutesOptions = {
  get?: (req: NextApiRequest, res: NextApiResponse) => void;
  post?: (req: NextApiRequest, res: NextApiResponse) => void;
  put?: (req: NextApiRequest, res: NextApiResponse) => void;
  patch?: (req: NextApiRequest, res: NextApiResponse) => void;
  delete?: (req: NextApiRequest, res: NextApiResponse) => void;
  options?: (req: NextApiRequest, res: NextApiResponse) => void;
  head?: (req: NextApiRequest, res: NextApiResponse) => void;
};

type methods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";

const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];

function checkMethod(method: string) {
  return (methodToCheck: methods) => {
    return method === methodToCheck;
  };
}

function handleNoMethodProvided(routes: NextRoutesOptions) {
  return (
    !routes.delete ||
    !routes.get ||
    !routes.head ||
    !routes.options ||
    !routes.patch ||
    !routes.post ||
    !routes.put
  );
}

function handleRoutes(routes: NextRoutesOptions) {
  return (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    const isMethod = checkMethod(method!);

    if (isMethod("GET") && routes.get) return routes.get(req, res);
    if (isMethod("POST") && routes.post) return routes.post(req, res);
    if (isMethod("PUT") && routes.put) return routes.put(req, res);
    if (isMethod("PATCH") && routes.patch) return routes.patch(req, res);
    if (isMethod("DELETE") && routes.delete) return routes.delete(req, res);
    if (isMethod("OPTIONS") && routes.options) return routes.options(req, res);
    if (isMethod("HEAD") && routes.head) return routes.head(req, res);

    if (handleNoMethodProvided(routes)) {
      return res.status(400).json({
        error: `You must provide a ${method} method handler in the routes object`,
      });
    }
  };
}

export function createNextRoutes(routes: NextRoutesOptions) {
  const routerHandler = handleRoutes(routes);

  return (req: NextApiRequest, res: NextApiResponse) => {
    return routerHandler(req, res);
  };
}
