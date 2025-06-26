import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { uploadFile } from '../utils/db';

const ChatPage = () => {
    const [csvFile, setCsvFile] = useState(null);
    const [knowledgeBaseFile, setKnowledgeBaseFile] = useState(null);
    const [dbConnection, setDbConnection] = useState('');

    const handleCsvUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setCsvFile(file);
            await uploadFile(file, 'csv');
        }
    };

    const handleKnowledgeBaseUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setKnowledgeBaseFile(file);
            await uploadFile(file, 'knowledgeBase');
        }
    };

    const handleDbConnection = (event) => {
        setDbConnection(event.target.value);
    };

    const connectToDatabase = async () => {
        // Implement database connection logic here
    };

    return (
        <div>
            <h1>Chat Interface</h1>
            <div>
                <h2>Upload CSV File</h2>
                <input type="file" accept=".csv" onChange={handleCsvUpload} />
            </div>
            <div>
                <h2>Upload Knowledge Base File</h2>
                <input type="file" accept=".txt,.pdf" onChange={handleKnowledgeBaseUpload} />
            </div>
            <div>
                <h2>Database Connection</h2>
                <input
                    type="text"
                    value={dbConnection}
                    onChange={handleDbConnection}
                    placeholder="Enter database connection string"
                />
                <button onClick={connectToDatabase}>Connect</button>
            </div>
            {/* Chat interface would be implemented here */}
        </div>
    );
};

export default ChatPage;