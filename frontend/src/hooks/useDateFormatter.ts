import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function useDateFormatter(){
    
    const formatDate = (isoDate: string) => {
        return format(new Date(isoDate), "dd MMMM yyyy", { locale: ptBR });
    };

    return { formatDate }    
}