import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { Search } from "lucide-react";
import SearchResult from "./SearchResult";
import { useAppContext } from "../context/AppProvider";
import axios from "axios";
import { toast } from "react-toastify";

function SearchUser({ toggle, setShowSearchUser }) {
  const { backendUrl, token } = useAppContext();

  const [searchTerm, setSearchterm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function searchUsers() {
    try {
      const { data } = await axios.get(
        backendUrl + "/user/users?search=" + searchTerm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        // if (data.users.length === 0) {
        //   toast.warn("no users found");
        // }
        setSearchResult(data.users);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    searchUsers();
  }, []);

  return (
    <Modal title="search users" onClose={toggle}>
      <div className="searchbar">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchterm(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              searchUsers();
            }
          }}
        />
        <button onClick={searchUsers}>
          <Search />
        </button>
      </div>
      <div className="search_results">
        {searchResult.length === 0 ? (
          <>
            {" "}
            <h3 className="search_results_fallback">no users found</h3>
          </>
        ) : (
          <>
            {" "}
            {searchResult.map((result, idx) => (
              <SearchResult
                key={idx}
                data={result}
                onClose={setShowSearchUser}
              />
            ))}
          </>
        )}
      </div>
    </Modal>
  );
}

export default SearchUser;
