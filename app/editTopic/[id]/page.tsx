import EditTopicForm from "@/components/EditTopicForm";
interface EditTopicProps {
  params: {
    id: string;
  };
}

const getTopicById = async (id: string): Promise<{ topic: { title: string; description: string } }> => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return { topic: { title: "", description: "" } };
  }
};

export default async function EditTopic({ params }: EditTopicProps) {
  const { id } = params;
  const { topic } = await getTopicById(id);
  const { title, description } = topic;

  return <EditTopicForm id={id} title={title} description={description} />;
}
