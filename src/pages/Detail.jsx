import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';

export const Detail = () => {
  const params = useParams();
  return (
    <div>
      <main className="Detail">
        <Header />
        <h1>Detail</h1>
        {params.id}
      </main>
    </div>
  );
};
