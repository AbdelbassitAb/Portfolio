export function SectionDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-6" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-border" />
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60 shadow-[0_0_10px] shadow-primary/50" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-border" />
    </div>
  )
}
