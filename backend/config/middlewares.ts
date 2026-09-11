import type { Core } from "@strapi/strapi";

const config: Core.Config.Middlewares = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": [
            "'self'",
            "data:",
            "blob:",
            "https://kdzjyvwceztbnulyaubm.supabase.co",
          ],
          "media-src": [
            "'self'",
            "data:",
            "blob:",
            "https://kdzjyvwceztbnulyaubm.supabase.co",
          ],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: [
        "https://yulianguinand.fr",
        "https://www.yulianguinand.fr",
        "http://localhost:3000",
      ],
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];

export default config;
