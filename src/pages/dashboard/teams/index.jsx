import { useUser } from "../../../context/user";

import { useEffect, useState } from "react";
import { getStumpTeams, getTeamById, getTeamPlayers, getTeams } from "../../../lib/client";
import Table from "../../../components/shared/table";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { toReadableName } from "../../../utils/case-convertor";

export default function TeamPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getUserDetails } = useUser();
  const userDetails = getUserDetails();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let teams = await getStumpTeams();
        console.log(teams)
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
      <h1 className="text-lg text-stone-300">Teams</h1>
      <br />
      {
        loading ?  <div className="flex items-center justify-center" style={{height: "calc(100vh - 180px)"}}>
        <SyncLoader color="#FFFFFF" />
      </div> : 
        <section className="grid grid-cols-1 gap-8 justify-items-center max-w-72 md:max-w-full md:grid-cols-4 lg:grid-cols-5">
        {data.map((team) => (
          <Link to={`${team.tmk}`} className="relative cursor-pointer">
            <div className="absolute inset-0 shadow-md bg-gradient-to-r from-black to-transparent rounded-xl"></div>
            <img className="object-cover rounded-xl" src={team.tmimg} alt={team.tmn} />
            <div className="absolute bottom-2 left-2">
              <h2 className="text-sm ">{team.tmn}</h2>
            </div>
          </Link>
        ))}
      </section>
      }
    </main>
  );
}
