import { Input, Button } from 'reactstrap';
import {UserContext} from 'store/user';
import { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    
    const navigate = useNavigate();
    const userContext = useContext(UserContext);
    const [nickname, setNickname] = useState('');

    const nicknameChange = (e) => {
        setNickname(e.target.value);
    }

    const useNickname = () => {
        let id = uuidv4();
        userContext.setUser({ id, nickname });
        navigate('/chat');
    }

    return (
        <div>
            <Input value={nickname} onChange={nicknameChange} placeholder="사용할 닉네임을 입력해 주세요."/>
            <Button style={{marginTop:'20px'}} onClick={useNickname}>{'사용하기'}</Button>
        </div>
    )
}

export default SignUp;