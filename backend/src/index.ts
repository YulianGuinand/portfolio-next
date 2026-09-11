import type { Core } from '@strapi/strapi';
import { seedDatabase } from './scripts/seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const projectCount = await strapi.documents('api::project.project').count({});
      if (projectCount === 0 || process.env.RUN_SEED === 'true') {
        console.log(`[BOOTSTRAP] Triggering seed (projectCount=${projectCount}, RUN_SEED=${process.env.RUN_SEED})`);
        await seedDatabase(strapi);
      }
    } catch (err) {
      console.error('[BOOTSTRAP] Error running seed:', err);
    }
  },
};
