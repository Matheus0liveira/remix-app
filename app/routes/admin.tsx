import type { Course } from "@prisma/client";
import type { ErrorBoundaryComponent, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { CatchBoundaryComponent } from "@remix-run/react/dist/routeModules";
import { db } from "~/utils/db.server";

type LoaderData = {
  courses: Course[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const courses = await db.course.findMany();
  return { courses };
};

export default function () {
  const { courses } = useLoaderData<LoaderData>();

  console.log(courses);
  return (
    <div>
      <h1>Courses</h1>
      {courses.map((course) => (
        <h1 key={course.id}>{course.name}</h1>
      ))}
    </div>
  );
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
