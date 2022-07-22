import { Button } from 'reactstrap';
import { apiClient } from 'util/util';
import { useEffect } from 'react';

const Chat = () => {
    let websocket;

    useEffect(() => {
        wsConnect('ws://192.168.10.55:8080/ws/chat');
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

    const clickButton = () => {
        let msg = {
            "id": "wylee",
            "msg" : "hi"
        }

        apiClient.post('/chat', msg);
    }


    return (
        <div>
            CHAT
            <Button onClick={clickButton}>
                '버튼'
            </Button>
        </div>
    )
}

export default Chat;