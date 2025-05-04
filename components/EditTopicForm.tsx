'use client'
import { Input } from "@/components/ui/input"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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

      toast.success("Topic updated successfully!", {
        style: { backgroundColor: '#28a745', color: 'white' }
      });

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update topic!", {
        style: { backgroundColor: '#dc3545', color: 'white' }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid w-full w=[750] items-center gap-1.5">
      <Input onChange={e => setNewTitle(e.target.value)} value={newTitle} type="text" placeholder="Topic Title" className="bg-violet-200/10 text-white" />
      <Input onChange={e => setNewDescription(e.target.value)} value={newDescription} type="text" placeholder="Topic Description" className="bg-violet-200/10 text-white" />
      <div>
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.25 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Update
        </button>
      </div>
    </form>
  );
}
