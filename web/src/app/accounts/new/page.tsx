"use client";
import { FormEvent } from "react";

export default function AccountsNew() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(formData);

    const response = await fetch("http://localhost:8080/accounts", {
      method: "POST",
      body: JSON.stringify({
        name: "adasd",
      }),
    });

    // Handle response if necessary
    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" />
      <button type="submit">Submit</button>
    </form>
  );
}
