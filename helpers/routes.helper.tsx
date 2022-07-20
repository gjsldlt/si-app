import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

export default [

    {
        name:'home',
        displayName:'Home',
        route:'/',
        icon:<HomeIcon/>
    },

    {
        name:'manager',
        displayName:'Manager',
        route:'/manager',
        icon:<SupervisorAccountIcon/>
    },

    {
        name:'employees',
        displayName:'Employees',
        route:'/employee',
        icon:<GroupsIcon/>
    },

]