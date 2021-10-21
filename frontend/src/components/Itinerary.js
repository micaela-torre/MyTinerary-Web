import { useState, useEffect } from "react";
import Activity from "./Activity";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Comment from "./Comment";
const Itinerary = (props) => {
  const {
    author,
    hashtag,
    description,
    includes,
    duration,
    price,
    likes,
    comments,
    name,
    _id,
  } = props.itinerary;

  let priceDollars = []
  for (let i = 0; i < price; i++) {
      priceDollars.push( <div key={`box-${i}`} style={{backgroundImage:"url('https://i.postimg.cc/brXD3Qsj/iconos-de-dinero.png')", width: 38 , height: 30, backgroundPosition: "center", backgroundSize: "cover", marginLeft: 7}}></div>);
  }

  const [like, setLike] = useState(likes);
  const [comment, setComment]= useState('')
  const [arrayComments, setArrayComments]= useState(comments)
  const [view, setView] = useState(false);
  const clickHandler = () => {
    setView(!view);
  };
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [activities, setActivities] = useState([]);
  const createComment = async() =>{
    if(comment === ""){
      Toast.fire({
        icon: "warning",
        title:  "comment cannot be empty!",
      });
        return false
    }
    try{
        let res = await props.createComment(_id , {comments: {comment : comment , name: props.name, lastname: props.lastname , url: props.url}}, props.token)
    if(res.success){
        let newComment= {userId: props.user_Id, comment , name: props.name, lastname: props.lastname , url: props.url}
        setArrayComments([...arrayComments , newComment])
    }
    }catch(error){
        console.log(error)
    }
}

  useEffect(() => {
    async function getActivitiesByItinerary() {
      try {
        let res = await props.getActivitiesByItinerary(props.itinerary._id);

        setActivities(res.data.response);
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "warning",
          title: "Oops...We have a problem. 😥 Try later!",
          text: "In moments you will be redirected to Home.",
        });
        setTimeout(() => {
          props.history.push("/");
        }, 2000);
      }
    }
    getActivitiesByItinerary();
  }, [view]);


  const clickLike = () => {
    if (!props.token) {
      Toast.fire({
        icon: "warning",
        title: "Oops! You must be logged in to like a post!",
      });
    } else {
      async function putLike() {
        try {
          let res = await props.putLike(_id, props.token);
          if (res.success) {
            setLike(res.response);
          }
        } catch (e) {
          console.log(e);
        }
      }
      putLike();
    }
  };
  var hart =
    like.includes(props.user_Id) && props.token ? "https://i.postimg.cc/Hkvc8G0K/love.png" : "https://i.postimg.cc/13Xt0n45/like.png";
  return (
    <div key={name} className='itinerary'>
      <div className='box'>
        <div
          className='img-autor'
          style={{ backgroundImage: `url('${author.photo}')` }}></div>
        <h5>Experience by {author.nombre}</h5>
        <div className='likee'>
          {like.length}
          <div
            className='like'
            onClick={clickLike}
            style={{ backgroundImage: `url('${hart}')` }}></div>
        </div>
      </div>
      <h3 className='itinerary-h3'>{description}</h3>
      <div className='d-flex'>
        {hashtag.map((hast) => (
          <p key={hast} className='orange'>
            #{hast}
          </p>
        ))}
      </div>
      <div className='d-flex align-center'>
        <p>Duration: {duration} hours 🕐 </p>
        <p>Price:</p>{ priceDollars}
        <p>
          Includes: {includes[0]} & {includes[1]}
        </p>
      </div>

      {view && (
        <>
          <div className='activity-box'>
            <div className='comments'>
              <h3 className='comment-h3'>Comments</h3>
              {arrayComments.map((comment) => (
                    <div className='comment'>
                    <div style={{display: 'flex'}}>
                    <img
                      style={{width: 60 , borderRadius: '100%'}}
                      src= {comment.url}
                      alt='logo-user'
                      
                    />
                    <p style={{fontWeight: 'bolder'}}>{comment.name} {comment.lastname}</p>
                    </div>
                    {comment.comment}
                  {props.user_Id  &&  
                  <div style={{display: 'flex'}}>
                    <button onClick={() => props.deleteComment(props.user_Id, props.token)} ><img src= 'https://i.postimg.cc/jjK89hZm/Dise-o-sin-t-tulo-1.gif' width= '25'/></button>
                    <button><img src= 'https://i.postimg.cc/PxZ58k8v/Dise-o-sin-t-tulo-33.png' width= '25'/></button>
                    </div>}
                  </div>
              ))}
              <div className='paintComment'></div>
            </div>
            <div>
              <Activity activities={activities} />
            </div>
          </div>
          <div className='writeComment'>
            <input
              style={{ backgroundImage: " url('/assets/send.png')" }}
              onChange={(e)=> setComment(e.target.value)}
              type='textarea'
              placeholder='Write a comment..'
            />
            <img
              onClick={createComment}
              className='botoncito'
              src='/assets/send.png'
              width='10'
            />
          </div>
        </>
      )}
      <div>
        <button className='button-itin' onClick={clickHandler}>
          {!view ? "See More" : "See Less"}
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.users.token,
    user_Id: state.users._id,
    url: state.users.url,
    name: state.users.name,
    lastname: state.users.lastname,

  };
};
const mapDispatchToProps = {
  getActivitiesByItinerary: itinerariesActions.getActivitiesByItinerary,
  putLike: itinerariesActions.putLike,
  getItineraries: itinerariesActions.getItineraries,
  createComment: itinerariesActions.createComment,
  deleteComment: itinerariesActions.deleteComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
