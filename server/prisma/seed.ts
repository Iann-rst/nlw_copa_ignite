import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  /*Populando tabela game */
  await prisma.game.create({
    data: {
      date: '2022-11-24T16:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'RS'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-24T07:00:00.201Z',
      firstTeamCountryCode: 'CH',
      secondTeamCountryCode: 'CM'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-23T16:00:00.201Z',
      firstTeamCountryCode: 'BE',
      secondTeamCountryCode: 'CA'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-23T13:00:00.201Z',
      firstTeamCountryCode: 'ES',
      secondTeamCountryCode: 'CR'
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-23T07:00:00.201Z',
      firstTeamCountryCode: 'MA',
      secondTeamCountryCode: 'HR'
    }
  })
}



main()