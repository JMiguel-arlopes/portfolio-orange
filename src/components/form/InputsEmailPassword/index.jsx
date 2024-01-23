import styles from "./inputsemailpassword.module.css";
import Input from "../Input";

export default function InputsEmailPassword() {
  return (
    <>
      <Input
        text="Email adress"
        name="email"
        type="email"
        placeholder="John@gmail.com"
      />

      <Input
        text="Password"
        name="password"
        type="password"
        placeholder="3ygyg37ry74hsa"
      />
    </>
  );
}
