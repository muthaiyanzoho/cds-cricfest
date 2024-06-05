import { useUser } from "../../../context/user";

import { useEffect, useState } from "react";
import {
  getStumpTeamMembers,
  getTeamById,
  getTeamPlayers,
  getTeams,
} from "../../../lib/client";
import Table from "../../../components/shared/table";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { toReadableName } from "../../../utils/case-convertor";

export default function TeamPlayersPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserDetails } = useUser();
  const { teamId } = useParams();

  console.log(teamId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let members = await getStumpTeamMembers(teamId);
        console.log(members);
        setData(members);
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
      <h1 className="text-lg text-stone-300">Players</h1>
      <br />

      {loading ? <div className="flex items-center justify-center" style={{height: "calc(100vh - 180px)"}}>
        <SyncLoader color="#FFFFFF" />
      </div> :

      
      <section className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-4 ">
        {data.map((player, index) => (
          <div key={index} className="relative border-r-2 border-gray-600 rounded-xl">
            <div className="absolute inset-0 shadow-md bg-gradient-to-r from-black to-transparent rounded-xl"></div>
            <img
              className="object-cover h-40 rounded-xl"
              src={player.pimg}
              alt={player.un}
            />
            {player?.cap && (
             <img className="absolute bottom-0 w-6 h-6 left-1" src="assets/crown.png" alt="Captain"/>
            )}
            <ul className="absolute text-xs right-1 top-2">
              <li>
                {" "}
                <h2 className="text-sm">{player.un}</h2>
              </li>
              <li>
                <p>Matches: {player?.totmt || "-"} </p>
              </li>
              <li>
                <p>Runs: {player?.totrn || "-"} </p>
              </li>
              <li>
                <p>Wickets: {player?.totwk || "-"} </p>
              </li>
            </ul>
          </div>
        ))} 
      </section>}
    </main>
  );
}
