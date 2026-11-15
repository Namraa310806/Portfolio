import { TechChip } from "@/components/ui/tech-chip";

const row = [
  "Python", "Django", "Celery", "Redis", "PostgreSQL", "C++20", "Docker", "AWS",
  "FastAPI", "TypeScript", "React", "Kubernetes", "ThreadSanitizer", "TensorFlow", "Linux", "Git",
];

/** A slow, endless strip of the stack. Pauses on hover; static for reduced motion. */
export function TechMarquee() {
  const items = [...row, ...row];
  return (
    <div aria-hidden className="marquee-mask relative overflow-hidden py-6">
      <div className="marquee-track flex w-max gap-3">
        {items.map((tech, i) => (
          <TechChip key={`${tech}-${i}`} tech={tech} size="md" />
        ))}
      </div>
    </div>
  );
}
