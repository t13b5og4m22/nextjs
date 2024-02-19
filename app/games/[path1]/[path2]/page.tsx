import { Games } from '../../../types/Games';
import Link from 'next/link';
import Image from 'next/image';
import './page.css';

async function getData(): Promise<Games[]> {
  const res = await fetch('https://nextjs-test-pi-hazel-56.vercel.app/data/games.json');
 
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

type Props = {
  game: Games | null;
  params: any;
};

const GamePage: React.FC<Props> = async ({ params }) => {
  const gamesData = await getData();
  let game: Games | null = gamesData.find((game) => (game.provider === params.path1) && (game.seo_title === params.path2)) || null;
  if (!game) {
    return <div>Нет игры</div>;
  }
  return (
    <div className="gamePage">
      <Link href="/"><h3>Назад</h3></Link>
      <div className="card">
        <h1 className="sofia-sans-600"><span>Название</span>: {game.title}</h1> 
        <Image src={`https://d2norla3tyc4cn.cloudfront.net/i/s3/${game.identifier}.webp`} alt="Picture" width={300} height={300} style={{borderRadius: "16px", margin: "0 auto"}}/>
        <h2 className="sofia-sans-400"><span>Провайдер:</span>: {game.provider}</h2>
        <h2 className="sofia-sans-400"><span>Категории</span>: {game.categories.join(', ')}</h2>
      </div>
    </div>
  );
};

export default GamePage;
