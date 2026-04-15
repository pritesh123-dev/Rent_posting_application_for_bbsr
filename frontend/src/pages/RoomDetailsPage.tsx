import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { fetchRoom } from '../redux/roomSlice';
import Loader from '../components/Loader';
import RoomCard from '../components/RoomCard';

export default function RoomDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { current, loading } = useSelector((s: RootState) => s.rooms);

  useEffect(() => { if (id) dispatch(fetchRoom(id)); }, [id, dispatch]);

  if (loading || !current) return <Loader />;

  return (
    <div className="max-w-xl mx-auto">
      <RoomCard room={current} />
      <div className="mt-4 bg-white dark:bg-gray-900 rounded-lg p-4 border dark:border-gray-800">
        <h3 className="font-semibold mb-2">Details</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
          {current.description || 'No description provided.'}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Posted {new Date(current.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
