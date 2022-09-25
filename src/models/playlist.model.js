import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        id: { type: String },
        dataPublicacao: { type: Date, required: true },
        titulo: { type: String, required: true },
        genero: { type: String, required: true },
        link: { type: String, required: true },
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios", required: true }
    }
)

const playlists = mongoose.model("listas_de_reproducoes", playlistSchema);

export default playlists;