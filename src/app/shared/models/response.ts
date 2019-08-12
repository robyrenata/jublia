export interface Response {
  response?: number,
  result?: {
      count?: number,
      rows?: any[],
      message?: string
  }
  data?: object
}
