import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function generateUsers() {
  for (let i = 0; i < 100; i++) {
    await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      },
    });
  }
}

async function generatePosts() {
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  const randomUserId = () => {
    const randomIndex = Math.floor(Math.random() * userIds.length);
    return userIds[randomIndex]!;
  };

  for (let i = 0; i < 100; i++) {
    await prisma.post.create({
      data: {
        title: faker.lorem.sentence(),
        url: generateRandomURL(0.3),
        userId: randomUserId(),
      },
    });
  }
}

const generateRandomURL = (probability: number) => {
  if (Math.random() < probability) {
    return faker.internet.url();
  } else {
    return "";
  }
};

async function generateComments() {
  const users = await prisma.user.findMany();
  const userIds = users.map((user) => user.id);

  const posts = await prisma.post.findMany();
  const postIds = posts.map((post) => post.id);

  const randomUserId = () => {
    const randomIndex = Math.floor(Math.random() * userIds.length);
    return userIds[randomIndex]!;
  };

  const randomPostId = () => {
    const randomIndex = Math.floor(Math.random() * postIds.length);
    return postIds[randomIndex]!;
  };

  for (let i = 0; i < 1000; i++) {
    await prisma.comment.create({
      data: {
        content: faker.lorem.paragraph(),
        userId: randomUserId(),
        postId: randomPostId(),
      },
    });
  }
}

async function main() {
  await generateUsers();
  await generatePosts();
  await generateComments();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
