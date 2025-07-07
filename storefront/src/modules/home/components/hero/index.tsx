import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-border relative bg-background">
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <div className="space-y-4">
          <Heading
            level="h1"
            className="text-3xl leading-10 font-normal"
          >
            Well done! You have successfully deployed your Medusa 2.0 store with Modern Theme!
          </Heading>
          <Heading
            level="h2"
            variant="muted"
            className="text-xl leading-8 font-normal"
          >
            Theme switching is now enabled - try the buttons in the top right!
          </Heading>
        </div>
        <Button asChild variant="outline" className="mt-4">
          <a
            href="https://funkyton.com/medusajs-2-0-is-finally-here/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit the tutorial
          </a>
        </Button>
      </div>
    </div>
  )
}

export default Hero
