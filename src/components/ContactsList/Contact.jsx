import css from './ContactsList.module.css'
import PropTypes from 'prop-types';


export const Contact = ({ name, number, id, onDeletContact }) => {
    return (
        <li className={css.contact__item}>
            <p>{name}: {number}</p>
            <button className={css.contact__btn} type="button" onClick={() => onDeletContact(id)}>Delet</button>
        </li>
    )
}

Contact.propTypes = {
   name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDeletContact: PropTypes.func.isRequired
}