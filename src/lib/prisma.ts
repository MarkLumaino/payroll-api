import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";


const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST ?? 'localhost',
    user: process.env.DATABASE_USERNAME ?? 'root',
    password: process.env.DATABASE_PASSWORD ?? "",
    database: process.env.DATABASE_NAME ?? "test",
    connectionLimit: 5
});

const prisma = new PrismaClient({adapter})

export default prisma