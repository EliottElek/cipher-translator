import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({ title, items }) {
  return (
    <Menu as="div" className="z-50 relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium dark:text-gray-100 text-slate-500 border-b-2 border-b-transparent focus:outline-none focus:ring-offset-2 ">
          {title}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {items.map((item, i) => (
              <Menu.Item disabled={item.disabled} key={i}>
                {!item.available ? (
                  <span
                    className={classNames(
                      "text-gray-400",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {item?.name}
                  </span>
                ) : (
                  <Link href={item.href} disabled={item.disabled}>
                    <a
                      className={classNames(
                        "text-gray-700 dark:text-gray-100 flex justify-between",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {item?.name}
                    </a>
                  </Link>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
