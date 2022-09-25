import jwt from "jsonwebtoken";
import config from "config";
import _contextApplication from "../models/application.model.js";

const _jwtKey = config.get("jwt.token");

class TokenService {
    static GenerateToken = (req, res) => {
        _contextApplication.find({
            "secret": req.body.secret,
            "key": req.body.key,
            "ativo": true
        }, async (err, result) => {
            if (err || result.length == 0) {
                res.status(401).send();
            } else {
                let applicationId = result[0]._id.toString();
                let token = jwt.sign({ id: applicationId }, _jwtKey, { expiresIn: 12000 });
                res.status(201).send({
                    message: "Token gerado com sucesso.",
                    token: token
                });
            }
        })
    }

    static ValidateToken = async (req, res) => {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];

            try {
                jwt.verify(token, _jwtKey);
                res.send();             
            } catch (err) {
                res.status(401).send();
            }

        } else {
            res.status(401).send();
        }
    }
}

export default TokenService;