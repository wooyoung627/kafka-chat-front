import { Button, Input, InputGroup, Card, CardBody } from 'reactstrap';
import { apiClient } from 'util/util';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from 'store/user';
import './Chat.css';

const moment = require('moment');

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
            apiClient.post('/chat/enter', userContext.user);
            console.log("WebSocket opened...")
        }

        websocket.onmessage = (e) => {
            console.log("Message : ", e)
            onMessage(JSON.parse(e.data));
        }

        websocket.onclose = () => {
            apiClient.post('/chat/exit', userContext.user);
            console.log("WebSocket closed...");
        }

        websocket.onerror = (e) => {
            console.log("WebSocket ERROR : ", e)
        }
    }

    const onMessage = (data) => {
        let msgListTmp = msgList;
        msgListTmp.push(data);
        setMsgList([...msgListTmp]);
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
    
    const setTime = (date) => {
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }

    const exit = () => {
        userContext.setUser({ id:'', nickname:'' });
        navigate('/');
    }


    return (
        <div>
            <div className="chat-exit">
                <Button onClick={exit} color="danger">
                    {'나가기'}
                </Button>
            </div>
            {msgList.map((data, index) => {
                if (data.state === 0)
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
                            {setTime(data.time)}
                        </label>
                    </div>
                else if (data.state === 1)
                    return <div key={index}>
                        {data.user.nickname + data.msg}
                    </div>
            })}
            <div className="chat-input">
                <InputGroup>
                    <Input value={msg} onChange={msgChange} />
                    <Button onClick={sendMsg} color="primary">
                        {'전송'}
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default Chat;