interface SettingsInfoProps {
    title: string
    value?: string
}

export function SettingsInfoText({title, value}: SettingsInfoProps) {
    return (
        <div>
            <h3 className="text-base font-semibold">{title}</h3>
            <p className="text-sm text-zinc-400 pl-3 pt-2">{value}</p>
        </div>
    )
}