import React, { useState } from 'react';
import { Input, Button } from 'antd';
// import 'antd/dist/antd.css';

const { TextArea } = Input;

function App() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleMessageSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (inputText.trim() !== '') {
            setMessages([...messages, { text: inputText, sender: 'user', type: event.target.innerText }]);
            setInputText('');
        }
    };

    const handleInputChange = (event: any) => {
        setInputText(event.target.value);
    };

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', marginTop: '40px' }}>
            <div style={{ height: 'auto', minHeight: '100px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
                {messages.map((message, index) => (
                    <div key={index} style={{ 
                        margin: '5px 0px',
                        border: '1px solid #ccc',
                        borderRadius: '20px',
                        padding: '10px'
                    }}>
                        <div style={{ margin: '5px' }}>
                            <span>{message.sender === 'user' ? 'You' : 'Bot'} ({message.type}):</span>
                        </div>
                        <div style={{ margin: '10px' }}>
                            <span>{message.text}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div style={{width: '90%'}}>
                    <TextArea
                        value={inputText}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                        autoSize={{ minRows: 2 }}
                        style={{ flex: '1', height: '100%', width: '100%' }}
                    />
                </div>
                <div style={{width: '10%'}}>
                    <div>
                        <Button style={{width: "100%", border: '1px solid #ccc'}} type="primary" onClick={handleMessageSubmit}>Action</Button>
                    </div>
                    <div style={{width: "100%"}}>
                        <Button style={{width: "100%", border: '1px solid #ccc'}} type="primary" onClick={handleMessageSubmit}>Say</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
