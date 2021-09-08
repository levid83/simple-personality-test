import request, { httpErrorHander } from "../http.request";

let errLogger: any;
beforeEach(async () => {
  errLogger = console.error;
});

afterEach(async () => {
  console.error = errLogger;
  jest.clearAllMocks();
});

describe("Test Http Request", () => {
  it("has the correct settings", () => {
    expect(request.defaults.baseURL).toBe(process.env.NEXT_PUBLIC_SERVER_URL);
    expect(request.defaults.timeout).toBe(5000);
    expect(request.defaults.headers["Content-Type"]).toBe("application/json");
  });

  it("logs the application level error", () => {
    console.error = jest.fn();

    const err = httpErrorHander({
      message: "test error message",
    });

    expect(console.error).toBeCalled();

    expect(err.code).toBe(500);
    expect(err.error).toBe("test error message");
  });

  it("logs the response related error", () => {
    console.error = jest.fn();

    const err = httpErrorHander({
      response: { data: { error: "error message" }, status: 404 },
    });

    expect(console.error).toBeCalled();
    expect(err.code).toBe(404);
    expect(err.error).toBe("error message");
  });

  it("logs the request error", () => {
    console.error = jest.fn();

    const err = httpErrorHander({
      request: "test error message",
    });

    expect(console.error).toBeCalled();

    expect(err.code).toBe(500);
    expect(err.error).toBe("request error");
  });
});
