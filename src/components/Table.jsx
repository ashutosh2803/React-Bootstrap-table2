import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import "bootstrap/dist/css/bootstrap.min.css";
import paginationFactory from 'react-bootstrap-table2-paginator';
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import ToolkitProvider, {CSVExport} from 'react-bootstrap-table2-toolkit';
import axios from "axios";

const Table = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        axios.get("https://fake-server-ashutosh.herokuapp.com/students")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    const { ExportCSVButton } = CSVExport;
    
    const MyExportCSV = (props) => {
        const handleClick = () => {
            props.onExport();
        }
        return (
            <div>
                <ExportCSVButton className="btn btn-success" onClick={handleClick}>Export to CSV</ExportCSVButton>
            </div>
        )
    }
    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 5,
        lastPageText: ">>",
        firstPageText: ">>",
        nextPageText: ">",
        prePageText: "<",
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            console.log('page', page);
            console.log('sizePerPage', sizePerPage);
        }
    });
    const columns = [
        {dataField: "id", text: "Id"},
        { dataField: "name", text: "Name", sort: true, filter: textFilter() },
        { dataField: "score", text: "Score", sort: true, filter: textFilter() },
        { dataField: "gender", text: "Gender"},
        { dataField: "school", text: "School", sort: true, filter: textFilter() },
        {dataField: "dob", text: "D.O.B", filter: textFilter()}
    ]

    console.log(users);
    return (
        <div className="container">
            <h1 style={{textAlign: "center"}}>Users</h1>
            <ToolkitProvider
                bootstrap4
                keyField='id'
                data={users}
                hover
                striped
                columns={columns}
                exportCSV
            >
                {
                    props => (
                        <>
                            <MyExportCSV {...props.csvProps} />
                            <BootstrapTable
                                pagination={pagination}
                                filter={filterFactory()}
                                {...props.baseProps}
                            />
                        </>
                    )
                }
            </ToolkitProvider>
        </div>
    )
}

export default Table;
