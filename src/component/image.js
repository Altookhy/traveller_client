import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box } from '@mui/material';
// import ImageListItemBar from '@mui/material/ImageListItemBar';
// import IconButton from '@mui/material/IconButton';
// import StarBorderIcon from '@mui/icons-material/StarBorder';

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CovidImage() {
  return (
    <Box sx={{border: '2px dashed grey' }}>
    <ImageList
      sx={{
        width: 'auto',
        height: 'auto',
      }}
      rowHeight={'auto'}
      gap={1}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/COVID-19_Outbreak_Cases_in_Malaysia_%28Density%29.svg/1200px-COVID-19_Outbreak_Cases_in_Malaysia_%28Density%29.svg.png',
    title: 'Diseases',
    author: '@OsamaTookhy',
    featured: true,
  }
];