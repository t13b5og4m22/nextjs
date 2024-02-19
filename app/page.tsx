import Link from 'next/link';
import { Games } from './types/Games';
import './page.css';

async function getData() {
  const res = await fetch('https://nextjs-test-pi-hazel-56.vercel.app/data/games.json')
 
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

const Home: React.FC = async () => {
  const gamesData = await getData();
  return (
    <div className="main sofia-sans-400">
      <div className="content">
        <ul>
          {gamesData.map((game: Games) => (
            <li key={game.identifier}>
              <Link href={`games/${game.provider}/${game.seo_title}`} style={{cursor: "pointer"}}>
                <h2>{game.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
