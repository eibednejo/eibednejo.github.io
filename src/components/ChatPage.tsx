import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { uploadFile } from '../utils/db';

const ChatPage = () => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [knowledgeBaseFile, setKnowledgeBaseFile] = useState<File | null>(null);
    const [dbConnection, setDbConnection] = useState('');

    const handleCsvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        if (file) {
            setCsvFile(file);
            await uploadFile(file);
        }
    };

    const handleKnowledgeBaseUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) return;
        const file = event.target.files[0];
        if (file) {
            setKnowledgeBaseFile(file);
            await uploadFile(file);
        }
    };

    const handleDbConnection = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDbConnection(event.target.value);
    };

    const connectToDatabase = async () => {
        // Implement database connection logic here
    };

    return (
        <div className="fancy-container">
            <h1>Chat Interface</h1>
            <form className="fancy-form">
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
                    <button type="button" onClick={connectToDatabase}>Connect</button>
                </div>
            </form>
            {/* Chat interface would be implemented here */}
        </div>
    );
};

export default ChatPage;