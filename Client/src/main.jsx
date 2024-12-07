import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import "@fontsource/jaro";
import Index from './Index.jsx'
import Root from './routes/Root.jsx';
import Gameboard from './routes/gameboard.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root/>,
    children: [
      {
        index:true,
        element: <Index/>,
      },
      {
        path: '/game',
        element: <Gameboard/>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
