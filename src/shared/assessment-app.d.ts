export {};

declare global {
  interface Window {
    assessmentApp: {
      getAppVersion: () => Promise<string>;
    };
  }
}
