import { Fragment, useEffect, useState } from "react";
import { getStumpTournamentMatches } from "../../../lib/client";
import { toast } from "react-toastify";
import { SyncLoader } from "react-spinners";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Listbox, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function MatchesPage() {
  const [data, setData] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches("-NvFCJywTlRHBCCGtCXA");
    const intervalId = setInterval(() =>  fetchMatches("-NvFCJywTlRHBCCGtCXA"), 30000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchMatches = async (trnId) => {
    try {
      const matches = await getStumpTournamentMatches(trnId);

      const sortedData = matches.sort((a, b) => {
        const timeA = a.mti.split(":").map(Number);
        const timeB = b.mti.split(":").map(Number);
        if (timeA[0] !== timeB[0]) {
          return timeA[0] - timeB[0];
        }
        // If hours are the same, compare the minutes
        return timeA[1] - timeB[1];
      });

      const updatedData = sortedData.map((match) => {
        let status;
        let statusColor;
        if (match?.iscp) {
          status = "Completed";
          statusColor = "text-gray-500";
        } else if (match?.isms && match?.iscp === false) {
          status = "Live";
          statusColor = "text-red-500";
        } else {
          status = "Scheduled";
          statusColor = "text-green-500";
        }

        return { ...match, status, statusColor };
      });
      setData(updatedData);

      const dropdownOptions = updatedData.map((match) => ({name: match?.atmn, value:match?.atmn, img: match?.atmi}))
      .filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i);
      const initialSelected = { name: "All", value: "All", img: "assets/logo.png" };
      setDropdownOptions([initialSelected,...dropdownOptions]);
      setSelected(initialSelected);
    } catch (error) {
      toast.error("Failed to fetch matches");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-2 md:p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg text-stone-300">Matches</h1>

        { dropdownOptions.length && <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative mt-2 w-52 md:w-72">
                <Listbox.Button className="relative w-full cursor-default rounded-md  py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <img
                      src={selected?.img}
                      alt=""
                      className="flex-shrink-0 w-5 h-5 rounded-full"
                    />
                    <span className="block ml-3 truncate">{selected?.name}</span>
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                    <ChevronUpDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base text-white bg-gray-600 rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    { dropdownOptions.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={person?.img}
                                alt=""
                                className="flex-shrink-0 w-5 h-5 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {person?.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>}
      </div>
      <br />

      {loading ? (
        <div
          className="flex items-center justify-center"
          style={{ height: "calc(100vh - 180px)" }}
        >
          <SyncLoader color="#FFFFFF" />
        </div>
      ) : (
        <section className="space-y-4">
          {data.filter((match) => selected?.value === "All" || match?.atmn === selected?.value)
          
          .map((match, index) => (
            <div
              key={index}
              className="relative px-2 py-1 border border-gray-500 rounded-md bg-blue-950"
            >
              <h3 className="my-4 text-sm">
                {match?.mtl} Starts at {match?.mti}
              </h3>

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
                  <p className="p-2 text-xs text-orange-300">{match?.mrs}</p>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
