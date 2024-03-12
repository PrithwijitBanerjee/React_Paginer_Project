import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
const ReactPaginer = () => {
    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const limit = 3;
    const getUsers = async () => {
        try {
            const { data: data1 } = await axios.get('http://127.0.0.1:3004/users');
            setUsers(data1);
            const totalUsers = users?.length;
            setPageCount(Math.ceil(totalUsers / limit));
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    const fetchUsers = async (pageNo) => {
        try {
            const { data: data1 } = await axios.get(`http://127.0.0.1:3004/users?_page=${pageNo}&_limit=${limit}`);
            return data1;
        }
        catch (error) {
            console.log(error);
        }
    }
    const handlePageChange = async data => {
        const currentPageNo = data?.selected + 1;
        const res = await fetchUsers(currentPageNo);
        setUsers(res);
    }
    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    {
                        (users?.length === 0) ? <>
                            <div className='text-center' style={{ margin: '500px 500px' }}>
                                <h4>Loading...</h4>
                            </div>
                        </> : <>
                            {
                                users?.map(user => {
                                    return (<>
                                        <div className='col-md-3' key={user?.id}>
                                            <div className="card" style={{ width: '18rem' }}>
                                                
                                                <div className="card-body">
                                                    <h5 className="card-title">{user?.name}</h5>
                                                    <p className="card-text">{user?.company?.catchPhrase}</p>
                                                    <a href="#!" className="btn btn-primary">Go somewhere</a>
                                                </div>
                                            </div>

                                        </div>
                                    </>);
                                })
                            }
                        </>
                    }
                </div>
            </div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={4}
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default ReactPaginer