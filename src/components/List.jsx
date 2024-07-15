import { useRef } from 'react';
import '../styles/list.css';

const List = (props) => {
  const listRef = useRef();

  return (
    <div ref={listRef} className="category-list">
      {props.children}
    </div>
  );
};

export default List;
