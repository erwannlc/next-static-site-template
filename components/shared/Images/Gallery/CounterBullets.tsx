export default function CounterBullets ({
  isActive,
  onClick
}: {
  isActive: boolean,
  onClick: () => void
}) {
  const size = "0.5rem";
  return (
    <div 
    style={{ 
      width: `${size}`, 
      height: `${size}`, 
      margin: `0 0.25rem`,
      cursor: "pointer",
      borderRadius: "100%", 
      border: "1px solid grey",
      boxShadow: "0 0 1px white",
      backgroundColor: `${isActive ? "grey" : "transparent"}`
    }}
    onClick={onClick}/>
    );
}