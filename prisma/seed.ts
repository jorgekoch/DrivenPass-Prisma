import bcrypt from "bcrypt";
import prisma from "../src/database";

async function main() {
  const demoUser = {
    name: "Demo",
    email: "demo@driven.com.br",
    password: "demo123"
  };

  const hashedPassword = await bcrypt.hash(demoUser.password, 10);

  await prisma.user.upsert({
    where: { email: demoUser.email },
    update: {}, 
    create: {
      name: demoUser.name,
      email: demoUser.email,
      password: hashedPassword
    }
  });
}

main()
  .then(async () => {
    console.log("Seed finalizado com sucesso!");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Erro no seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
