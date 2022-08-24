import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { ZodError } from "zod";
import { useActionData } from "@remix-run/react";

import type { ActionData, FormFields } from "~/features/admin";
import { ValidatorNewAdmin } from "~/features/admin";
import { CourseForm, extractValidationErrors } from "~/features/admin";
import { saveCourse } from "~/features/admin/Admin.api";

export const action: ActionFunction = async ({
  request,
}): Promise<ActionData | Response | void> => {
  const data: FormFields = Object.fromEntries(await request.formData());

  try {
    await saveCourse(ValidatorNewAdmin.parse(data));

    return redirect(".");
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        formErrors: extractValidationErrors(error),
        formValues: data,
      };
    }
  }
};
export default function () {
  const action = useActionData<ActionData>();

  return <CourseForm action={action} />;
}
