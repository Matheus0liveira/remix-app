import type { ZodError } from "zod";
import { z } from "zod";

export const ValidatorNewAdmin = z.object({
  name: z.string().min(6),
  description: z.string().min(12),
});

export const extractValidationErrors = (error: ZodError) =>
  error.issues.reduce((acc, issue) => {
    // @ts-ignore
    acc[issue.path[0]] = issue.message;

    return acc;
  }, {});
