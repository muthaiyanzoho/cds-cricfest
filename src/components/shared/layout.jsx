import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowRightCircleIcon,
  ChartPieIcon,
  UsersIcon,
  XMarkIcon,
  Bars3Icon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChartBarIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  getSidebar,
  updateSidebar,
} from "../../utils/local-storage";

const navigation = [
  { name: "Live", href: "/live", icon: ChartBarIcon },
  { name: "Points", href: "/points", icon: ChartPieIcon},
  { name: "Matches", href: "/matches", icon: ChartPieIcon },
  { name: "Teams", href: "/teams", icon: UserGroupIcon },
  { name: "Players", href: "/players", icon: UsersIcon },
  { name: "Tournaments", href: "/tournaments", icon: UserGroupIcon },
  { name: "Instructions", href: "/instructions", icon: ChatBubbleLeftRightIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(getSidebar());

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    updateSidebar(!isCollapsed);
  };

  const handleLogout = async () => {
    try {
        await window.catalyst.auth.signOut("/");
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-blue-900 grow gap-y-5">
                    <Link to="/" className="flex items-center h-16 shrink-0">
                      {/* <img
                        className="w-auto h-8 rounded-md"
                        src="/assets/images/logo.png"
                        alt="CRM"
                      /> */}
                    </Link>
                    <nav className="flex flex-col flex-1">
                      <ul role="list" className="flex flex-col flex-1 gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <NavLink
                                  to={item.href}
                                  className={({ isActive }) =>
                                    classNames(
                                      isActive
                                        ? "bg-blue-950 text-white min-w-8"
                                        : "text-white hover:text-gray-400",
                                      "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6"
                                    )
                                  }
                                >
                                  {({ isActive }) => (
                                    <>
                                  
                                      {isCollapsed ? "" : item.name}
                                    </>
                                  )}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>

                        <li className="mt-auto">
                          <button
                            onClick={handleLogout}
                            className={`${
                              isCollapsed ? "hidden" : ""
                            } flex w-full p-2 -mx-2 text-sm leading-6 text-white rounded-md group gap-x-3 hover:text-gray-300`}
                          >
                            <ArrowRightCircleIcon
                              className="w-6 h-6 text-white shrink-0 group-hover:text-gray-300"
                              aria-hidden="true"
                            />
                            Logout
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div
            className={`flex flex-row items-center justify-between px-6 pb-4 overflow-y-auto transition-all border-r border-gray-200 bg-blue-900 grow gap-y-5`}
          >
            <Link to="/" className="flex items-center h-16 gap-2 shrink-0">
              <img className="w-4 h-4 md:w-8 md:h-8" src="assets/logo.png" alt="logo"/>
              <h2 className="flex items-center gap-2 text-base text-white">CDS Cricfest</h2>
            </Link>
            <nav className="items-center justify-between hidden lg:flex">
              <ul role="list" className="flex flex-col flex-1 gap-y-7">
                <li>
                  <ul role="list" className="flex -mx-2 space-x-6">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-blue-950 text-white min-w-8"
                                : "text-white hover:text-gray-400",
                              "group flex items-center gap-x-3 rounded-md p-2 text-sm leading-6"
                            )
                          }
                        >
                          {({ isActive }) => (
                            <>
                              {isCollapsed ? "" : item.name}
                            </>
                          )}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                {/* <li className="flex items-center mt-auto">
                  <button
                    onClick={handleLogout}
                    className={`${
                      isCollapsed ? "hidden" : ""
                    } flex w-full p-2 -mx-2 text-sm leading-6 text-white rounded-md group gap-x-3 hover:text-gray-300`}
                  >
                    Logout
                  </button>
                </li> */}
              </ul>
            </nav>
          </div>
        </div>

        <div>
          <main>
            <>
              <aside className="px-2 md:px-4">
                <Outlet/>
              </aside>
              <div className="lg:hidden">
                <button
                  type="button"
                  className="fixed top-0 right-0 z-50 flex items-center justify-center w-16 h-16"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="w-8 h-8 text-white" />
                </button>
              </div>
            </>
          </main>
        </div>
      </div>
    </>
  );
}
