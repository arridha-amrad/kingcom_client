import z from 'zod'

export const createProductSchema = z.object({
  name: z.string().min(1, 'product name is required'),
  price: z.coerce.number().int().positive().min(1, 'product price is required'),
  weight: z.coerce
    .number()
    .int()
    .positive()
    .min(1, 'product weight is required'),
  stock: z.coerce.number().int().positive().min(1, 'product stock is required'),
  description: z.string().min(1, 'product description is required'),
  specification: z.string().min(1, 'product specification is required'),
  videoUrl: z.string().min(1, 'product video Url is required'),
  imageOne: z.string().url(),
  imageTwo: z.string().url().optional(),
  imageThree: z.string().url().optional(),
  imageFour: z.string().url().optional(),
})

export type CreateProductRequest = z.infer<typeof createProductSchema>
