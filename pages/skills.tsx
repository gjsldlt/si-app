import { Add } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';

function Skills() {

    const tailwindClasses = {
        content:'m-5',
        header:'text-2xl',
        input: 'border-2'
    }

    return (
        <div className={tailwindClasses.content}>
            <h2 className={tailwindClasses.header}>Skills Home</h2>

            <label>Add Skill: </label><input className={tailwindClasses.input} type="text" />
            <button><AddIcon/></button>
        </div>);
}

export default Skills;