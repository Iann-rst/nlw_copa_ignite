/*interface HomeProps {
  count: number;
}*/
import Image from 'next/image'
import appPreviewImg from '../assets/app-nlw-copa-preview.png';
import logoImg from '../assets/logo.svg';
import usersAvatarExampleImg from '../assets/app-avatares-example.png';
import iconCheckImg from '../assets/icon-check.svg';

export default function Home() {
  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center" >
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 flex items-center gap-2'>
          <Image src={usersAvatarExampleImg} alt="" />
          <strong className='text-[#E1E1E6] text-xl'>
            <span className='text-[#129E57]'>+12.592</span> pessoas já estão usando.
          </strong>
        </div>

        <form className='mt-10 flex gap-2'>
          <input
            className='flex-1 px-6 py-4 rounded bg-[#202024] border border-[#323238] text-sm'
            type="text"
            required
            placeholder="Qual nome do seu bolão?"
          />
          <button
            className='bg-[#F7DD43] px-6 py-4 rounded text-[#09090A] font-bold text-sm uppercase hover:bg-[#E5CD3D]'
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className='mt-4 text-[#8D8D99] text-sm leading-relaxed'>Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀</p>

        <div className='mt-10 pt-10 border-t border-[#323238] flex justify-between text-[#E1E1E6]'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+2.034</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className='w-px h-14 bg-[#323238]' />

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>

        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
        quality={100}
      />
    </div>
  )
}

/*
export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.count,
    }
  }
}*/
