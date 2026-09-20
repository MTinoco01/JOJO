export default function formatarPerfil(perfil) {
    switch (perfil) {
        case "proprietário_estacionamento": return "Proprietário_Estacionamento";
        case "proprietário_carro": return "Proprietário_Carro";
        default: return;
    }
};