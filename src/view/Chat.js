import { Button, Input, InputGroup, Card, CardHeader, CardBody, CardFooter } from 'reactstrap';
import { apiClient } from 'util/util';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'store/user';
import './Chat.css';


const Chat = () => {
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [msg, setMsg] = useState('');
    const [msgList, setMsgList] = useState([]);

    let websocket;

    useEffect(() => {
        if (userContext.user.id === '' || userContext.user.nickname === '') {
            navigate('/');
        }

        // let url = 'ws://192.168.10.55:8080/ws/chat';
        let url = 'ws://localhost:8080/ws/chat';
        wsConnect(url);

        return (() => {
            if (websocket != null) {
                console.log('!! websocket close !!');
                websocket.close();
            }
        })
    }, [])

    const wsConnect = (url) => {
        websocket = new WebSocket(url);

        websocket.onopen = () => {
            console.log("WebSocket opened...")
        }

        websocket.onmessage = (e) => {
            console.log("Message : ", e)
            onMessage(JSON.parse(e.data));
        }

        websocket.onclose = () => {
            console.log("WebSocket closed...");
        }

        websocket.onerror = (e) => {
            console.log("WebSocket ERROR : ", e)
        }
    }

    const onMessage = (data) => {
        let msgListTmp = msgList;
        msgListTmp.push(data);
        console.log(msgListTmp)
        setMsgList([...msgListTmp]);
        // let user = data.user;
        // let msg = data.msg;
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
        setMsg('');
    }


    return (
        <div>
            {msgList.map((data, index) => {
                return <div key={index} className={userContext.user.id === data.user.id ? 'chat-my' : 'chat-other' }>
                    <label className="chat-nickname">
                        {data.user.nickname}
                    </label>
                    <Card key={msgList.length} className="chat-msg">
                        <CardBody>
                            {data.msg}
                        </CardBody>
                    </Card>
                    <label className="chat-time">
                        {data.time}
                    </label>
                </div>
            })}
            <div className="chat-input">
                <InputGroup>
                    <Input value={msg} onChange={msgChange} />
                    <Button onClick={sendMsg}>
                        {'전송'}
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default Chat;