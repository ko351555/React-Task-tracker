
import Button from './Button'
import PropTypes from 'prop-types'

const Header = ({ title,onAdd,showAddTask}) => {
    return (
        <header className='header'>
            <h1 >  {title}</h1>
          
                
               <Button color={showAddTask?'red':'green'} text={showAddTask?'Close':'Add'} onClick={onAdd} />

        </header>
    )
}
Header.defaultProps={
    title: 'Task Tracker'
}
Header.propTypes={
    title:PropTypes.string
}
//CSS in JS
// const headingStyle={
//     color:'red',
//     backgroundColor:'black'
// }
export default Header
