interface ValidationError {
  field: string;
  message: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

type RequestOptions = {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
  body?: Record<string, any>;
};

export class ValidationErrorException extends Error {
  errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super("Validation errors occurred");
    this.errors = errors;
    this.name = "ValidationErrorException";
  }
}

export class ApiException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiException";
  }
}

const makeRequest = async <T>({
  endpoint,
  method = "GET",
  params = {},
  body = {},
}: RequestOptions): Promise<T> => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url =
      "/api" + (queryString ? `${endpoint}?${queryString}` : endpoint);

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" ? JSON.stringify(body) : null,
    });

    const data: ApiResponse<T> = await response.json();

    if (!response.ok) {
      throw new ApiException(data.errors?.[0]?.message || "API Error");
    }

    if (!data.success && data.errors && data.errors.length > 0) {
      throw new ValidationErrorException(data.errors);
    }

    return data.data as T;
  } catch (error) {
    if (error instanceof ValidationErrorException) {
      throw error;
    }
    if (error instanceof ApiException) {
      throw error;
    }
    throw new Error("Network or unknown error occurred");
  }
};

export default makeRequest;
