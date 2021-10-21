import { connect } from "react-redux";
const Comment = (props) => {
  const { comment } = props.com;
  console.log(props.com);
  return (
    <div className='comment'>
      <img
        className='logoUser'
        src='/assets/user.png'
        alt='logo-user'
        width='30'
      />
      {comment}
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
export default connect(mapStateToProps)(Comment)
