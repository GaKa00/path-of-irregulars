export default function Card( {id, name, type, power, description, imageUrl}: {id: string, name: string, type: string, power: number, description: string, imageUrl: string} ) {
    return (
        <div className = "  panel w-full justify-between rounded-xl border-slate-700 bg-slate-900/80">
            <h1>{name}</h1>
            <p>{description}</p>
            <p>{power}</p>
            <img src={imageUrl} alt={name} />
        </div>
    );
}