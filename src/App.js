import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import { AuthContext } from 'context/AuthContext';
import Routes from 'pages/Routes'
import { useContext } from 'react';
function App() {

  const { isAppLoading } = useContext(AuthContext)


  if (isAppLoading)
    return (
            <span className="loader"></span>
    )

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
