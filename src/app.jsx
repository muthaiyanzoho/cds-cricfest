import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/user";
import { ProtectedRoute } from "./utils/protected-route";
import DashboardPage from "./pages/dashboard";
import { Toaster } from "./components/ui/sonner";
import Layout from "./components/shared/layout";
import TeamPage from "./pages/dashboard/teams";
import TeamPlayersPage from "./pages/dashboard/teams/players";
import PlayersPage from "./pages/dashboard/players";
import { useEffect } from "react";
import MatchesPage from "./pages/dashboard/matches";
import PageNotFound from "./pages/dashboard/not-found";
import LivePage from "./pages/dashboard/live";
import { getStumpTeams, getStumpTeamMembers, getStumpTeamStats, getStumpTeamOverview, getStumpTeamPointsTable, getStumpTournamentMatches } from "./lib/client";
import InstructionsPage from "./pages/dashboard/instructions";
import TournamentPage from "./pages/dashboard/tournaments";
import PointsPage from "./pages/dashboard/points";

function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                  <Layout />
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="live" element={<LivePage />} />
              <Route path="teams" element={<TeamPage />} />
              <Route path="tournaments" element={<TournamentPage />} />
              <Route path="points" element={<PointsPage />} />
              <Route path="teams/:teamId" element={<TeamPlayersPage />} />
              <Route path="matches" element={<MatchesPage />} />
              <Route path="players" element={<PlayersPage />} />
              <Route path="instructions" element={<InstructionsPage />} />
              
               {/* 404 Page Not Found */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster />
      </UserProvider>
    </>
  );
}

export default App;
