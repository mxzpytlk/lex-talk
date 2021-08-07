export class GQLError extends Error{
  public statusCode: number;

  constructor(e: any) {
    super();
    this.message = e.message || e.networkError?.result?.errors?.[0]?.message;
    this.statusCode = e.networkError?.result?.errors?.[0]?.statusCode;
  }
}