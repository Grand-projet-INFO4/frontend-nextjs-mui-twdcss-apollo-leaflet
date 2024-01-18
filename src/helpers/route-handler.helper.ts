// A factory of route handlers responses
export class ResponseFactory {
  // The method that create the response instance
  static create(statusCode: number, body: unknown) {
    return new Response(JSON.stringify(body), {
      headers: {
        "Content-Type": "application/json",
      },
      status: statusCode,
    });
  }
}
