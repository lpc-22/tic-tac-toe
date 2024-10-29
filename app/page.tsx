import Game from "@/components/Game";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen w-screen h-fit flex flex-col justify-center items-center">
      <img
        src="/banner-tic-tac-toe.png"
        className="w-64 md:w-[50vw] max-w-[450px]"
      />
      <Game />
    </main>
  );
}
