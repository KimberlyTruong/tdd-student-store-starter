import "./Reciept.css"

export default function Reciept (props){
    return (
        <div className="reciept">
            <hr></hr>
            <p>{props.recieptMessage}</p>
        </div>
    )
}
