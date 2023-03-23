import Header from "../components/Header";

interface Props {
  children: React.ReactNode;
}

export default function BaseLayout({ children }: Props) {
  return (
    <article>
      <Header />
      {children}
    </article>
  );
}
