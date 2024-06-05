import { useUser } from "../../../context/user";

import { useEffect, useState } from "react";
import {
  getPlayers,
  getTeamById,
  getTeamPlayers,
  getTeams,
} from "../../../lib/client";
import Table from "../../../components/shared/table";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { toReadableName } from "../../../utils/case-convertor";

export default function PlayersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserDetails } = useUser();
  const { teamId } = useParams();

  const tableHeaders = [
    {
      name: "Name",
      key: "Name",
    },
    {
      name: "Role",
      key: "Role",
    },
    {
      name: "Team",
      key: "TeamName",
    },
    {
      name: "Team No",
      key: "TeamId",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        let teams = await getPlayers();
        teams = teams.map((team) => {
          return {
            ...team,
            Name: team.Players.Name,
            Role: team.Players.IsCaptain ? "Captain" : "Player",
            TeamId: team.Teams.TeamId,
            TeamName: team.Teams?.Name
          };
        });
        setData(teams);
      } catch (e) {
        toast.error("Unable to fetch the teams");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="p-2 md:p-4">
       <h1 className="text-lg text-stone-300">Matches</h1>
      {loading ? (
        <div className="flex items-center justify-center" style={{height: "calc(100vh - 180px)"}}>
        <SyncLoader color="#FFFFFF" />
      </div>
      ) : (
        <Table headers={tableHeaders} data={data} />
      )}
    </main>
  );
}
