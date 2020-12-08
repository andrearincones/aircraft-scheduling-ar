import { v4 as uuidv4 } from 'uuid';

const AircraftsList = ({items, utilisation, onClick, selected}) => {
    const Items = () => {
        const itemsList = []
        if (Array.isArray(items) && items.length > 0) {
            items.forEach((item) => {
                const isSelected = item.ident === selected.ident;
                const className = isSelected ? 'aircraft-active' : 'aircraft';
                const decimals = utilisation > 0 ? 1 : 0;
                const utilisationValue = isSelected ? utilisation.toFixed(decimals) : 0;
                itemsList.push(
                    <div key={uuidv4()} className={className} onClick={() => onClick(item.ident)}>
                        <li className="name">{item.ident}</li>
                        <span className="utilisation">{`Utilisation: ${utilisationValue}\u0025`}</span>
                    </div>
                );
            });
        }
        return itemsList;
    };

    return (
        <ul key={uuidv4()}>
            <Items/>
        </ul>
    );

};

export default AircraftsList;
