import {Schema, model} from "mongoose"

const transactionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "Others"
    },
    type: {
        type: String,
        enum: ["credit", "debit"]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{
    timestamps: true
});

const Transaction = model("Transaction",transactionSchema);

export default Transaction;