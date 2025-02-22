import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlineDelete } from "react-icons/ai";
import Loadercomp from "../../../components/Loadercomp";
import { BsQuestionLg } from "react-icons/bs";
import { useContactlistQuery, useDeleteContactMutation } from "../../../store/api/webinfoapi";

const Table = () => {
  const [data, setData] = useState([]);
  const [isDelete, setIsDelete] = useState(null); // Track the ID of the record to delete

  // Fetch all contacts
  const { data: userData, isLoading, error: fetchError } = useContactlistQuery();

  // Format the fetched data when userData changes
  useEffect(() => {
    if (userData) {
      const formattedData = userData.data.map((row, index) => ({
        ...row,
        serialNo: index + 1,
        id: row._id, // Set id to match DataGrid's expectations
        fullname: `${row.firstname} ${row.lastname}`,
        formatdate: new Date(row.createdAt).toLocaleDateString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      setData(formattedData);
    }
  }, [userData]);

  // Delete record mutation
  const [deleteRecord, { isLoading: isDeleting }] = useDeleteContactMutation();

  const deleteUser = async () => {
    if (isDelete) {
      try {
        // Delete the record by ID
        await deleteRecord(isDelete).unwrap();
        // Filter out the deleted record from the data
        setData((prevData) => prevData.filter((item) => item._id !== isDelete));
        // Reset the modal state
        setIsDelete(null);
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete the record.");
      }
    }
  };

  return (
    <div className="row bg-white pb-4 rounded-bottom table-responsive" style={{ paddingBottom: "7rem" }}>
      {isLoading ? (
        <div style={{ textAlign: "center", fontWeight: "700" }}>
          <Loadercomp size={100} />
        </div>
      ) : fetchError ? (
        <div>Error munna loading data: {fetchError.message}</div>
      ) : (
        <DataGrid
          columns={[
            { field: "serialNo", headerName: "S.No", flex: 0.3, align: "center" },
            { field: "fullname", headerName: "Full Name", flex: 0.6, align: "center" },
            { field: "email", headerName: "Email", flex: 1, align: "center" },
            { field: "mobile", headerName: "Mobile No", flex: 1, align: "center" },
            { field: "formatdate", headerName: "Created Date & Time", flex: 1 },
            {
              field: "_id",
              headerName: "Action",
              flex: 0.8,
              align: "center",
              renderCell: ({ row: { _id } }) => (
                <div>
                  <NavLink to="#" onClick={() => setIsDelete(_id)}>
                    <AiOutlineDelete fontSize={23} color="#0C5398" />
                  </NavLink>
                  <NavLink to={`/viewcontactform/${_id}`}>
                    <BiEdit fontSize={16} color="#0C5398" />
                  </NavLink>
                </div>
              ),
            },
          ]}
          rows={data}
          density="compact"
          pageSizeOptions={[10, 20, 30, 50, 100]}
          components={{ Toolbar: GridToolbar }}
        />
      )}

      {/* Modal for delete confirmation */}
      {isDelete && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="deleteConfirmation" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <BsQuestionLg className="question-logo" />
              <div className="modal-header mod-line"></div>
              <div className="modal-body">
                <h1 className="ccedit-h">Warning</h1>
                <p className="ccedit-p">Do You Really Want to Delete This Record?</p>
              </div>
              <div className="modal-footer mod-line m-auto">
                <button type="button" className="btn closebtn text-white" onClick={deleteUser} disabled={isDeleting}>
                  Proceed
                </button>
                <button type="button" className="btn text-white" style={{ background: "grey" }} onClick={() => setIsDelete(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
