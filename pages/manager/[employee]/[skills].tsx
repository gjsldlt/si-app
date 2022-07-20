import { useRouter } from 'next/router'

import PeopleList from '../../../components/peopleList/peopleList.component';

function Poeple() {
    const router = useRouter()
    const { people, skills } = router.query
    return (<div>
        Poeple Home {people} - {skills}

        <PeopleList />

    </div>);
}

export default Poeple;