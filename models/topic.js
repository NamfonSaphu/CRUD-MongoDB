import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
    {
        title: String,
        description: String
    }, {
    timeseries: true,
}
)
const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema)

export default Topic