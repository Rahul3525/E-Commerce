import "./Badge.css"

const Badge = ({ text, variant = "default" }) => {
  return <span className={`badge badge-${variant}`}>{text}</span>
}

export default Badge
