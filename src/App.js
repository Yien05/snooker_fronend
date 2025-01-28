import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";
import Players from "./pages/Players";
import PlayerAddNew from "./pages/PlayerAddNew";
import News from "./pages/News";
import Matches from "./pages/Matches";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      {" "}
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Players />} />
            <Route path="/players/new" element={<PlayerAddNew />} />
            <Route path="/news" element={<News />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </CookiesProvider>
    </div>
  );
}

export default App;
