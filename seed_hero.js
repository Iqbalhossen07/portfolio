const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const heroCount = await prisma.hero.count();
  if (heroCount === 0) {
    await prisma.hero.create({
      data: {
        title: "Iqbal —",
        description: "I build fast, scalable & beautiful web applications — from frontend UI to backend APIs. Let's turn your idea into reality.",
        cvLink: "/dummy-cv.pdf"
      }
    });
    console.log("Seeded Hero data.");
  }

  const aboutCount = await prisma.about.count();
  if (aboutCount === 0) {
    await prisma.about.create({
      data: {
        title: "I build digital solutions that Drive Strategic Growth.",
        description: "Hey, I'm Iqbal — a dedicated Full Stack Developer with a passion for building high-performance web applications. I specialize in the MERN Stack & PHP, focusing on clean architecture and seamless user experiences."
      }
    });
    console.log("Seeded About data.");
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
