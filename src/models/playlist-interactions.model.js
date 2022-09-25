import mongoose from "mongoose";

const playlistInteractionsSchema = new mongoose.Schema(
    {
        id: { type: String },
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true },
        listaReproducao: { type: mongoose.Schema.Types.ObjectId, ref: "listas_de_reproducoes", required: true }
    }
)

const playlistsInteractions = mongoose.model("listas_de_reproducoes_interacoes", playlistInteractionsSchema);

export default playlistsInteractions;