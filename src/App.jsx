import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LandPage from './pages/LandPage'
import Layouts from './layouts/Layout'
import Onboard from './pages/Onboard'
import Jobpage from './pages/Jobpage'
import Joblist from './pages/Joblist'
import Postjob from './pages/Postjob'
import Savejob from './pages/Savejob'
import Myjob from './pages/Myjob'
import { ThemeProvider } from './components/theme'
import Proroute from './components/Proroute'

const router=createBrowserRouter([
  {
    element:<Layouts />,
    children:[
      {
      path:'/',
      element:<LandPage />,
      },
      {
        path:'/onboard',
        element:(<Proroute>
          <Onboard />
        </Proroute>)
      },
      {
        path:'/jobs',
        element:(<Proroute>
          <Joblist />
        </Proroute>)
      },
      {
        path:'/job/:id',
        element:(<Proroute>
          <Jobpage />
        </Proroute>)
      },
      {
        path:'/post',
        element:(
          <Proroute>
            <Postjob />
          </Proroute>
        )
      },
      {
        path:'/save',
        element:(
          <Proroute>
            <Savejob />
          </Proroute>
        )
      },
      {
        path:'/myjobs',
        element:(
          <Proroute>
            <Myjob />
          </Proroute>
        )
      }
    
    ]
  },
])
function App() {
return <div>
  <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
  <RouterProvider router={router}>

</RouterProvider>

  </ThemeProvider>
  

      

  
</div>
 
}

export default App
