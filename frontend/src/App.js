import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Container from './components/layout/Container';
import Message from './components/layout/Message';

// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MyPets from './pages/MyPets';
import AddPet from './pages/AddPet';
import EditPet from './pages/EditPet';
import PetDetails from './pages/PetDetails';
import MyAdoptions from './pages/MyAdoptions';

// Context
import { UseProvider } from './context/UserContext';

function App() {
  return (
    <Router>
      <UseProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/user/profile"
              element={<Profile />}
            />
            <Route
              path="/pet/mypets"
              element={<MyPets />}
            />
            <Route
              path="/pet/add"
              element={<AddPet />}
            />
            <Route
              path="/pet/edit/:id"
              element={<EditPet />}
            />
            <Route
              path="/pet/myadoptions"
              element={<MyAdoptions />}
            />
            <Route
              path="/pet/:id"
              element={<PetDetails />}
            />
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </Container>
        <Footer />
      </UseProvider>
    </Router>
  );
}

export default App;
