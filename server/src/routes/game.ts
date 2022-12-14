import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authenticate } from '../plugins/authenticate';

export async function gameRoutes(fastify: FastifyInstance) {

  //Receber o id do bolão por parâmetros e listar os jogos que fazem parte desse bolão
  fastify.get('/polls/:id/games', { onRequest: [authenticate] }, async (request) => {
    const getPollParams = z.object({
      id: z.string()
    })

    const { id } = getPollParams.parse(request.params);

    const games = await prisma.game.findMany({
      orderBy: {
        date: 'asc',
      },
      include: {
        guesses: {
          where: {
            participant: {
              userId: request.user.sub,
              pollId: id,
            }
          }
        }
      }
    })
    return {
      games: games.map(game => {
        return {
          ...game,
          guess: game.guesses.length > 0 ? game.guesses[0] : null,
          guesses: undefined
        }
      })
    }
  })
}