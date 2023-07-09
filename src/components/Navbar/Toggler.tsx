import {Bar, TogglerContainer, TogglerButton} from './TogglerStyles'

function Toggler({
    opened,
    toogle
} : {
    opened: boolean,
    toogle: () => void
}){
    return(
        <TogglerButton onClick={toogle}>
            <TogglerContainer $opened={opened}>
                <Bar/>
                <Bar/>
                <Bar/>
            </TogglerContainer>
        </TogglerButton>
    )
}

export default Toggler;