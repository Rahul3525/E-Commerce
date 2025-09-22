import { Star } from "lucide-react"
import "./Rating.css"

const Rating = ({ value, count, showCount = true }) => {
  const fullStars = Math.floor(value)
  const hasHalfStar = value % 1 !== 0
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="rating">
      <div className="stars">
        {/* Full stars */}
        {[...Array(fullStars)].map((_, index) => (
          <Star key={`full-${index}`} size={14} className="star star-filled" />
        ))}

        {/* Half star */}
        {hasHalfStar && <Star size={14} className="star star-half" />}

        {/* Empty stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <Star key={`empty-${index}`} size={14} className="star star-empty" />
        ))}
      </div>

      {showCount && count && <span className="rating-count">({count})</span>}
    </div>
  )
}

export default Rating
