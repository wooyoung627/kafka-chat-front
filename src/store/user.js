import { createContext, useState } from 'react';

export const UserContext = createContext({});

const UserStore = (props) => {
    const [user, setUser] = useState({
        id:"", nickname:""
    })

    return (
        <UserContext.Provider value={{ user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserStore;