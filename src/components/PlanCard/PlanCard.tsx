import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import PushPinIcon from '@mui/icons-material/PushPin';

import Classes from "./PlanCard.module.css";
import PieChart from "../PieChart/PieChart";

const PlanCard:React.FC<{id: number, planName: string, notStarted: number, inProgress: number, completed: number, due: number}> = (props) => {

    const navigate = useNavigate();

    const [isPinVisible, setIsPinVisible] = useState(false);
    

    const getPlanAbbreviations = (planName: string): string => {
        let substrArr: string[] = []
        let planNameArr =  planName.split(" ");

        planNameArr.forEach(e => {
            if (! substrArr.includes(e.substring(0 , 1))) {
                substrArr.push(e.substring(0 , 1))
            } else {
                substrArr.push(e.substring(0 , 2))
            }
        })

        return substrArr.map(e => e.toUpperCase()).join("")
    }

    return (
        <>
            <div className={Classes.planCard} onClick={() => navigate(`/planboard/${props.id}`)}>
                <div className={Classes.cardHeader}>
                    <div className={Classes.tileIcon}>{getPlanAbbreviations(props.planName)}</div>
                    <div className={Classes.headerContent}>
                        <div className={Classes.cardTitle}>{ props.planName }</div>
                    </div>
                    <div className={Classes.pinIcon} onClick={()=>console.log("Clicked!!!")} 
                            onMouseEnter={() => {console.log("Mouse Over")}}>
                        { isPinVisible && <PushPinIcon fontSize="small" /> }
                    </div>
                </div>
                <div className={Classes.cardBody}>
                    <PieChart notStarted={props.notStarted} inProgress={props.inProgress} completed={props.completed} due={props.due} />
                </div>
            </div>
        </>
    )
}

export default PlanCard;