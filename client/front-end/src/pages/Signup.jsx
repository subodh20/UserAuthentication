import InputText from "../components/InputText";
const Signup = () => {
  return (
    <>
      <InputText label={"Email"} type={"email"} />
      <InputText label={"Username"} type={"text"} />
      <InputText label={"Password"} type={"password"} />
    </>
  );
};
export default Signup;
