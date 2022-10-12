import { Button } from "flowbite-react";
import React from "react";
const TextArea = (props) => {
  return (
    <form className="flex-1">
      <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
          <label className="sr-only">Your content</label>
          <textarea
            {...props}
            className="px-0 min-h-[30vh] w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          ></textarea>
        </div>
        <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
          <div className="flex pl-0 gap-2 sm:pl-2 items-center">
            <Button
              outline={true}
              size="sm"
              gradientDuoTone="purpleToBlue"
              disabled
            >
              Copy
            </Button>
            <Button
              disabled={props.value === "" && true}
              onClick={() => props.setValue("")}
              outline={true}
              size="sm"
              gradientDuoTone="purpleToBlue"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TextArea;
