'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from 'next/navigation'


export default function AddTopic() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter(); 

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if(!title || !description) {
      alert('Title and description are required.')
      return;
    } try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (res.ok) {
        router.push('/')
      } else {
        throw new Error('Failed to create a topic')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid w-full max-w-sm items-center gap-1.5">
      <Input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Topic Title" />
      <Input onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Topic Description" />
      <Button type="submit">Update Topic</Button>
    </form>
  )
}

