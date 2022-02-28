import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cards from "../components/Cards/Cards";


import ReactPaginate from "react-paginate";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import Uploader from "../components/Upload/Uploader";

const Posts = () => {
    const [responseData, setResponseData] = useState([]);
    const [pageNumber, setPageNumer] = useState(0);
    const [user, setUser] = useState();
    const [uploadPost, setUploadPost] = useState(0);

    const uploadNewPost = () => {
        setUploadPost(uploadPost + 1);

    }
    const navigator = useNavigate();

    useEffect(async () => {
        const response = await fetch("/postpage");
        const jsonRes = await response.json();
        if (response.status === 400)
            navigator("/singin")
        else setUser(jsonRes['author']);

    }, [])

    useEffect(async () => {
        document.title = "Me Poster -Posts"
        const response = await fetch("/allposts", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const JsonResponse = await response.json();

        setResponseData(JsonResponse);

    }, [uploadPost]);


    const postPrePage = 4;
    const pageVisited = pageNumber * postPrePage;

    const displayPage = responseData.slice(pageVisited, pageVisited + postPrePage);
    const pageCount = Math.ceil(responseData.length / postPrePage);

    const changePage = ({ selected }) => {
        setPageNumer(selected)
        window.scrollTo(0, 0)
    }

    if (responseData.length === 0) {
        return (
            <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "90vh" }}>
                <Spinner animation="border" />
            </div>
        )
    }

    return (

        <Container className='d-flex  jusfity-content-center align-itmes-center flex-column' >
            <h2 className="text-center text-primary my-5">Posts</h2>
            <div className="my-4 d-flex justify-content-end"  >
                <Uploader author={user} newPost={uploadNewPost} />
            </div>
            <Row>

                {
                    displayPage.map(items => {
                        return (
                            <Cards key={items.name} title={items.title} author={items.author} description={items.description} time={items.date} />
                        )
                    })
                }
            </Row>

            <ReactPaginate
                previousLabel={<AiOutlineArrowLeft />}
                nextLabel={<AiOutlineArrowRight />}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination justify-content-center pagination-sm"}
                nextClassName={"page-item"}
                previousClassName={"page-item"}
                pageClassName={"page-item"}
                breakClassName={"page-item"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                pageLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
            />
        </Container >

    )

}

export default Posts;