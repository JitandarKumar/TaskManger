import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
}
from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import ManageTask from './pages/Admin/ManageTask';
import CreatTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import MyTasks from './pages/Users/MyTasks';
import UserDashboard from './pages/Users/UserDashboard';
import ViewTaskDetails from './pages/Users/ViewTaskDetails';
import PrivateRoutes from './routes/PrivateRoutes';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/*Login and Signup Route*/}
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/*Admin Routes*/}
          <Route element={<PrivateRoutes allowedRoles={["admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/tasks" element={<ManageTask />} />
            <Route path="/admin/create-tasks" element={<CreatTask />} />
            <Route path="/admin/users" element={<ManageUsers />} />
          </Route>

           {/*Users Routes*/}
          <Route element={<PrivateRoutes allowedRoles={["users"]} />}>
            <Route path="/users/dashboard" element={<UserDashboard />} />
            <Route path="/users/tasks" element={<MyTasks />} />
            <Route path="/users/task-details/:id" element={<ViewTaskDetails />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;