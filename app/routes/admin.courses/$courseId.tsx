import type { Course } from "@prisma/client";
import type {
  ActionFunction,
  ErrorBoundaryComponent,
  LoaderFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { ZodError } from "zod";
import { Error, NotFound } from "~/components";

import type { ActionData, FormFields } from "~/features/admin";
import { extractValidationErrors, ValidatorNewAdmin } from "~/features/admin";
import { AdminAPI } from "~/features/admin";
import { CourseForm } from "~/features/admin";
import { saveCourse } from "~/features/admin/Admin.api";

type LoaderData = {
  course: Course;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData | Response> => {
  const course = await AdminAPI.getCourse(params.courseId!);

  if (!course) throw new Response("Not found", { status: 404 });
  console.log({ course });

  return { course };
};

export const action: ActionFunction = async ({
  request,
  params,
}): Promise<ActionData | Response | void> => {
  console.log("HERE");
  const data: FormFields = Object.fromEntries(await request.formData());

  try {
    console.log(params.courseId);
    await saveCourse(ValidatorNewAdmin.parse(data), params.courseId);

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
  const { course } = useLoaderData<LoaderData>();

  return (
    <>
      <form action={`${course.id}/delete`} method="post">
        <button
          type="submit"
          className="mb-4 bg-red-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Delete
        </button>
      </form>
      <CourseForm action={action} course={course as unknown as Course} />
    </>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <Error error={error} />;
};

export const CatchBoundary = () => {
  return <NotFound message="We couldn'd find a course with provider ID" />;
};
