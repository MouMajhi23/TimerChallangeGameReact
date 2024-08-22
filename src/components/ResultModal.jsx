import { forwardRef , useImperativeHandle, ref} from "react"
import { useRef } from "react";


//we can't pass ref as prop list , we have to pass it as second parameter
//insted ResultModal({result, ref, targetTime}) we will - 
const ResultModal= forwardRef(function ResultModal
    ({ targetTime, remainingTime, onReset}, ref){
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime/1000).toFixed(2); 
    const dialog =  useRef();
    //this is how score will always between 1 to 100
    const score = Math.round((1 - remainingTime/(targetTime*1000))*100);
   
    useImperativeHandle(ref , ()=>{
        return{
            open(){
                dialog.current.showModal();
            }
        }
    })
    return <dialog  ref={dialog} className="result-modal">
       {userLost && <h2>You Lost</h2>}
       {!userLost && <h2>Your Score: {score}</h2>}
        <p>The taget time was <strong>{targetTime} seconds</strong></p>
        <p>You stopped the timer with {formattedRemainingTime} seconds left</p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>
})
export default ResultModal;