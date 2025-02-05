import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { CookiesProvider } from "react-cookie";
import Players from "./pages/Players";
import PlayerAddNew from "./pages/PlayerAddNew";
import PlayerEdit from "./pages/PlayerEdit";
import News from "./pages/News";
import NewdAddNew from "./pages/NewdAddNew";
import NewdEdit from "./pages/NewdEdit";
import NewdDetail from "./pages/NewDetail";
import Matches from "./pages/Matches";
import MatcheAddNew from "./pages/MatcheAddNew";
import MatcheEdit from "./pages/MatcheEdit";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Users from "./pages/Users";

function App() {
  return (
    <div className="App">
      {" "}
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Players />} />
            <Route path="/players/new" element={<PlayerAddNew />} />
            <Route path="/players/:id/edit" element={<PlayerEdit />} />
            <Route path="/news" element={<News />} />
            <Route path="/newds/new" element={<NewdAddNew />} />
            <Route path="/newds/:id/edit" element={<NewdEdit />} />
            <Route path="/newds/:id" element={<NewdDetail />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/matches/new" element={<MatcheAddNew />} />
            <Route path="/matches/:id/edit" element={<MatcheEdit />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/users" element={<Users />}></Route>

          </Routes>
        </BrowserRouter>
        <Toaster richColors position="top-right" />
      </CookiesProvider>
    </div>
  );
}

export default App;
