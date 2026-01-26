import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn("py-16 md:py-20 overflow-hidden", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-12">
          <div className="flex flex-col items-center gap-3 text-center max-w-2xl">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              {title}
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Marquee Track */}
          <div
            className="flex gap-4 overflow-hidden [--duration:40s] [--gap:1rem]"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            {/* Animate the wrapper */}
            <div className="flex gap-4 animate-marquee hover:[animation-play-state:paused]">
              {/* Duplicate testimonials 4 times for seamless loop */}
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${setIndex}-${i}`}
                    author={testimonial.author}
                    text={testimonial.text}
                    href={testimonial.href}
                  />
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
