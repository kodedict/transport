import { ArrowLeft, ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"

const PageTitle = ({ title, back }: { title: string, back?:string }) => {
    return (
        <div className="flex gap-4 mb-5 flex-col">
            {back && <Link to={back} className="flex  py-2 px-0 hover:bg-primary hover:text-white themeRounded w-[5em] items-center justify-center themeTextMuted text-secondary" style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}><ChevronLeft className="!p-0 !m-0" size={20} /> <span className="mr-2">Back</span></Link> }
            <h1 className="page-title text-secondary">{title}</h1>
        </div>
    )
}

export default PageTitle