import { Button, Input } from 'reactstrap';
import { apiClient } from 'util/util';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'store/user';


const Chat = () => {
    const userContext = useContext(UserContext);
    const [msg, setMsg] = useState('');

    let websocket;

    useEffect(() => {
        // wsConnect('ws://192.168.10.55:8080/ws/chat');
    }, [])

    const wsConnect = (url) => {
        websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log("WebSocket opened...")
        }

        websocket.onmessage = (e) => {
            console.log("Message : ", e)
        }

        websocket.onclose = () => {
            console.log("WebSocket closed...");
        }

        websocket.onerror = (e) => {
            console.log("WebSocket ERROR : ", e)
        }

    }

    const msgChange = (e) => {
        setMsg(e.target.value);
    }

    const sendMsg = () => {
        let data = {
            user: userContext.user,
            msg
        }

        apiClient.post('/chat', data);

        console.log(userContext.user)
    }


    return (
        <div>
            <Input value={msg} onChange={msgChange} />
            <Button onClick={sendMsg}>
                {'전송'}
            </Button>
        </div>
    )
}

export default Chat;