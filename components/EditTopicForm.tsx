'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"

interface EditTopicFormProps {
  id: string;
  title: string;
  description: string;
}

export default function EditTopicForm({ id, title, description }: EditTopicFormProps) {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm items-center gap-1.5">
      <Input onChange={e => setNewTitle(e.target.value)} value={newTitle} type="text" placeholder="Topic Title" />
      <Input onChange={e => setNewDescription(e.target.value)} value={newDescription} type="text" placeholder="Topic Description" />
      <Button type="submit">Update Topic</Button>
    </form>
  );
}
