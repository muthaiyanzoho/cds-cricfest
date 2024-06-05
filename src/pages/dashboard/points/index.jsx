import { useEffect, useState } from "react";
import { getStumpTeamPointsTable } from "../../../lib/client";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";

export default function PointsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pointsTable = await getStumpTeamPointsTable();

        pointsTable = pointsTable.sort((a, b) => a.sno - b.sno);
        const updatedData = pointsTable.map(group => {
          const teamGroup = group?.trgptm || [];
          const updatedStatsData = teamGroup.map((team, index) => {
            const points = team?.ptsd || [];
            const stats = points.reduce((acc, cur) => {
              const won = acc?.won + cur?.won;
              const los = acc?.los + cur?.los;
              const tie = acc?.tie + cur?.tie;
              const mat = acc?.mat + cur?.mat;
              return { won, los, tie, mat};
            }, { won: 0, los: 0, tie: 0, mat: 0});
            return { ...team, ...stats };
          });
          group.trgptm = updatedStatsData;
          return group;
        });
        setData(updatedData);
      } catch (e) {
        toast.error("Unable to fetch the teams");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 30000); // Set up the interval to run fetchData every 30000 milliseconds (30 seconds)
    return () => clearInterval(intervalId);
  }, []);

  const headers = [
    {
      key: "team",
      name: "Team",
    },
    {
      key: "M",
      name: "M",
    },
    {
      key: "W",
      name: "W",
    },
    {
      key: "L",
      name: "L",
    },
    {
      key: "T",
      name: "T",
    },
    {
      key: "P",
      name: "P",
    },
    {
      key: "NRR",
      name: "NRR",
    },
  ];
  return (
    <>
      <main className="p-2 md:p-4">
        <h1 className="text-lg text-stone-300">Points Table</h1>
        <br />

        {loading ? (
          <div
            className="flex items-center justify-center"
            style={{ height: "calc(100vh - 180px)" }}
          >
            <SyncLoader color="#FFFFFF" />
          </div>
        ) : (
          <section className="">
            {data.map((group, index) => (
              <>
                <br />
                <h2 className="mb-2">{group?.trgpn}</h2>

                <div className="overflow-x-auto">
  <table className="min-w-full text-sm divide-y divide-gray-200 rounded-xl">
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header) => (
          <th
            key={header?.key}
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
          >
            {header?.name}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="text-gray-900 bg-white divide-y divide-gray-200">
      {group?.trgptm.map((row) => (
        <tr key={row?.key}>
          <td className="px-6 py-2 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 h-10">
                <img
                  className="w-10 h-10 rounded-full"
                  src={row?.tmimg}
                  alt=""
                />
              </div>
              <div className="ml-4">
                <div className="text-sm text-gray-900">
                  {row?.tmn}
                </div>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p>{row?.mat}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p>{row?.won}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p>{row?.los}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p>{row?.tie}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p>{row?.pts}</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p>{row?.nrr.toFixed(2)}</p>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

              </>
            ))}
          </section>
        )}
        <br/>
      </main>
    </>
  );
}
