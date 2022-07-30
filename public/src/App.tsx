import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom"
import FormPage from "./pages/FormPage"
import { useTypedSelector } from "./hooks/useTypedSelector"
import CheckAuth from './components/CheckAuth';
import EntriesPage from './pages/EntriesPage';
import CreateEntryPage from 'pages/CreateEntryPage';
import EditEntityPage from 'pages/EditEntityPage';

function App() {

  const { isCheck, infoUser } = useTypedSelector(state => state.user)

  if (!isCheck) return <CheckAuth />

  return (
    <div className="App">
      <div className='container'>
        {
          !infoUser &&
          <Routes>
            <Route path="/form/registration" element={<FormPage type="registration" />} />
            <Route path="/form/login" element={<FormPage type="login" />} />
            <Route path="*" element={<Navigate to="/form/registration" />}  />
          </Routes>
        }

        {
          infoUser &&
          <Routes>
            <Route path="/" element={<EntriesPage />} />
            <Route path="/create-entry" element={<CreateEntryPage />} />
            <Route path="/edit-entry/:id" element={<EditEntityPage />} />
            <Route path="*" element={<Navigate to="/"  />}  />
          </Routes>
        }

      </div>
    </div>
  );
}

export default App;
