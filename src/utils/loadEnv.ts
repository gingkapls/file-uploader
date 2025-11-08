function loadEnv() {
  try {
    process.loadEnvFile();
  } catch (e) {
    console.error("No .env file found: ", e);
  }
}

loadEnv();
