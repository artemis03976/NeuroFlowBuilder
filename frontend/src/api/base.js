// Base request client
export const createAPIClient = (baseURL, defaultOptions = {}) => {
  const client = {
    // GET request
    get: (url, params) => request(url, 'GET', null, params),
    // POST request (create)
    post: (url, data) => request(url, 'POST', data),
    // PUT request (update)
    put: (url, data) => request(url, 'PUT', data),
    // DELETE request
    delete: (url) => request(url, 'DELETE'),
    // PATCH request (partial update)
    patch: (url, data) => request(url, 'PATCH', data)
  };

  const request = async (url, method, body, params) => {
    const controller = new AbortController();
    const query = new URLSearchParams(params).toString();
    const fullUrl = `${baseURL}${url}${query ? `?${query}` : ''}`;

    // Request config
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...defaultOptions.headers
      },
      body: body ? JSON.stringify(body) : null,
      signal: controller.signal
    };

    try {
      const response = await fetch(fullUrl, config);
      const data = await parseResponse(response);
      return data;
    } catch (error) {
      throw transformError(error);
    }
  };
  
  // uniform response handle
  const parseResponse = async (response) => {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.code = response.status;
      error.response = await response.json();
      throw error;
    }
    return response.json();
  };
  
  // Standardalize errors
  const transformError = (error) => {
    return {
      name: error.name || 'APIError',
      message: error.response?.detail || error.message,
      code: error.code || 500,
      data: error.response
    };
  };
  
  return client;
};

export const mainAPIClient = createAPIClient('http://localhost:8379/api', {
  headers: {
    'X-Client-Version': '1.0.0'
  }
});
  