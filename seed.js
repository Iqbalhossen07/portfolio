const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const existingProjects = await prisma.project.count();
  if (existingProjects > 0) {
    console.log("Projects already exist. Skipping seed.");
    return;
  }

  await prisma.project.createMany({
    data: [
      {
        title: "Mountenna Recruitment",
        shortDescription: "A high-fidelity job board and applicant tracking platform built for the UK staffing industry with real-time matching.",
        mainImageUrl: "https://images.unsplash.com/photo-1573496130407-57329f01f769?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        mainImageId: "placeholder_1",
        techs: ["PHP", "Laravel", "MySQL", "Tailwind"],
        liveLink: "/project/1",
        year: "2025",
        category: "Live Project",
      },
      {
        title: "Stonebridge Legal",
        shortDescription: "Digital transformation for a UK law firm, transitioning from manual bookings to an automated web solution.",
        mainImageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
        mainImageId: "placeholder_2",
        techs: ["PHP", "MySQL", "JavaScript"],
        liveLink: "/project/2",
        year: "2024",
        category: "Live Project",
      }
    ]
  });

  console.log("Seeded 2 dummy projects!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
