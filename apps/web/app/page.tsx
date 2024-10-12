import { trpc } from "./trpc";

export default async function Home() {
  const result = await trpc.hello.query({ name: 'Prakash Banjade ' });

  return (
    <p>{result}</p>
  );
}
