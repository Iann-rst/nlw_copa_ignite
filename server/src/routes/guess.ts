import { FastifyInstance } from 'fastify';

export async function guessRoutes(fastify: FastifyInstance) {
  //Contagem de palpites
  fastify.get('/guesses/count', async () => {
    return { count: 1 }
  })
}