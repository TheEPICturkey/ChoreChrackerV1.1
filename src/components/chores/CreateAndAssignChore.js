import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const CreateAndAssignChore = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [children, setChildren] = useState([]);  // Store list of children

    useEffect(() => {
        const fetchChildren = async () => {
            const childrenCollection = await getDocs(collection(db, 'childrenAccounts')); // Assuming you have a 'childrenAccounts' collection
            setChildren(childrenCollection.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }

        fetchChildren();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'chores'), {
                name,
                description,
                assignedTo
            });
        } catch (err) {
            console.error("Error adding chore:", err);
        }
    };

    return (
        <div>
            <h2>Create and Assign Chore</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Chore Name" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                <select value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                    {children.map(child => (
                        <option key={child.id} value={child.name}>{child.name}</option>
                    ))}
                </select>
                <button type="submit">Add Chore</button>
            </form>
        </div>
    );
}

export default CreateAndAssignChore;

