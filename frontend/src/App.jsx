import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/login";
import Navbar from "./components/Navbar";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {isLogin ? <Login /> : <Home />}
      <div className="text-center mt-4">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          {isLogin ? "Go to Home" : "Login Page"}
        </button>
      </div>
    </div>
  );
}

export default App;
