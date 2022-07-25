import React from 'react';

const SignUp = React.lazy(() => import('view/SignUp'));
const Chat = React.lazy(() => import('view/Chat'));

const routes = [
    { path: '/', name: 'SignUp', component: <SignUp/>, exact: true },
    {path:'/chat', name:'Chat', component:<Chat/>}
]

export default routes;