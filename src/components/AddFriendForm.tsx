import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { db } from "../db";

const schema = z.object({
  name: z.string(),
  age: z.number(),
});

type FormValues = {
  name: string;
  age: number;
};

export default function AddFriendForm() {
  const [status, setStatus] = useState<string>("");

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    const id = await db.friends.add({
      name: data.name,
      age: data.age,
    });
    setStatus(`Friend ${data.name} successfully added. Got id ${id}`);
    reset();
  };

  return (
    <>
      <p>add friend</p>
      {status}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" {...register("name")} />
          {errors && (
            <p className="mt-2 text-sm text-red-600" id="link-url-error">
              {errors.name?.message as string}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
        </div>
        {errors && (
          <p className="mt-2 text-sm text-red-600" id="link-url-error">
            {errors.age?.message as string}
          </p>
        )}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
