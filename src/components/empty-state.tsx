import { LayoutTemplate } from "lucide-react"

const EmptyState = ({page = 'item'} : {page?:string}) => (
    <div className="flex flex-col items-center space-x-3 themeTextMuted">
        <LayoutTemplate size={25}/>
        <p className=" text-secondary text-[3em]">
            No {page} available
        </p>
        <p>
            There are no {page}s present
        </p>
    </div>
)

export default EmptyState