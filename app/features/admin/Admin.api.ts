import type { Course } from "@prisma/client";
import { db } from "~/utils/db.server";

export const getCourses = (): Promise<Course[]> => {
  return db.course.findMany();
};
