export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

export function successResponse<T>(
  data: T,
  metadata?: Omit<SuccessResponse<T>['metadata'], 'timestamp'>
): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: metadata
      ? {
          ...metadata,
          timestamp: new Date().toISOString(),
        }
      : {
          timestamp: new Date().toISOString(),
        },
  };
}
