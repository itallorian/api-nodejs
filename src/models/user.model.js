import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        id: { type: String },
        ativo: { type: Boolean, required: true },
        dataCadastro: { type: Date, required: true },
        nome: { type: String, required: true },
        nomeExibicao: { type: String },
        email: { type: String, required: true },
        senha: { type: String, required: true },
        dataAlteracaoSenha: { type: Date }
    }
);

const users = mongoose.model("usuarios", userSchema);

export default users;