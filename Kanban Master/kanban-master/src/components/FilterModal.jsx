import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groupTicket } from "../store/slices/dataSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.data?.filter);
  const [groupFilter, setGroupFilter] = useState(filter.groupFilter);
  const [orderFilter, setOrderFilter] = useState(filter.orderFilter);
  useEffect(() => {
    dispatch(groupTicket({ groupFilter, orderFilter }));
  }, [orderFilter, groupFilter]);

  return (
    <section id="filter">
      <div className="filter-category">
        <span>Grouping</span>
        <select
          onChange={(e) => setGroupFilter(e.target.value)}
          name="Grouping"
          id=""
        >
          <option value="status">Status</option>
          <option value="userId">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className="filter-category">
        <span>Ordering</span>
        <select
          onChange={(e) => setOrderFilter(e.target.value)}
          name="Grouping"
          id=""
        >
          <option value="title">Title</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </section>
  );
};

export default Filter;
