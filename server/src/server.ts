import Fastify from 'fastify';
import cors from '@fastify/cors'
import jwt from '@fastify/jwt';

import { pollRoutes } from './routes/poll';
import { guessRoutes } from './routes/guess';
import { userRoutes } from './routes/user';
import { gameRoutes } from './routes/game';
import { authRoutes } from './routes/auth';


async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true,
  })

  //Precisa ser uma variável de ambiente...
  await fastify.register(jwt, {
    secret: '20nlw22copa'
  })

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' })

}

bootstrap();