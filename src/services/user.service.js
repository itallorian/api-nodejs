import _contextUser from "../models/user.model.js";
import StringUtils from "../utils/string.utils.js";
import EmailService from "./email.service.js";

class UserService {
    static GetUserById = (req, res) => {
        const id = req.params.id;
        _contextUser.findById(id, (err, user) => {
            if (err) {
                res.status(400).send({ message: "Usuário não encontrado." });
            } else {
                res.send({ message: "Usuário localizado com sucesso.", user: user });
            }
        });
    }

    static InsertUser = (req, res) => {
        _contextUser.find({
            $or: [
                { 'nome': req.body.nome },
                { 'email': req.body.email }
            ]
        }, (err, usersResponse) => {
            if (usersResponse.length != 0) {
                res.status(400).send({ message: "Usuário já cadastrado." });
            } else {
                let user = new _contextUser(req.body);
                user.ativo = true;
                user.dataCadastro = Date.now();
                //to-do: criptografia correta
                user.senha = StringUtils.generateRandomString(18);

                user.save((err) => {
                    if (err) {
                        res.status(500).send({ message: "Não foi possível cadastrar o usuário.", exception: err.message });
                    } else {
                        EmailService.sendEmail(
                            user.email,
                            "Sua conta BuscaList foi Criada com Sucesso!",
                            `Para acessar sua conta, utilize seu nome de usuário e a seguinte senha senha: ${user.senha}`);

                        res.status(201).send({ message: "Usuário cadastrado com sucesso." });
                    }
                });
            }
        });
    }

    static AccessUser = (req, res) => {
        let { nome, senha } = req.body;

        _contextUser.find({ "nome": { $eq: nome }, "senha": { $eq: senha }, "ativo": true }, (err, users) => {
            if (users.length == 0) {
                res.status(401).send({ message: "Usuário ou senha incorretos." })
            } else {
                let user = users[0];
                user.senha = undefined;

                res.send({ message: "Usuário autenticado com sucesso.", user: user })
            }
        });
    }

    static UpdateUser = (req, res) => {
        const id = req.body.id;
        let body = req.body;
        body.id = undefined;

        if (body.senha) {
            body.dataAlteracaoSenha = Date.now();
        }

        _contextUser.findByIdAndUpdate(id, { $set: body }, (err) => {
            if (err) {
                res.status(500).send({ message: "Ocorreu um erro ao tentar realizar a atualização do usuário." });
            } else {
                res.status(204).send();
            }
        });
    }
}

export default UserService;