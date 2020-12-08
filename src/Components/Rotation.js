import List from '@material-ui/core/List';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { v4 as uuidv4 } from 'uuid';

const Rotation = ({items, onClick}) => {
    const Items = () => {
        const itemsList = []
        if (Array.isArray(items) && items.length > 0) {
            items.forEach((item, idx) => {
                itemsList.push(
                <div key={uuidv4()} className="rotation" onClick={() => onClick(idx)}>
                    <li className="name">{`Flight: ${item.id}`}</li>
                    <span className="departure">
                        <div className="">{item.origin}</div>    
                        <div className="">{item.readable_departure}</div>
                    </span>
                    <span className="separator">
                        <ArrowRightAltIcon />
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
        <List className="rotations">
            <Items/>
        </List>
    );
};

export default Rotation;
