import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { AdminAPI } from "~/features/admin";

export const action: ActionFunction = async ({ params }): Promise<Response> => {
  console.log(params);
  await AdminAPI.deleteCourse(params.courseId!);

  return redirect("..");
};
