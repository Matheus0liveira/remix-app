import type { Course } from "@prisma/client";
import { db } from "~/utils/db.server";

export const getCourses = (): Promise<Course[]> => {
  return db.course.findMany();
};

export const saveCourse = (
  data: Pick<Course, "name" | "description">,
  id?: string
): Promise<Course> => {
  if (id) {
    return db.course.update({
      where: { id },
      data,
    });
  }
  return db.course.create({
    data,
  });
};
export const getCourse = (id: string): Promise<Course | null> => {
  return db.course.findUnique({
    where: {
      id,
    },
  });
};
export const deleteCourse = (id: string): Promise<Course> => {
  return db.course.delete({
    where: {
      id,
    },
  });
};
