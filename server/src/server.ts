import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client'
import cors from '@fastify/cors'
import { z } from 'zod';

import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true,
  })

  //Contagem de bolões
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return { count }
  })

  //Criação de um bolão
  fastify.post('/pools', async (request, response) => {
    const createPoolBody = z.object({
      title: z.string()
    })
    const { title } = createPoolBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });

    const code = String(generate()).toUpperCase();

    await prisma.pool.create({
      data: {
        title,
        code
      }

    })
    return response.status(201).send({ code })

  })

  //Contagem de usuários
  fastify.get('/users/count', async () => {
    return { cont: 1 }
  })

  //Contagem de palpites
  fastify.get('/guesses/count', async () => {
    return { count: 1 }
  })

  await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap();