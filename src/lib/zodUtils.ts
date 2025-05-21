import { z, ZodError, ZodSchema } from 'zod';

/**
 * Validate data against a Zod schema
 * @param schema The Zod schema to validate against
 * @param data The data to validate
 * @returns An object containing validation result
 */
export function validateWithZod<T>(schema: ZodSchema, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string[]>;
} {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData as T,
    };
  } catch (error) {
    if (error instanceof ZodError) {
      // Format Zod errors into a more usable structure
      const formattedErrors: Record<string, string[]> = {};
      
      error.errors.forEach((err) => {
        const path = err.path.join('.') || 'root';
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(err.message);
      });
      
      return {
        success: false,
        errors: formattedErrors,
      };
    }
    
    // For other errors, return a generic error
    return {
      success: false,
      errors: {
        root: ['Validation failed for unknown reason'],
      },
    };
  }
}

/**
 * Create a safe action that validates incoming data with Zod
 * @param schema The Zod schema to validate against
 * @param handler The handler function to execute if validation succeeds
 * @returns A function that validates input and calls the handler
 */
export function createSafeAction<TInput, TOutput>(
  schema: ZodSchema<TInput>,
  handler: (validatedData: TInput) => Promise<TOutput>
) {
  return async (data: unknown) => {
    const validationResult = validateWithZod<TInput>(schema, data);
    
    if (!validationResult.success) {
      return {
        success: false,
        errors: validationResult.errors,
      };
    }
    
    try {
      const result = await handler(validationResult.data as TInput);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        errors: {
          root: [(error as Error).message || 'Something went wrong'],
        },
      };
    }
  };
}

/**
 * Type for server action/API results
 */
export type ActionResult<T> = 
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };