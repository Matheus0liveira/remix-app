import type { Course } from "@prisma/client";

export type FormFields = {
  name?: string;
  description?: string;
};

export type ActionData = {
  formErrors?: FormFields;
  formValues?: FormFields;
};

export type CourseFormProps = {
  action?: ActionData;
  course?: Course;
};

export const CourseForm = ({ action, course }: CourseFormProps) => {
  console.log(course);
  return (
    <form method="POST">
      <div className="shadow sm:rounded-md sm:overflow-hidden">
        <div className="bg-white py-6 px-4 space-y-6 sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Novo curso
            </h3>
          </div>

          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={action?.formValues?.name ?? course?.name}
                key={action?.formValues?.name ?? course?.name}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {action?.formErrors?.name ? (
                <p className="text-xs text-red-500 pt-2">
                  {action.formErrors.name}
                </p>
              ) : null}
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descrição
              </label>
              <input
                type="text"
                name="description"
                id="description"
                defaultValue={
                  action?.formValues?.description ?? course?.description
                }
                key={action?.formValues?.description ?? course?.description}
                autoComplete="family-name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {action?.formErrors?.description ? (
                <p className="text-xs text-red-500 pt-2">
                  {action.formErrors.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};
