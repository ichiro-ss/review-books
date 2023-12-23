import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';

export const Edit = () => {
  const params = useParams();

  return (
    <div>
      <main className="edit">
        <Header />
        <h1>Edit</h1>
        {params.id}
      </main>
    </div>
  );
};
