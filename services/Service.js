class Service {
  static rejectResponse(error, code = 500) {
    return {error, code};
  }

  static badRequestResponse(message) {
    return {
      message: message,
      code: 400
    }
  }

  static successResponse(payload, code = 200) {
    return {payload, code};
  }

  static emptySuccessResponse() {
    return {payload: null, code: 200};
  }

  static createdResponse(payload, code = 201) {
    return {payload, code};
  }

  static notFoundResponse(payload, code = 404) {
    return {payload, code};
  }
}

module.exports = Service;
