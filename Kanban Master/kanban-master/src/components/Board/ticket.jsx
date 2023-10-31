import { FaUserCircle } from "react-icons/fa";

const Tag = ({ priority = null, feature = null }) => {
  return (
    <div className="tags">
      <div style={{ display: "flex", gap: "3px" }}>
        {priority && <span className="tag">{priority}</span>}
        {feature && (
          <div className="tag">
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "20px",
                backgroundColor: "#BEC2C8",
              }}
            ></div>
            <span>Feature Request</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Ticket = ({ ticket }) => {
  console.log(ticket);
  return (
    <section id="ticket">
      <div className="content">
        <div className="header">
          <span>{ticket.id}</span>
          <FaUserCircle />
        </div>
        <div className="title">{ticket.title}</div>
        <div>
          <Tag
            priority={ticket.priority}
            feature={ticket.tag.includes("Feature Request")}
          />
        </div>
      </div>
    </section>
  );
};

export default Ticket;
