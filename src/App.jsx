// src/App.jsx (UPDATED)
import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import OfflineBanner from "./components/OfflineBanner";

function App() {
  return (
    <>
      <OfflineBanner />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="items" element={<CharacterList />} />
          <Route path="items/:id" element={<CharacterDetails />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="favorites" element={<Favorites />} />
          
          {/* Protected Routes */}
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 */}
          <Route 
            path="*" 
            element={
              <h1 style={{
                color: 'red', 
                textAlign: 'center', 
                marginTop: '50px'
              }}>
                404 - Dimension Not Found
              </h1>
            } 
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;