import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./UserPagination.css";

const UserPagination = () => {
  const [pageData, setPageData] = useState();

  const getUsers = async (page = 1) => {
    // Fetching data using API
    const response = await fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));

    if (response.data.length === 0) {
      return toast("No data available in next page.");
    }
    setPageData(response);
  };

  const handlePageChange = async page => {
    await getUsers(page);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="user-page">
        <div className="data-div">
          {!!pageData?.data &&
            pageData.data.map(user => (
              <>
                <div className="user-data" key={user.id}>
                  <img src={user.avatar} alt="" srcSet="" />
                  <div className="info">
                    <h2>{`${user.first_name} ${user.last_name}`}</h2>
                    <h3> {user.email} </h3>
                  </div>
                </div>
              </>
            ))}
        </div>

        {!!pageData?.page && (
          <div className="pagination">
            {pageData.page === 1 ? (
              ""
            ) : (
              <button onClick={() => handlePageChange(pageData.page - 1)}>
                Prev
              </button>
            )}
            <button onClick={() => handlePageChange(pageData.page + 1)}>
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPagination;
