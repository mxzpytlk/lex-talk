export class GQLError extends Error{
  public statusCode: number;

  constructor(e: any) {
    super();
    const message = e.message || e.networkError?.result?.errors?.[0]?.message;
    this.message = message.replace('GraphQL error: ', '') || '';
    this.statusCode = e.networkError?.result?.errors?.[0]?.statusCode;
  }
}