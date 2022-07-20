import React from 'react'
import { MDBCard, MDBCardBody, MDBBtn, MDBCardTitle, MDBTooltip, MDBCardGroup, MDBCardImage, MDBCardText, MDBIcon } from "mdb-react-ui-kit"
import { Link } from "react-router-dom";
import { excerpt } from '../utility';
import { useSelector, useDispatch } from 'react-redux';
import { likeTour } from '../redux/features/tourSlice';

const CardTour = ({ file, _id, title, description, tags, creator, likes }) => {
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id || user?.result?.googleId;

    const dispatch = useDispatch();
    console.log(creator)

    const Likes = () => {
        //  console.log(likes);
        if (likes.length > 0) {
            return likes.find((like) => like === userId) ? (
                <>

                    <MDBIcon fas icon="thumbs-up" />
                    &nbsp;
                    {likes.length > 2 ? (
                        <MDBTooltip tag="a" title={`You and ${likes.length - 1} others likes`}>
                            {likes.length} Likes
                        </MDBTooltip>
                    ) : (
                        `${likes.length} Like${likes.length > 1 ? 's' : ""}`
                    )}
                </>
            ) : (
                <>
                    <MDBIcon far icon="thumbs-up" />
                    &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
                </>
            )
        }
        return (
            <>
                <MDBIcon far icon="thumbs-up" />
                &nbsp;Like
            </>
        )
    }

    const handleLike = () => {
        dispatch(likeTour({ _id }));
    }

    return (
        <MDBCardGroup key={_id}>
            <MDBCard className='h-100 mt-2 d-sm-flex' style={{ maxWidth: "20rem" }}>
                <MDBCardImage
                    src={file}
                    alt={title}
                    position="top"
                    style={{ maxWidth: "100%", height: "100px" }}
                />
                <div className="top-left">{creator.name}</div>
                <span className="text-start tag-card">
                    {tags.map((tag, index) => (
                        <Link key={index} to={`/tours/tag/${tag}`}> #{tag} </Link>
                    ))}
                    <MDBBtn style={{ float: "right" }} tag="a" color="none" onClick={!user?.result ? null : handleLike}>
                        {!user?.result ? (
                            <MDBTooltip title="Please Login to like tour" tag="a" >
                                <Likes />
                            </MDBTooltip>
                        ) : (
                            <Likes />
                        )
                        }
                    </MDBBtn>
                </span>
                <MDBCardBody>
                    <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                    <MDBCardText className="text-start">
                        {excerpt(description)}
                        <Link to={`/tour/${_id}`}>Read More</Link>
                    </MDBCardText>
                </MDBCardBody>

            </MDBCard>
        </MDBCardGroup>
    )
}

export default CardTour
