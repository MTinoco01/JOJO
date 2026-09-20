import { Perfil } from '../entidades/usuário';
export default function verificarPerfilProprietárioCarro(request, response, next) {
    if (request.perfil === Perfil.PROPRIETÁRIO_CARRO) return next();
    else return response.status(401).json({ erro: "Acesso não autorizado." });
};