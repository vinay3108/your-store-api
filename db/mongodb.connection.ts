import mongoose, { ConnectOptions } from "mongoose";

/**
 * Connects to MongoDB using the Mongoose library.
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectMongoDB = async (): Promise<void> => {
    try {
        const mongoUri = 'mongodb://localhost:27018/finance_management';
        if (!mongoUri) {
            throw new Error(
                "MONGO_URI is not defined in the environment variables."
            );
        }

        await mongoose.connect(mongoUri);
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

// Set up connection event listeners for better debugging
mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established.");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected.");
});

// Gracefully close the MongoDB connection when the application terminates
process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination.");
    process.exit(0);
});

export default connectMongoDB;
