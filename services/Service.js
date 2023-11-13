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
}

module.exports = Service;
