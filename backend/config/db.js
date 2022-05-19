import mongoose from 'mongoose'

const connectDB = async () => {
    try {
        // const url = "mongodb+srv://yashas:admin@cluster0.wsdqa.mongodb.net/mac-project?retryWrites=true&w=majority"
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        })

        console.log(`MongoDB Connected:${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB