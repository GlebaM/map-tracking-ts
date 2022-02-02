declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_KEY: string;
    }
  }
}
export {};
