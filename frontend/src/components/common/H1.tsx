type H1Props = {
  children: React.ReactNode;
};

export default function H1({ children }: H1Props) {
  return (
    <h1 className="scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl">
      {children}
    </h1>
  );
}
