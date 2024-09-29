import React from "react";

function Page() {
  return (
    <div>
      <div className="relative mt-2.5 text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            ></path>
          </svg>
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Enter email to get started"
          className="block w-full rounded-md border border-gray-200 bg-gray-50 py-4 pl-10 pr-4 text-black placeholder-gray-500 caret-blue-600 transition-all duration-200 focus:border-blue-600 focus:bg-white focus:outline-none"
        />
      </div>
    </div>
  );
}

export default Page;
