import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
const Paginer = () => {
    const [items, setItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const limit = 10;
    const getItems = async () => { //custom hooks...
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
            const totalItems = data?.length;
            console.log('Total items:', totalItems);
            setPageCount(Math.ceil(totalItems / limit));    
            setItems(data?.slice(0,limit));
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getItems();
    }, []);
    const fetchComments = async pageNo => {
        try {
            const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments?_page=${pageNo}&_limit=${limit}`);
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    const handlePageChange = async data => {
        const currentPage = data?.selected + 1;
        console.log('current Page:',currentPage);
        const contentPerPage = await fetchComments(currentPage);
        setItems(contentPerPage);
    }
    return (
        <>


            <div className='container-fluid'>
                <div className='row'>
                    {
                        items?.map((value, index) => {
                            return (<>
                                <div className='col-sm-3' key={index?.id}>
                                    <div className="card" style={{ width: '18rem',margin:'20px', boxShadow:'20px 20px 50px'}}>
                                        <div className="card-body">
                                            <h5 className="card-title">{value?.id}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{value?.name}</h6>
                                            <p className="card-text">{value?.body}</p>
                                        </div>
                                    </div>

                                </div>
                            </>)
                        })
                    }
                </div>
            </div>
            <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'***'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                containerClassName='pagination justify-content-center'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                activeClassName='active'
                onPageChange={handlePageChange}
            />
        </>

    )
}

export default Paginer