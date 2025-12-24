import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

export default function StarRating({ rating, onRatingChange, size = 28 }: StarRatingProps) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Rating
        name="user-rating"
        value={rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          onRatingChange(newValue || 0);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        sx={{
          fontSize: `${size}px`,
          color: 'white',
          '& .MuiRating-icon': {
            color: 'inherit',
          },
        }}
      />
      {rating !== 0 && (
        <Box sx={{ ml: 1, fontSize: '0.875rem', color: 'inherit' }}>
          {labels[hover !== -1 ? hover : rating]}
        </Box>
      )}
    </Box>
  );
}
