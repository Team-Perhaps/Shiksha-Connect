import mongoose  from 'mongoose';

const Connection = async => {
    const URL = `mongodb+srv://abc:123@cluster0.ycvn278.mongodb.net/ShikshaConnect?`;

    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {   
        console.log('Error while connecting with the database ', error);
    }
}

export default Connection;