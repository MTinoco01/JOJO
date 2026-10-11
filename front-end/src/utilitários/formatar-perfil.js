export default function formatarPerfil(perfil) {
    switch (perfil) {
        case "proprietário_estacionamento": return "ProprietárioEstacionamento";
        case "proprietário_carro": return "ProprietárioCarro";
        default: return;
    }
};