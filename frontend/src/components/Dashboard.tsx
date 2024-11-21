// src/components/Dashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Activity {
    id: number;
    titolo: string;
    data_ora: string;
    presente: boolean;
}

const Dashboard: React.FC = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [status, setStatus] = useState<string>('attivo');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: membro } = await axios.get('/api/membri/1'); // ID del membro mockato
                setStatus(membro.stato);

                const { data: activities } = await axios.get(`/api/partecipazioni/membro/1`);
                setActivities(activities);
            } catch (error) {
                console.error('Errore nel caricamento:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Dashboard Personale</h1>
            <p>Stato: {status}</p>
            <h2>Storico Attività</h2>
            <ul>
                {activities.map((activity) => (
                    <li key={activity.id}>
                        {activity.titolo} - {new Date(activity.data_ora).toLocaleDateString()} -{' '}
                        {activity.presente ? 'Presente' : 'Assente'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
