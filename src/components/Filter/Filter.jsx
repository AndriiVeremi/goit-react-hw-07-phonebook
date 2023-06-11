import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { getFilter } from '../../redux/selector';
import { Label, Input } from './Filter.styled';

const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFilter = e => {
    dispatch(setFilter(e.target.value.toLowerCase().trim()));
  };

  return (
      <Label>
        Find contacts by name
        <Input
        type="text"
        value={filter}
        onChange={changeFilter}
      />
      </Label>
  );
};

export default Filter;
