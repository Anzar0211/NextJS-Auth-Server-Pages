import { Input } from "../ui/input";

function CommonFormElement ({currentItem,value,onChange})
    {
    console.log(currentItem?.componentType);
    let content=null;
    switch(currentItem.componentType){
        case 'input':
            content=<Input
                name={currentItem.name}
                id={currentItem.name}
                placeholder={currentItem.placeholder}
                value={value}
                onChange={onChange}
            />
            break
        default:
            content = 
                <Input
                name={currentItem.name}
                id={currentItem.name}
                placeholder={currentItem.placeholder}
                value={value}
                onChange={onChange}
                />
                     
    }
}
export default CommonFormElement