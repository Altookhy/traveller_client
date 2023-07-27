import * as React from 'react';
// import ImageList from '@mui/material/ImageList';
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

export default function LogoImage() {
  return (
    <Box sx={{border: '2px dashed grey' }}>
    {/* <ImageList
      sx={{
        // padding: 10 50 30 0
        width: 10,
        height: 60,
        transform: 'translateZ(0)',
      }}
      rowHeight={200}
      gap={1}
    > */}
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={item.img} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 20, 20, rows, cols)}
              alt={item.title}
              loading="lazy"
            />
            
          </ImageListItem>
        );
      })}
    {/* </ImageList> */}
    </Box>
  );
}

const itemData = [
  {
    img: 'https://drive.google.com/file/d/1XnMUYqO94gw99UJaPIiD5okgMQ_kTPk-/view?usp=sharing',
    title: 'Logo',
    author: '@OsamaTookhy',
    featured: true,
  }
];