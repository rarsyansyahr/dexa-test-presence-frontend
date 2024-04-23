export const AppConfig = {
  api: {
    baseUrl: process.env.API_BASE_URL || "http://localhost:3001",
    httpTimeout: Number(process.env.API_HTTP_TIMEOUT) || 3000,
  },
  jwtSecretKey:
    process.env.JWT_SECRET_KEY || "6ffea253-e1e1-42cd-966f-bb92c2d83ebc",
};
