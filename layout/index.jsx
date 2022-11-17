import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Dropdown from "../components/Dropdown";
import Link from "next/link";
import { ciphers } from "../data";
import Footer from "./Footer";
import useDarkMode from "../utils/hooks/useDarkMode";
import { BsSun } from "react-icons/bs";
import { FiMoon } from "react-icons/fi";
import { Badge, Breadcrumb } from "flowbite-react";
import { HomeIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example({ children, title, page }) {
  const [colorTheme, setTheme] = useDarkMode();
  const { asPath } = useRouter();
  const links = asPath.split("/");
  links.shift();
  return (
    <>
      <div className="min-h-full dark:bg-gray-900">
        <Disclosure
          as="nav"
          className="bg-white !z-50 dark:bg-gray-800 border-b border-b-slate-50 dark:border-b-slate-700 sticky top-0 left-0"
        >
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/">
                        <div className="flex items-center cursor-pointer">
                          {/* <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            class="mr-3 h-8"
                            alt="FlowBite Logo"
                          /> */}
                          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            Ciphers
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Dropdown items={ciphers} title="Ciphers" />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {colorTheme === "light" ? (
                        <button
                          onClick={() => setTheme("light")}
                          className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-purple-500 hover:text-purple-500 ease-in duration-100"
                        >
                          <BsSun />
                        </button>
                      ) : (
                        <button
                          onClick={() => setTheme("dark")}
                          className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-purple-500 hover:text-purple-500 ease-in duration-100"
                        >
                          <FiMoon />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md dark:bg-gray-700 p-2 bg-zinc-100 hover:bg-zinc-100 text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                  {ciphers.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white hover:text-gray-800 text-gray-500",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 pb-3">
                  <div className="flex items-center px-5">
                    {colorTheme === "light" ? (
                      <button
                        onClick={() => setTheme("light")}
                        className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-purple-500 hover:text-purple-500 ease-in duration-100"
                      >
                        <BsSun />
                      </button>
                    ) : (
                      <button
                        onClick={() => setTheme("dark")}
                        className="flex items-center text-2xl gap-2 dark:text-gray-100 px-3 py-2 rounded-lg cursor-pointer dark:hover:text-purple-500 hover:text-purple-500 ease-in duration-100"
                      >
                        <FiMoon />
                      </button>
                    )}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header>
          <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            {links.length > 1 && (
              <>
                <Breadcrumb aria-label="Default breadcrumb example">
                  <Breadcrumb.Item href="/" icon={HomeIcon}>
                    Home
                  </Breadcrumb.Item>
                  {links.map((link, i) => (
                    <Breadcrumb.Item key={i} href={`/${link}`}>
                      {link}
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
                <h1 className="text-3xl flex gap-4 items-center font-bold tracking-tight text-gray-900 dark:text-slate-50 pt-3">
                  {title}
                  {page && (
                    <Badge color={page.difficultyColor} size="sm">
                      {page.difficulty}
                    </Badge>
                  )}
                </h1>
              </>
            )}
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 px-4">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
