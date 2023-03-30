import Classes from "./TileIcon.module.css";

const TileIcon: React.FC<{bgcolor: string, children: string}> = (props) => {

    const iconStyles = {
        backgroundColor: props.bgcolor
    }

    return (
        <div style={iconStyles} className={Classes.TileIcon}>{props.children}</div>
    );
}

export default TileIcon;