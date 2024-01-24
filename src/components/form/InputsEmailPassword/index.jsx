import Input from "../Input";

export default function InputsEmailPassword({ handleOnChange, user }) {
  return (
    <>
      <Input
        text="Email adress"
        name="email"
        type="email"
        placeholder="John@gmail.com"
        handleOnChange={handleOnChange}
        value={user.email ? user.email : ""}
      />

      <Input
        text="Password"
        name="password"
        type="password"
        placeholder="3ygyg37ry74hsa"
        handleOnChange={handleOnChange}
        value={user.password ? user.password : ""}
      />
    </>
  );
}
