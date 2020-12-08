
import { v4 as uuidv4 } from 'uuid';

const FlightsList = ({items, onClick}) => {
    const Items = () => {
        const itemsList = []
        if (Array.isArray(items) && items.length > 0) {
            items.forEach((item, idx) => {
                itemsList.push(
                <div key={uuidv4()} className="flight" onClick={() => onClick(idx)}>
                    <li className="name">{item.id}</li>
                    <span className="departure">
                        <div className="">{item.origin}</div>    
                        <div className="">{item.readable_departure}</div>
                    </span>
                    <span className="arrival">
                        <div className="">{item.destination}</div>    
                        <div className="">{item.readable_arrival}</div>
                    </span>
                </div>);
            });
        }
        return itemsList;
    };

    return (
        <ul className="flights">
            <Items/>
        </ul>
    );

};

export default FlightsList;
