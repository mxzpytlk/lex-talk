/* eslint-disable @typescript-eslint/no-explicit-any */
export class GQLError extends Error{
  public statusCode: number;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(e: any) {
  	super();
  	const message = e.message || e.networkError?.result?.errors?.[0]?.message;
  	this.message = message.replace('GraphQL error: ', '') || '';
  	this.statusCode = e.networkError?.result?.errors?.[0]?.statusCode;
  }
}