import { clx } from "@/lib/utils"

const Divider = ({ className }: { className?: string }) => (
  <div
    className={clx("h-px w-full border-b border-gray-200 mt-1", className)}
  />
)

export default Divider
