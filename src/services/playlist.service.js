import _contextPlaylist from "../models/playlist.model.js";
import _contextPlaylistInteraction from "../models/playlist-interactions.model.js";

class PlaylistService {
    static InsertPlaylist = (req, res) => {
        let playlist = new _contextPlaylist(req.body);
        playlist.dataPublicacao = Date.now();

        playlist.save((err) => {
            if (err) {
                res.status(500).send({ message: "Não foi possível cadastrar a playlist.", exception: err.message })
            } else {
                res.status(201).send({ message: "Playlist criada com sucesso", playlist: { id: playlist._id } });
            }
        });
    }

    static GetPlaylist = (req, res) => {
        let id = req.params.id;

        _contextPlaylist.findById(id)
            .populate('usuario')
            .exec((err, playlist) => {
                if (err) {
                    res.status(400).send({ message: "Playlist não encontrada." });
                } else {
                    _contextPlaylistInteraction.find({ 'listaReproducao': playlist._id.toString() }, (err, interacoes) => {
                        res.send({ message: "Playlist encontrada com sucesso.", playlist: ParseOutput(playlist, interacoes) });
                    });
                }
            });
    }

    static GetPlaylists = (req, res) => {
        _contextPlaylist.find({}, [], {
            skip: 0,
            limit: 10,
            sort: {
                dataPublicacao: -1
            }
        }).populate("usuario")
            .exec((err, playlists) => {
                if (err) {
                    res.status(500).send({ message: "Erro ao carregar playlists." });
                } else {
                    let output = [];

                    playlists.forEach((playlist, index) => {
                        _contextPlaylistInteraction.find({ 'listaReproducao': playlist._id.toString() }, (err, interacoes) => {
                            output.push(ParseOutput(playlist, interacoes));

                            if ((index + 1) == playlists.length) {
                                res.send({ message: "Playlists carregadas com sucesso.", playlists: output });
                            }
                        });
                    });

                }
            });
    }

    static GetPlaylistByQuery = (req, res) => {
        let { title, gender } = req.query;

        _contextPlaylist.find({
            $or: [
                { "titulo": title ? {$regex: title} : title },
                { "genero": gender }
            ]
        }, (err, playlists) => {
            res.send({ message: "Playlists consultadas com sucesso.", playlists });
        });

    }

    static InsertInteraction = (req, res) => {
        let { usuario, listaReproducao } = req.body;

        _contextPlaylistInteraction.find({ "usuario": usuario, "listaReproducao": listaReproducao }, (err, interactions) => {
            if (err || interactions.length == 0) {
                let interaction = new _contextPlaylistInteraction(req.body);

                interaction.save((err) => {
                    if (err) {
                        res.status(500).send({ message: "Erro ao gravar a interação." });
                    } else {
                        res.status(201).send();
                    }
                });
            } else {
                let interaction = interactions[0];
                _contextPlaylistInteraction.findByIdAndRemove(interaction._id.toString(), (err) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send({ message: "Erro ao gravar a interação." });
                    } else {
                        res.status(204).send();
                    }
                });
            }
        });
    }
}

function ParseOutput(playlist, interactions) {
    let output = {
        id: playlist._id.toString(),
        title: playlist.titulo,
        gender: playlist.genero,
        link: playlist.link,
        user: playlist.usuario.nomeExibicao,
        date: playlist.dataPublicacao,
        interactions: interactions.length
    }

    return output;
}

export default PlaylistService;