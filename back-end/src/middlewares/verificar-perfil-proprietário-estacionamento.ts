import { Perfil } from "../entidades/usuário";
export default function verificarPerfilProprietárioEstacionamento(request, response, next) {
    if (request.perfil === Perfil.PROPRIETÁRIO_ESTACIONAMENTO) return next();
    else return response.status(401).json({ erro: "Acesso não autorizado." });
};