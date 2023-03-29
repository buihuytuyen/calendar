import './App.css';
import Login from './components/form/Login';
import Register from './components/form/SignUp';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import HomePage from './components/app/HomePage';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
