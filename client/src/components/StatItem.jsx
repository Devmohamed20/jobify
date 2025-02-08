import Wrapper from "../assets/wrappers/StatItem";
function StatItem({ bcg, color, icon, count, title }) {
  console.log(`bcg ${bcg} color ${color} icon ${count} count ${title}`);
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
}

export default StatItem;
