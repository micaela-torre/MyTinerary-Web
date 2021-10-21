import Header from "../components/Header";
import Form from "../components/Form";
import Footer from "../components/Footer";

const SignUp = (props) => {
  return (
    <>
      <Header
        photo='fondoForm.png'
        title='Create Account!'
        subtitle='Please fill the details to Sign Up!'
        button={<Form {...props} />}
      />
      <Footer />
    </>
  );
};
export default SignUp;
