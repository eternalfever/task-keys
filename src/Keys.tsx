import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    let data = [...props.initialData].sort((a, b) => (a.id > b.id ? 1 : 0));
    data = props.sorting == 'ASC' ? data : data.reverse();
    return (
        <div>
            {data.map((item) => (
                <EditableItem key={item.id} item={item} />
            ))}
        </div>
    );
}

function EditData(props: { 
    initValue: string; 
    apply: (value:string) => void; 
    disable: () => void;}) {
        const [value, setValue] = useState(props.initValue);

        function enterBtn() {
            props.apply(value);
            props.disable();
        }

       function escapeBtn() {
            props.disable();
        }

        function handleKeydown(e: React.KeyboardEvent<HTMLDivElement>) {
            switch (e.key) {
                case 'Enter':
                    enterBtn();
                    break;
                case 'Escape':
                    escapeBtn();
                    break;
            }
        }

        return (
            <input
                value={value}
                onKeyDown={handleKeydown}
                onInput={(e) => setValue(e.currentTarget.value)}
            />
        );
    }

function EditableItem(props: { item: IItem }) {
        const [isEditMode, setIsEditMode] = useState(false);
        const [value, setValue] = useState(props.item.name);
    
        return (
            <div>
                {''}
                {isEditMode ? (
                    <EditData
                        initValue={value}
                        apply={setValue}
                        disable={() => setIsEditMode(false)}
                    />
                ) : (
                    <div onClick={() => setIsEditMode(true)}>{value}</div>
                )}
            </div>
        );
    }
