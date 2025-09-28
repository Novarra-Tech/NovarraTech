export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="  items-center justify-center gap-4 py-8 md:py-10">
      <div >
        {children}
      </div>
    </section>
  );
}
