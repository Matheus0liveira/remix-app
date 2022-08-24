import type { Course } from "@prisma/client";
import type { ErrorBoundaryComponent, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { AdminAPI } from "~/features/admin";
import { Courses } from "~/features/admin";

type LoaderData = {
  courses: Course[];
};

export const loader: LoaderFunction = async ({ params }) => {
  return { courses: await AdminAPI.getCourses() };
};

export default function () {
  const { courses } = useLoaderData<LoaderData>();

  return <Courses courses={courses as unknown as Course[]} />;
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <div>Whoops! - {error.message}</div>;
};

export const CatchBoundary: CatchBoundaryComponent = () => {
  return <h3>Not Found</h3>;
};

// export const action: ActionFunction = ({ params }) => {
//   return {};
// };
