"use client";

import { SettingsNavLink } from "@/components/layout/SettingNavLink";
import { SettingsInfoText } from "@/components/layout/SettingsInfoText";

export default function Page() {
  return (
    <div>
      <nav className="flex items-center gap-14 text-lg mb-14">
        <SettingsNavLink href="/settings">Conta</SettingsNavLink>
        <SettingsNavLink href="/settings/appearance">Aparência</SettingsNavLink>
      </nav>

      <SettingsInfoText title="Tema" />
      <div className="flex items-center w-12 h-6 border border-zinc-300 rounded-full p-1 mb-10">
        <button className="flex items-center w-4 h-4 rounded-full bg-zinc-300"></button>
      </div>

      <SettingsInfoText title="Idioma" />
      <select
        name="language"
        id="language"
        className="w-32 text-xs border border-zinc-400 bg-zinc-800 px-2 py-1 hover:outline-none hover:border-zinc-300"
      >
        <option value="pt-BR" selected>
          Português
        </option>
        <option value="en-US">English</option>
      </select>
    </div>
  );
}
