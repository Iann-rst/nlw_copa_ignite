import { z } from 'zod';
import ShortUniqueId from 'short-unique-id';
import { prisma } from './../lib/prisma';
import { FastifyInstance } from "fastify"

export async function pollRoutes(fastify: FastifyInstance) {
  //Contagem de bolões
  fastify.get('/polls/count', async () => {
    const count = await prisma.poll.count()
    return { count }
  })

  //Criação de um bolão
  fastify.post('/polls', async (request, response) => {
    const createPollBody = z.object({
      title: z.string()
    })
    const { title } = createPollBody.parse(request.body);
    const generate = new ShortUniqueId({ length: 6 });

    const code = String(generate()).toUpperCase();

    await prisma.poll.create({
      data: {
        title,
        code
      }

    })
    return response.status(201).send({ code })

  })
}