'use client'
import { IoTrashBin } from "react-icons/io5";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function RemoveBtn({ id }: Props) {
  const router = useRouter();
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/topics?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={removeTopic} className="text-red-500">
      <IoTrashBin size={24} />
    </button>
  )
}


