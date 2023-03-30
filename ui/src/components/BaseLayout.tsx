import Header from "./Header";

interface PropsInterface {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: PropsInterface) {
  return (
    <article>
      <Header />
      {children}
    </article>
  );
}
