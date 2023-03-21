import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function main() {
  // Connect the client
  await prisma.$connect();
  // ... you will write your Prisma Client queries here
}
