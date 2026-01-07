module.exports = {
  success: (data = null, message = null) => ({
    statusCode: 200,
    data: {
      status: "success",
      ...(data ? { data } : {}),
      ...(message ? { message } : {}),
    },
  }),

  created: (data = null, message = null) => ({
    statusCode: 201,
    data: {
      status: "success",
      ...(data ? { data } : {}),
      ...(message ? { message } : {}),
    },
  }),

  successNoContent: (message = "No Content") => ({
    statusCode: 204,
    data: {
      status: "success",
      message,
    },
  }),

  invalidData: (error) => ({
    statusCode: 400,
    data: {
      status: "failed",
      message: error instanceof Error ? error.message : error,
    },
  }),

  unauthorized: (message = "Unauthorized") => ({
    statusCode: 401,
    data: { status: "failed", message },
  }),

  forbidden: (message = "Forbidden") => ({
    statusCode: 403,
    data: { status: "failed", message },
  }),

  notFound: (message = "Not Found") => ({
    statusCode: 404,
    data: { status: "failed", message },
  }),

  conflict: (message = "Conflict") => ({
    statusCode: 409,
    data: { status: "failed", message },
  }),

  serverError: (error) => ({
    statusCode: 500,
    data: {
      status: "failed",
      message: error instanceof Error ? error.message : error,
    },
  }),
}