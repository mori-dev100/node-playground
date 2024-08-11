import { useRef, useState } from "react";

type User = {
  name: string;
  age: number;
  email: string;
};

export const UserForm = () => {
  const [user, setUser] = useState<User | undefined>();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUser({
      name: nameRef.current!.value,
      age: Number(ageRef.current!.value),
      email: emailRef.current!.value,
    });
  };

  return (
    <>
      <form
        style={{ display: "flex", flexDirection: "column", width: "400px" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input id="name" placeholder="name" ref={nameRef} />
        <label htmlFor="age">Age</label>
        <input id="age" placeholder="age" type="number" ref={ageRef} />
        <label htmlFor="email">Email</label>
        <input id="email" placeholder="email" type="email" ref={emailRef} />
        <button type="submit">Submit</button>
      </form>
      <ul>
        <li>Name: {user?.name}</li>
        <li>Age: {user?.age}</li>
        <li>Email: {user?.email}</li>
      </ul>
    </>
  );
};
