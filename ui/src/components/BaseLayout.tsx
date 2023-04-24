import Header from "./Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <article className=" my-4 max-w-3xl mx-auto">
      <Header />
      <div className="shadow-lg p-4 bg-white rounded-b-2xl ">{children}</div>
    </article>
  );
}
