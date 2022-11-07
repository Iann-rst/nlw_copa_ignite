import { FastifyInstance } from 'fastify';

export async function userRoutes(fastify: FastifyInstance) {
  //Contagem de usuários
  fastify.get('/users/count', async () => {
    return { count: 1 }
  })
}