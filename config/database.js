import mongoose from 'mongoose';

const connectDatabase = () => {mongoose.connect(process.env.DB_LOCAL_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(con => {
    console.log(`MongoDB Database with host: ${con.connection.host}`);
});
};

export default connectDatabase;