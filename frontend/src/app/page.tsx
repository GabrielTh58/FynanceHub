import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Bem Vindo ao <span className="text-green-600">Fy</span>nanceHub!</h1>
      <p className="text-lg text-zinc-300">O melhor lugar para gerenciar suas finanças</p>

      <div className="flex flex-col items-center mt-16">
        <button className="font-bold py-2 px-12 mb-4 rounded bg-green-600 hover:bg-green-700">
          <Link href="/auth/login">Login</Link>
        </button>
        <p className="text-base text-zinc-300 under">Não possui uma conta? <Link className="font-bold underline hover:text-green-700 " href="/auth/register">Cadastre-se</Link></p>
      </div>
    </div>
  );
}
