import { Button } from 'reactstrap';
import { useEffect } from 'react';

const Chat = () => {
    let websocket;

    useEffect(() => {
        console.log("Chat Component Mount");
        wsConnect('ws://localhost:8080/ws/chat');
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
        if (websocket !== null) {
            websocket.send("send data");
        }
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