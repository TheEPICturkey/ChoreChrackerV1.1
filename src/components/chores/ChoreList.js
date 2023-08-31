import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'chorechracker-temp/src/firebase';

const ChoreList = () => {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        const fetchChores = async () => {
            const choreCollection = await getDocs(collection(db, 'chores'));
            setChores(choreCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }

        fetchChores();
    }, []);

    return (
        <div>
            <h2>Chore List</h2>
            <ul>
                {chores.map(chore => (
                    <li key={chore.id}>{chore.name} - {chore.description}</li>
                ))}
            </ul>
        </div>
    );
}

export default ChoreList;
