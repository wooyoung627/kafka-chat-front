import Chat from './view/Chat';
import { Redirect, Route, Routes, BrowserRouter, Router } from 'react-router-dom';
import UserStore from 'store/user';
import routes from 'routes';
import { Suspense } from 'react';

function App() {
  return (
    <div>
      <UserStore>
        <Suspense>
          <BrowserRouter>
            <Routes>
              {routes.map((route, idx) => {
                return route.component ? (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={route.component}
                  />
                ) : null
              })}
              {/* <Redirect /> */}
              </Routes>
            </BrowserRouter>
          </Suspense>
        </UserStore>
    </div>
  );
}

export default App;
