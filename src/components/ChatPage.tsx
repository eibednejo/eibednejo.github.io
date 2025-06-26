import React, { useState } from 'react';
import { supabase } from '../supabase/client';
import { uploadFile } from '../utils/db';

const sidebarItems = [
    { label: 'Chat', icon: '💬' },
    { label: 'Agents', icon: '🧑‍💻' },
    { label: 'Tools', icon: '🛠️' },
    { label: 'RAG', icon: '📚' },
];

const ChatPage = () => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [knowledgeBaseFile, setKnowledgeBaseFile] = useState<File | null>(null);
    const [dbConnection, setDbConnection] = useState('');
    const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
        { sender: 'assistant', text: 'Hello! How can I assist you today?' }
    ]);
    const [input, setInput] = useState('');
    const [activeSidebar, setActiveSidebar] = useState('Chat');

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

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages([...messages, { sender: 'user', text: input }]);
        setInput('');
        // Optionally, add assistant response logic here
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'linear-gradient(120deg, #b2f7ef 0%, #6edcc4 100%)' }}>
            {/* Sidebar */}
            <aside style={{
                width: 220,
                background: '#fff',
                borderRight: '1.5px solid #e0e0e0',
                display: 'flex',
                flexDirection: 'column',
                padding: '2rem 0 1rem 0',
                alignItems: 'center',
                minWidth: 180
            }}>
                <div style={{ fontWeight: 700, fontSize: 22, marginBottom: 32, color: '#2ecc71', letterSpacing: 1 }}>
                    <span style={{ marginRight: 8 }}>🧑‍💻</span>Open Agent Platform
                </div>
                <nav style={{ width: '100%' }}>
                    {sidebarItems.map(item => (
                        <div
                            key={item.label}
                            onClick={() => setActiveSidebar(item.label)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '0.8rem 2rem',
                                cursor: 'pointer',
                                fontWeight: 500,
                                color: activeSidebar === item.label ? '#2ecc71' : '#333',
                                fontSize: 16,
                                background: activeSidebar === item.label ? '#e8f8f5' : 'transparent',
                                borderLeft: activeSidebar === item.label ? '4px solid #2ecc71' : '4px solid transparent',
                                transition: 'background 0.2s, color 0.2s, border 0.2s',
                                borderRadius: 6,
                                marginBottom: 4
                            }}
                        >
                            <span style={{ marginRight: 12 }}>{item.icon}</span>
                            {item.label}
                        </div>
                    ))}
                </nav>
                <div style={{ marginTop: 'auto', width: '100%', padding: '0 2rem' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />
                    <div style={{ fontSize: 13, color: '#888' }}>
                        <div style={{ marginBottom: 10 }}>
                            <strong>Upload CSV</strong>
                            <input type="file" accept=".csv" onChange={handleCsvUpload} style={{ width: '100%', marginTop: 4 }} />
                        </div>
                        <div style={{ marginBottom: 10 }}>
                            <strong>Upload KB</strong>
                            <input type="file" accept=".txt,.pdf" onChange={handleKnowledgeBaseUpload} style={{ width: '100%', marginTop: 4 }} />
                        </div>
                        <div>
                            <strong>DB Connection</strong>
                            <input
                                type="text"
                                value={dbConnection}
                                onChange={handleDbConnection}
                                placeholder="Database string"
                                style={{
                                    width: '100%',
                                    marginTop: 4,
                                    padding: '0.3rem 0.5rem',
                                    borderRadius: 6,
                                    border: '1px solid #e0e0e0',
                                    fontSize: 13
                                }}
                            />
                            <button
                                onClick={connectToDatabase}
                                style={{
                                    marginTop: 6,
                                    width: '100%',
                                    background: '#2ecc71',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 6,
                                    padding: '0.4rem 0',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                Connect
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
            {/* Main Area */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                background: 'transparent'
            }}>
                {/* Top Bar */}
                <div style={{
                    width: '100%',
                    maxWidth: 700,
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.2rem 2rem 0.5rem 2rem'
                }}>
                    <div style={{ fontWeight: 700, fontSize: 20, color: '#2ecc71' }}>Chat</div>
                    <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: '#e8f8f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        color: '#2ecc71',
                        fontSize: 18
                    }}>
                        U
                    </div>
                </div>
                {/* Chat Card */}
                <div style={{
                    width: '100%',
                    maxWidth: 700,
                    margin: '10px auto 0 auto',
                    background: '#fff',
                    borderRadius: 18,
                    boxShadow: '0 8px 32px rgba(60, 60, 60, 0.10)',
                    minHeight: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '2rem 2rem 1rem 2rem',
                        borderBottom: '1px solid #f0f0f0',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ margin: 0, color: '#2ecc71', fontWeight: 700, fontSize: 26 }}>
                            Hello! How can I assist you today?
                        </h2>
                    </div>
                    <div style={{
                        flex: 1,
                        padding: '1.5rem 2rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.2rem'
                    }}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    display: 'flex',
                                    flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row',
                                    alignItems: 'flex-end',
                                    gap: 10
                                }}
                            >
                                <div style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    background: msg.sender === 'user' ? '#b2f7ef' : '#e8f8f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    color: '#2ecc71',
                                    fontSize: 16
                                }}>
                                    {msg.sender === 'user' ? 'U' : 'A'}
                                </div>
                                <div
                                    style={{
                                        background: msg.sender === 'user' ? '#e8f8f5' : '#f4f4f4',
                                        color: '#333',
                                        borderRadius: 12,
                                        padding: '0.7rem 1.2rem',
                                        maxWidth: '70%',
                                        boxShadow: msg.sender === 'user'
                                            ? '0 2px 8px rgba(46,204,113,0.08)'
                                            : '0 2px 8px rgba(60,60,60,0.06)'
                                    }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <form
                        onSubmit={handleSend}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            borderTop: '1px solid #f0f0f0',
                            padding: '1rem 2rem',
                            background: '#fafafa',
                            boxShadow: '0 -2px 8px rgba(46,204,113,0.03)'
                        }}
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                padding: '0.8rem 1rem',
                                borderRadius: 20,
                                border: '1.5px solid #e0e0e0',
                                fontSize: 16,
                                marginRight: 12,
                                outline: 'none',
                                background: '#fff',
                                boxShadow: '0 2px 8px rgba(46,204,113,0.04)'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                background: 'linear-gradient(90deg, #2ecc71 0%, #b2f7ef 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 20,
                                padding: '0.7rem 2.2rem',
                                fontSize: 16,
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px rgba(46,204,113,0.08)',
                                transition: 'background 0.2s'
                            }}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ChatPage;