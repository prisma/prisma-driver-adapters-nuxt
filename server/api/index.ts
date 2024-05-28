import { PrismaD1 } from '@prisma/adapter-d1'
import { PrismaClient } from '@prisma/client'

export default defineEventHandler(async (event) => {
  const { cloudflare } = event.context

  const d1Client = cloudflare.env.D1_DATABASE
  const adapter = new PrismaD1(d1Client)
  const prisma = new PrismaClient({ adapter })
  await prisma.$connect()

  const result = await prisma.$queryRaw`SELECT 1;`

  return {
    ok: true,
    result,
  }
})
