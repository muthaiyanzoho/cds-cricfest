import { useEffect } from "react";
import { getTeamById, getTeamPlayers, getTeams } from "../../lib/client";
import { useLocation, useNavigate } from "react-router-dom"

export default function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    
    if(location.pathname === "/") {
      navigate("/live");
    }
  }, []);

  return (
    <></>
  );
}
