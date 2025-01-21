import vine from '@vinejs/vine'

export const taskValidator = vine.compile(
  vine.object({
    // a: vine.date,
    title: vine.string(),
    description: vine.string().optional(),
    dueDate: vine.date().optional(),
    completed: vine.boolean().optional(),
    public: vine.boolean().optional(),
  })
)
