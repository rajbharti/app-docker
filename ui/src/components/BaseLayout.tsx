import Header from "./Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <article className=" mx-auto my-4 max-w-3xl">
      <Header />
      <div className="rounded-b-2xl bg-white p-4 shadow-lg ">{children}</div>
    </article>
  );
}
