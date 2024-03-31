import { MouseEvent, useState } from "react"

interface Props {
    items: string[];
    heading: string;
    // (item: string) => void
    onSelectItem: (item: string) => void; // onClick
}

function ListGroup({items, heading, onSelectItem }: Props) {
    const [selectedIndex, setSelectedIndex] = useState(-1);


    const getMessage = () => {
        return items.length === 0 && <p>No items found.</p>
    }

    
    
    return (
        <div>
            <h1>{heading}</h1>
            {getMessage()}

            <ul className="list-group">
                {items.map((item, index) => (
                    <li 
                        key={item} 
                        className={selectedIndex === index ? 'list-group-item active' : 'list-group-item' }
                        onClick={() => {
                            setSelectedIndex(index)
                            onSelectItem(item)
                        }}
                    > 
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListGroup;