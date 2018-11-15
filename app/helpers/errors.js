module.exports = {

  // http errors
  badRequest: {
    status: 400,
    code: 400,
    message: 'Bad request',
  },
  unauthorized: {
    status: 401,
    code: 401,
    message: 'Unauthorized',
  },
  paymentRequired: {
    status: 402,
    code: 402,
    message: 'Payment required',
  },
  forbidden: {
    status: 403,
    code: 403,
    message: 'Forbidden',
  },
  notFound: {
    status: 404,
    code: 404,
    message: 'Not found',
  },
  methodNotAllowed: {
    status: 405,
    code: 405,
    message: 'Method not allowed',
  },
  notAcceptable: {
    status: 406,
    code: 406,
    message: 'Not acceptable',
  },
  proxyAuthenticationRequired: {
    status: 407,
    code: 407,
    message: 'Proxy authentication required',
  },
  requestTimeout: {
    status: 408,
    code: 408,
    message: 'Request timeout',
  },
  conflict: {
    status: 409,
    code: 409,
    message: 'Conflict',
  },
  gone: {
    status: 410,
    code: 410,
    message: 'Gone',
  },
  lengthRequired: {
    status: 411,
    code: 411,
    message: 'Length required',
  },
  preconditionFailed: {
    status: 412,
    code: 412,
    message: 'Precondition failed',
  },
  requestEntityTooLarge: {
    status: 413,
    code: 413,
    message: 'Request entity too large',
  },
  requestURITooLong: {
    status: 414,
    code: 414,
    message: 'Request-URI too long',
  },
  unsupportedMediaType: {
    status: 415,
    code: 415,
    message: 'Unsupported media type',
  },
  requestRangeNotSatisfiable: {
    status: 416,
    code: 416,
    message: 'Requested range not satisfiable',
  },
  expectationFailed: {
    status: 417,
    code: 417,
    message: 'Expectation failed',
  },
  misdirectedRequest: {
    status: 421,
    code: 421,
    message: 'Misdirected request',
  },
  unprocessableEntity: {
    status: 422,
    code: 422,
    message: 'Unprocessable entity',
  },
  locked: {
    status: 423,
    code: 423,
    message: 'Locked',
  },
  failedDependency: {
    status: 424,
    code: 424,
    message: 'Failed dependency',
  },
  upgradeRequired: {
    status: 426,
    code: 426,
    message: 'Upgrade required',
  },
  preconditionRequired: {
    status: 428,
    code: 428,
    message: 'Precondition required',
  },
  tooManyRequests: {
    status: 429,
    code: 429,
    message: 'Too many requests',
  },
  requestHeaderFieldsTooLarge: {
    status: 431,
    code: 431,
    message: 'Request header fields too large',
  },
  unavailableForLegalReasons: {
    status: 451,
    code: 451,
    message: 'Unavailable for legal reasons',
  },
  internalServerError: {
    status: 500,
    code: 500,
    message: 'Internal server error',
  },
  notImplemented: {
    status: 501,
    code: 501,
    message: 'Not implemented',
  },
  badGateway: {
    status: 502,
    code: 502,
    message: 'Bad gateway',
  },
  serviceUnavailable: {
    status: 503,
    code: 503,
    message: 'Service unavailable',
  },
  gatewayTimeout: {
    status: 504,
    code: 504,
    message: 'Gateway timeout',
  },
  httpVersionNotSupported: {
    status: 505,
    code: 505,
    message: 'HTTP version not supported',
  },
  variantAlsoNegotiates: {
    status: 506,
    code: 506,
    message: 'Variant also negotiates',
  },
  insufficientStorage: {
    status: 507,
    code: 507,
    message: 'Insufficient storage',
  },
  loopDetected: {
    status: 508,
    code: 508,
    message: 'Loop detected',
  },
  bandwidthLimitExceeded: {
    status: 509,
    code: 509,
    message: 'Bandwidth limit exceeded',
  },
  notExtended: {
    status: 510,
    code: 510,
    message: 'Not extended',
  },
  networkAuthenticationRequired: {
    status: 511,
    code: 511,
    message: 'Network authentication required',
  },

  // other errors
  requestBodySyntaxError: {
    status: 400,
    code: 400001,
    message: 'Request body syntax error',
  },
  requestBodyValidationError: {
    status: 400,
    code: 400002,
    message: 'Request body JSON schema validation error',
  },
  requestParamsTypeError: {
    status: 400,
    code: 400003,
    message: 'Request url parameter type error',
  },
  missingHeaderAuthorizationBasic: {
    status: 401,
    code: 401001,
    message: 'Missing HTTP Header \'Authorization: Basic base64(username:password)\'',
  },
  invalidHeaderAuthorizationBasic: {
    status: 401,
    code: 401002,
    message: 'Invalid HTTP Header \'Authorization: Basic base64(username:password)\'',
  },
  invalidUsernameOrPassword: {
    status: 401,
    code: 401003,
    message: 'Invalid username or password in HTTP header \'Authorization: Basic base64(username:password)\'',
  },
  missingHeaderAuthorizationBearer: {
    status: 401,
    code: 401004,
    message: 'Missing HTTP Header \'Authorization: Bearer <token>\'',
  },
  invalidHeaderAuthorizationBearer: {
    status: 401,
    code: 401005,
    message: 'Invalid HTTP Header \'Authorization: Bearer <token>\'',
  },
  invalidToken: {
    status: 401,
    code: 401006,
    message: 'Invalid token in HTTP header \'Authorization: Bearer <token>\'',
  },
  unauthorizedInvalidPassword: {
    status: 401,
    code: 401009,
    message: 'Unauthorized, invalid password',
  },
  missingHeaderContentType: {
    status: 415,
    code: 415001,
    message: 'Missing HTTP header \'Content-Type: application/json\'',
  },
  cannotCreateObject: {
    status: 500,
    code: 500001,
    message: 'Cannot create object',
  },
  cannotCreateObjectAlreadyExists: {
    status: 500,
    code: 500002,
    message: 'Cannot create object, it already exists',
  },
  cannotUpdateObjectNotFound: {
    status: 500,
    code: 500003,
    message: 'Cannot update object, not found',
  },
  cannotDeleteObjectNotFound: {
    status: 500,
    code: 500004,
    message: 'Cannot delete object, not found',
  },
  cannotCreateObjectUnableToGenerateUniqueId: {
    status: 500,
    code: 500005,
    message: 'Cannot create object, unable to generate unique id',
  },
  cannotUpdateObjectDuplicateValue: {
    status: 500,
    code: 500006,
    message: 'Cannot update object, another one has the same value',
  },
};
