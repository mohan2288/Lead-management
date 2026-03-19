export {};

declare global {
  interface Window {
    CONFIG: {
      API_URL: string;
      TOKEN_KEY: string;
    };
  }
}