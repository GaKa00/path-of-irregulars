export default function NewsCard( {id, title, description, date}: {id: number, title: string, description: string, date: string} ) {
    return (
        <div>
            <div className="flex  items-start justify-start gap-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <span> - </span>
            <p>{date}</p>
            </div>
            <p className="text-sm text-gray-500">{description}</p>

            <br/>
        </div>
    );
}