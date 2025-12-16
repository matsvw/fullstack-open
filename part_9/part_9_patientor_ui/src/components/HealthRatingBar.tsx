import { Rating, Tooltip } from "@mui/material";
import { Favorite } from "@mui/icons-material";

import { styled } from "@mui/material/styles";

type BarProps = {
  rating: number;
};

const StyledRating = styled(Rating)({
  iconFilled: {
    color: "#ff6d75",
  },
  iconHover: {
    color: "#ff3d47",
  },
});

const HEALTHBAR_TEXTS = [
  "The patient is in great shape",
  "The patient has a low risk of getting sick",
  "The patient has a high risk of getting sick",
  "The patient has a diagnosed condition",
  "Rating missing",
];

const HealthRatingBar = ({ rating }: BarProps) => {
  return (
    <div className="health-bar">
      <Tooltip title={HEALTHBAR_TEXTS[rating]} placement="bottom-start">
        <div>
          <StyledRating
            readOnly
            value={rating === 5 ? null : 4 - rating}
            max={4}
            icon={<Favorite fontSize="inherit" />}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default HealthRatingBar;
