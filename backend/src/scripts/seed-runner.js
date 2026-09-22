require("dotenv").config();
const { createStrapi } = require("@strapi/strapi");

async function run() {
  console.log("[SEED-RUNNER] Initializing Strapi...");
  const strapi = await createStrapi({ distDir: "./dist" }).load();
  let hasError = false; // Variable de contrôle

  try {
    console.log("[SEED-RUNNER] Running database seed...");
    const { seedDatabase } = require("../../dist/src/scripts/seed");
    await seedDatabase(strapi);
    console.log("[SEED-RUNNER] Seeding completed successfully.");
  } catch (error) {
    console.error("[SEED-RUNNER] Error during seeding:", error);
    hasError = true; // On signale l'erreur
  } finally {
    console.log("[SEED-RUNNER] Destroying Strapi instance...");
    await strapi.destroy();
    process.exit(hasError ? 1 : 0); // Quitte avec 1 si erreur, 0 si succès
  }
}

run().catch((err) => {
  console.error("[SEED-RUNNER] Fatal Error:", err);
  process.exit(1);
});
