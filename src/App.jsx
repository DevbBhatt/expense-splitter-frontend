import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import GroupDetails from "./pages/GroupDetails";
import AddExpense from "./pages/AddExpense";
import Balances from "./pages/Balances";
import Profile from "./pages/Profile";
import PublicRoute from "./components/PublicRoute";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route  path="/" element={ <PublicRoute> <Login /> </PublicRoute>}/>
        <Route path="/signup"element={<PublicRoute> <Signup /></PublicRoute> }/>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <Groups />
            </ProtectedRoute>
          }
        />

        <Route
          path="/groups/:id"
          element={
            <ProtectedRoute>
              <GroupDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expense"
          element={
            <ProtectedRoute>
              <AddExpense />
            </ProtectedRoute>
          }
        />

        <Route
          path="/balances"
          element={
            <ProtectedRoute>
              <Balances />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;