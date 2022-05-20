import { Participante } from "./participante.model"
export class Cronica {
    id?: string;
    idCalendarioAnual?: string;
    idEspecialidad?: string;
    desEspecialidad?: string;
    idTurno?: number;
    desTurno?: string;
    idGrupo?: number;
    desGrupo?: string;
    idUbicacion?: string;
    desUbicacion?: string;
    fecFechaCorta?: string;
    fecFechaCompleta?: string;
    timHora?: string;
    desModalidad?: string;
    numTotalParticipantes?: number;
    numParticipantesAsistieron?: string;
    idEstatusCronica?: number;
    desEstatusCronica?: string;
    descPonentes?: string;
    desTecnicaDidactica?: string;
    desMaterialApoyo?: string;
    desObjetivosSesion?: string;
    desDesarrolloSesion?: string;
    desPerfilGrupo?: string;
    desObservaciones?: string;
    participanteList?: Participante[];
}