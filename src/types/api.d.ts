export interface APIError<TData = unknown> {
  statusCode: number;
  data: TData;
}

// Type for basic REST API responses' error
export type RestApiError = { statusCode: number; message: string; error?: unknown };
