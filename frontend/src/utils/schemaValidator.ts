import { ZodSchema } from 'zod'

export function schemaValidator<T>(schema: ZodSchema, data: T) {
  const result = schema.safeParse(data)
  if (result.success) return null

  const errors = result.error.errors.reduce((acc, item) => {
    const fieldName = String(item.path[item.path.length - 1])

    return {
      ...acc,
      [fieldName]: item.message,
    }
  }, {} as Record<string, string>)

  return errors
}
