declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_KEY: string;
    }
  }
}
export {};
