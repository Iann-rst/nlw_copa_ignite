import Fastify from 'fastify';
import cors from '@fastify/cors'
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

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333, host: '0.0.0.0' })

}

bootstrap();