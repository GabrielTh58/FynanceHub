import { IconMoneybag } from "@tabler/icons-react"
import React from "react"

interface AnalyticsCardsProps{
    title: string
    value: string
    icon?: any
}

export function AnalyticsCards({title, value, icon}: AnalyticsCardsProps){

    return(
        <div className="flex-1 p-5 bg-custom-gradient-card rounded-lg">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xs text-zinc-400 mb-2">{title}</h3>
                    <p className="text-lg">
                        R$ {value} 
                        <span className="ml-2 text-sm">+55%</span>
                    </p>
                </div>

                {icon ?? <IconMoneybag width={40} height={40} />}
            </div>
        </div>
    )
}