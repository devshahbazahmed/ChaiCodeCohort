class ApiResponse {
  constructor() {}

  static ok(res, message, data = null) {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static created(res, message, data = null) {
    res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static noContent(res) {
    res.status(204).send();
  }
}

export default ApiResponse;
