import React, { useState, useRef } from "react";
import { Button, Tooltip } from "flowbite-react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

const CopyToClipBoard = ({ textRef }) => {
  const [open, setOpen] = useState(false);

  //function to copy to clipboard
  const copyToClipBoard = () => {
    if (textRef.current !== null && textRef.current.textContent !== null) {
      navigator.clipboard.writeText(textRef.current.textContent);
      setOpen(true);
      setTimeout(() => setOpen(false), 2000);
    }
  };
  return (
    <Tooltip content="Copy to clipboard">
      <Button
        outline={true}
        size="sm"
        gradientDuoTone="purpleToBlue"
        onClick={copyToClipBoard}
      >
        {open ? (
          <CheckIcon className="h-5 w-5" />
        ) : (
          <DocumentDuplicateIcon className="h-5 w-5" />
        )}
      </Button>
    </Tooltip>
  );
};

const TextArea = (props) => {
  const textInput = useRef(null);
  return (
    <form className="flex-1">
      <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
          <label className="sr-only">Your content</label>
          <textarea
            ref={textInput}
            {...props}
            className="px-0 min-h-[30vh] w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          ></textarea>
        </div>
        <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">
          <div className="flex pl-0 gap-2 sm:pl-2 items-center">
            <CopyToClipBoard textRef={textInput} />
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
