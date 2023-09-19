"use client";

import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import axios from "axios";
import { useSearchDebounce } from "@/utils/Delay";
import Datatable from "@/components/element/datatable";
import { Input } from "@material-tailwind/react";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjk1MTA4MzE1LCJleHAiOjE2OTUxMTE5MTUsIm5iZiI6MTY5NTEwODMxNSwianRpIjoicmZrNEJhR0IyekFTYU5mYSIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.4lIsZN2k-w1rJ8oI4QYKBaUEJcJh4VOU4jAxADKkE8I";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

function UserList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useSearchDebounce();
  const [showModal, setShowModal] = useState(false);
  const [statusAction, setStatusAction] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);

    const response = await axios.get(
      `http://127.0.0.1:8000/api/user?page=${page}&perPage=${perPage}&search=${search}`,
      config
    );

    setData(response.data.data);
    setTotalRows(response.data.total);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value); // Update the search query when the input changes
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    setLoading(true);

    setPage(page);
    setPerPage(newPerPage);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers(); // fetch page 1 of users
  }, [page, search]);

  interface DataRow {
    name: string;
    email: string;
  }

  const columns: TableColumn<DataRow>[] = [
    {
      name: "No",
      selector: (row, index: any) => perPage * (page - 1) + index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
  ];

  return (
    <div className="p-10">
      <div className="flex justify-between items-center gap-2">
        <div className="flex items-center">
          <div className="flex border border-purple-200 rounded">
            <input
              type="text"
              onChange={handleInputChange}
              className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Search..."
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              setShowModal(true);
              setStatusAction(1);
            }}
            className="bg-lime-500 py-2 px-4 text-white rounded-sm"
          >
            Tambah
          </button>
        </div>
      </div>

      <Datatable
        title="User"
        totalRows={totalRows}
        columns={columns}
        data={data}
        loading={loading}
        handlePerRowsChange={handlePerRowsChange}
        setPage={setPage}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {statusAction == 1 ? "Tambah" : "Edit"}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <form className="">
                  <div className="relative p-6 flex-auto">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="name"
                      >
                        name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="name"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="email"
                      >
                        email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="email"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="password_confirmation"
                      >
                        password confirmation
                      </label>
                      <input
                        className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password_confirmation"
                        type="password"
                        placeholder="******************"
                      />
                      {/* <p className="text-red-500 text-xs italic">
                        Please choose a password. 
                        border-red-500
                      </p> */}
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default UserList;
