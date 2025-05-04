'use client'
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { toast } from "sonner"

export default function AddTopic() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !description) {
      toast.error('Title and description are required.', {
        style: { backgroundColor: '#dc3545', color: 'white' }
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        toast.success('Topic added successfully!', {
          style: { backgroundColor: '#28a745', color: 'white' }
        });
        router.push('/')
      } else {
        throw new Error('Failed to create a topic')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to create a topic', {
        style: { backgroundColor: '#dc3545', color: 'white' }
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full w=[750] items-center gap-1.5">
      <Input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Topic Title" className="bg-violet-200/10 placeholder-zinc-700 text-white" />
      <Input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Topic Description" className="bg-violet-200/10 placeholder-zinc-700 text-white" />
      <div>
        <button type="submit" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-md text-sm px-5 py-2.25 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
          Add Topic
        </button>
      </div>
    </form>
  )
}
