import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Prediction from './Prediction';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/prediction" element={<Prediction />} />
        </Routes>
    );
}

export default App;