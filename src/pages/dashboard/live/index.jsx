import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useUser } from "../../../context/user";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Toast from "../../../components/ui/toast";
import {
  getStumpCurrentMatchStats,
  getStumpHomeStats,
  getStumpTournamentStats,
} from "../../../lib/client";
import { SyncLoader } from "react-spinners";

const initialValue = { currentMatch: [], homeStats: null, tournamentStats: [] };

export default function LivePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    fetchLiveStats();
    const intervalId = setInterval(fetchLiveStats, 30000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchLiveStats = async () => {
    try {
      let [currentMatch, homeStats, tournamentStats] = await Promise.all([
        getStumpCurrentMatchStats(),
        getStumpHomeStats("-NvFCJywTlRHBCCGtCXA"),
        getStumpTournamentStats("-NvFCJywTlRHBCCGtCXA"),
      ]);
      setData({ currentMatch, homeStats, tournamentStats });
    } catch (e) {
      toast.error("Unable to fetch the live stats");
    } finally {
      setLoading(false);
    }
  };


  if(loading){
    return <div
    className="flex items-center justify-center"
    style={{ height: "calc(100vh - 180px)" }}
  >
    <SyncLoader color="#FFFFFF" />
  </div>
  }
  return (
    <div className="flex flex-col items-center justify-center px-2 my-5 text-slate-900">
      <div className="relative w-full px-2 py-1 bg-white border border-gray-500 rounded-md">
        <h3 className="my-2 text-sm md:text-base">Ongoing matches </h3>
        <br />
       
          {!data?.currentMatch.length ? (
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-20 h-20 rounded-lg lg:h-32 lg:w-32"
                src="assets/no-data.jpeg"
                alt="no data"
              />
              <p className="my-4 text-xs md:text-sm">No Data Found... </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:flex-row">
            { data?.currentMatch.map((match, index) => (
              <div
                key={index}
                className="relative px-2 py-1 my-2 border border-gray-500 rounded-md "
              >
                <h3 className="my-4">
                  {match?.mtl} Started at {match?.mti}
                </h3>

                {match?.iscp && (
                  <p className="absolute p-1 text-xs text-white bg-green-500 rounded-lg top-1 right-1">
                    Completed
                  </p>
                )}

                {match?.isms && match?.iscp === false && (
                  <p className="absolute p-1 text-xs text-white bg-red-500 rounded-lg top-1 right-1">
                    Live
                  </p>
                )}

                <p
                  className={
                    "absolute top-0 right-0 p-2 text-xs " + match?.statusColor
                  }
                >
                  {match?.status}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-6 h-6 border-2 border-gray-800 rounded-full md:w-10 md:h-10"
                      src={match?.atmi}
                      alt={match?.atmn}
                    />
                    <p className="text-sm">{match?.atmn}</p>

                    <p className="text-sm text-yellow-400">{match?.atms}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      className="w-6 h-6 border-2 border-gray-800 rounded-full md:w-10 md:h-10"
                      src={match?.btmi}
                      alt={match?.btmn}
                    />
                    <p className="text-sm">{match?.btmn}</p>
                    <p className="text-sm text-yellow-400">{match?.btms}</p>
                  </div>

                  <div>
                    <p className="text-xs text-orange-300">{match?.mrs}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}

      </div>

      <br />
      <div className="relative w-full px-2 py-1 bg-white border border-gray-500 rounded-md">
        <h3 className="my-2 text-sm md:text-base text-slate-900">Player Stats </h3>

          {!data?.tournamentStats.length ? (
            <div className="flex flex-col items-center justify-center">
            <img
              className="w-20 h-20 rounded-lg lg:h-32 lg:w-32"
              src="assets/no-data.jpeg"
              alt="no data"
            />
            <p className="my-4 text-xs md:text-sm">No Data Found... </p>
          </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-5 md:flex-row">
              {
                 data?.tournamentStats.map((match, index) => (
                  <div
                    key={index}
                    className="relative px-2 py-1 my-2 border border-gray-500 rounded-md "
                  >
                    {match?.iscp && (
                      <p className="absolute p-1 text-xs text-white bg-green-500 rounded-lg top-1 right-1">
                        Completed
                      </p>
                    )}
    
                    {match?.isms && match?.iscp === false && (
                      <p className="absolute p-1 text-xs text-white bg-red-500 rounded-lg top-1 right-1">
                        Live
                      </p>
                    )}
    
                    <p
                      className={
                        "absolute top-0 right-0 p-2 text-xs " + match?.statusColor
                      }
                    >
                      {match?.status}
                    </p>
    
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-8 h-8 border-2 border-gray-800 rounded-full md:w-10 md:h-10"
                          src={match?.pimg}
                          alt={match?.atmn}
                        />
                        <div>
                          <p className="text-sm">{match?.un}</p>
    
                          <p className="text-sm text-yellow-400">{match?.tmn}</p>
                        </div>
                      </div>
    
                      <ul>
                        {match?.bthsrnk && <li>Rank: {match?.bthsrnk}</li>}
                        {match?.bt4 && <li>No of fours: {match?.bt4 || "-"}</li>}
                        {match?.bt4rnk && (
                          <li>Fours Rank: {match?.bt4rnk || "-"}</li>
                        )}
                        {match?.bt6 && <li>No of six: {match?.bt6 || "-"}</li>}
                        {match?.bt6rnk && <li>Six Rank: {match?.bt6rnk || "-"}</li>}
                        {match?.blwkt && (
                          <li>No of Wickets:{match?.blwkt || "-"}</li>
                        )}
                        {match?.blwktrnk && (
                          <li>Wicket Rank:{match?.blwktrnk || "-"}</li>
                        )}
                        {match?.btrn && <li>Runs:{match?.btrn || "-"}</li>}
                        {match?.btrnrnk && (
                          <li>Run Rank:{match?.btrnrnk || "-"}</li>
                        )}
                      </ul>
    
                      <div>
                        <p className="text-xs text-orange-300">{match?.mrs}</p>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
      </div>
    </div>
  );
}
