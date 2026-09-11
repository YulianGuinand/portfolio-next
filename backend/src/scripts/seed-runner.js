require('dotenv').config();
const { createStrapi } = require('@strapi/strapi');

async function run() {
  console.log("[SEED-RUNNER] Initializing Strapi...");
  
  // Chargement headless (SANS strapi.server.mount())
  const strapi = await createStrapi({ distDir: './dist' }).load();
  
  console.log("[SEED-RUNNER] Running database seed...");
  try {
    const { seedDatabase } = require('../../dist/src/scripts/seed');
    await seedDatabase(strapi);
    console.log('[SEED-RUNNER] Seeding completed successfully.');
  } catch (error) {
    console.error('[SEED-RUNNER] Error during seeding:', error);
  } finally {
    console.log('[SEED-RUNNER] Destroying Strapi instance...');
    await strapi.destroy();
    process.exit(0);
  }
}

run().catch((err) => {
  console.error('[SEED-RUNNER] Fatal Error:', err);
  process.exit(1);
});