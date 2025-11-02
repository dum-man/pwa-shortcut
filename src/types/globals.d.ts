export {};

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: string,
      target: string,
      params?: Record<string, any>
    ) => void;
  }
}
