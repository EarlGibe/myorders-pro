import mongoose from 'mongoose';
const { Schema } = mongoose;

const cataloghiSchema = new Schema({
    id: Number,
    articoli: Array,
    status: Boolean
});