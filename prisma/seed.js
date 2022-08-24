const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

const quantity = process.argv[2] ? parseInt(process.argv[2]) : 9;

async function seed() {
  await db.$executeRawUnsafe("DELETE FROM course; VACUUM;");
  await Promise.all(
    getCourses().map((course) => {
      return db.course.create({ data: course });
    })
  );
}

seed();

function getCourses() {
  return [...Array(quantity).keys()].map((_, index) => ({
    name: `Fake name ${index}}`,
    description: `Lorem ipsum bla bla bla ${index}`,
  }));
}