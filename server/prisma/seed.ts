import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  /*Populando tabela user */
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      avatarUrl: 'https://github.com/Iann-rst.png'
    }
  })

  /*Populando tabela pool (bolões) */
  const pool = await prisma.pool.create({
    data: {
      title: 'Example Pool',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })

  /*Populando tabela game */
  await prisma.game.create({
    data: {
      date: '2022-11-07T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR'
    }
  })

  /*Populando tabela game com 1 palpite*/
  await prisma.game.create({
    data: {
      date: '2022-11-08T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id
              }
            }
          }
        }
      }
    }
  })

}



main()