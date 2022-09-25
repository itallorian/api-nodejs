import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        id: { type: String },
        ativo: { type: Boolean },
        aplicacao: { type: String },
        secret: { type: String },
        key: { type: String }
    }
);

const application = mongoose.model("aplicacoes", applicationSchema);

export default application;