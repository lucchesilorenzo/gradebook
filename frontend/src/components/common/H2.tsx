type H2Props = {
  children: React.ReactNode;
};

export default function H2({ children }: H2Props) {
  return (
    <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}
