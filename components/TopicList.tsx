import RemoveBtn from "./RemoveBtn"
import Link from "next/link"
import { HiPencilAlt } from "react-icons/hi"

import {
    Card,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"

const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/topics", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
    }
};

export default async function TopicList() {

    const { topics } = await getTopics();

    return (
        <>
            {topics.map((t:any) => (
                <Card className="flex p-4 mb-4 border-stone-800 container mx-auto px-4">
                    <div className="text-white">
                        <CardTitle>{t.title}</CardTitle>
                        <CardDescription>
                            {t.description}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <RemoveBtn id={t._id} />
                        <Link href={`/editTopic/${t._id}`}>
                            <HiPencilAlt size={24} className="text-white" />
                        </Link>
                    </div>
                </Card>
            ))}
        </>
    )
}


