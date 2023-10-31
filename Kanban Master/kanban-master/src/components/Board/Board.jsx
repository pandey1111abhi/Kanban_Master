import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Ticket from "./ticket";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { fetchTicket, groupTicket } from "../../store/slices/dataSlice";
const Board = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data.data);
  const users = useSelector((state) => state.data?.data?.users);
  const groups = useSelector((state) => state.data?.groups);
  const groupTypes = useSelector((state) => state.data?.groupTypes);
  const isLoading = useSelector((state) => state.data?.isLoading);
  const filter = useSelector((state) => state.data?.filter);
  useEffect(() => {
    dispatch(groupTicket(filter));
  }, []);
  const groupName = (groupType) => {
    switch (filter.groupFilter) {
      case "userId":
        return users.filter((user) => user.id == groupType)[0].name;
      case "status":
        return groupType;
      case "priority":
        return `Priority ${groupType}`;
      default:
        return null;
    }
  };
  return (
    !isLoading && (
      <section id="board">
        {groupTypes?.map((groupType, i) => {
          return (
            <div className="category">
              <div className="category-actions">
                <span className="category-name">{groupName(groupType)}</span>
                <span className="actions">
                  <AiOutlinePlus />
                  <HiOutlineDotsHorizontal />
                </span>
              </div>
              {groups[i]?.map((group) => {
                return <Ticket ticket={group} />;
              })}
            </div>
          );
        })}
      </section>
    )
  );
};

export default Board;
