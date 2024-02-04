import { useState } from "react";
import Input from "../Input";

export default function InputsEmailPassword({ handleOnChange, user }) {
  const [isPassword, setPassword] = useState(false);

  const togglePassword = () => {
    setPassword(!isPassword);
  };

  return (
    <>
      <Input
        text="Email"
        name="email"
        type="email"
        handleOnChange={handleOnChange}
        value={user.email ? user.email : ""}
        maxLength={256}
      />

      <Input
        text="Senha"
        name="password"
        type={!isPassword ? "password" : "text"}
        handleOnChange={handleOnChange}
        value={user.password ? user.password : ""}
        toggleVisible={togglePassword}
        isPassword={isPassword}
        icon={true}
        maxLength={30}
      />
    </>
  );
}
