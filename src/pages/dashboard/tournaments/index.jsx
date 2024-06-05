import { useEffect, useState } from "react";
import { getStumpTournaments } from "../../../lib/client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { SyncLoader } from "react-spinners";

export default function TournamentPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchTournaments = async () => {
    try {
      let tournaments = await getStumpTournaments();
      setData(tournaments);
      console.log(tournaments);
    } catch (e) {
      toast.error("Unable to fetch the tournaments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);
  return (
    <main className="p-2 md:p-4">
      <h1 className="text-lg text-stone-300">Tournaments</h1>
      <br />
      { loading ? <div className="flex items-center justify-center" style={{height: "calc(100vh - 180px)"}}>
        <SyncLoader color="#FFFFFF" />
      </div> :
      <section className="flex flex-col gap-4 md:flex-row md:gap-8">
        {data.map((tournament) => (
          <div className="relative w-72">
            <div className="absolute inset-0 shadow-md bg-gradient-to-r from-black to-transparent rounded-xl"></div>
            <img className="rounded-xl" src={tournament.trimg} alt={tournament.trn} />
            {tournament.iscomp && <p className="absolute px-2 text-xs bg-red-600 rounded-xl top-2 right-2"> Completed</p> } 
            <div className="absolute bottom-6 left-2">
              <h2 className="text-sm">{tournament.trn}</h2>
              <p className="flex items-center gap-2 text-xs"><MapPinIcon className="w-4 h-4"/> {tournament.loc}</p>
            </div>
          </div>
        ))}
      </section>
}

    </main>
  );
}
