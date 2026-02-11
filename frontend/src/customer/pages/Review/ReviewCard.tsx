import { Delete } from '@mui/icons-material'
import { Avatar, Box, Grid, IconButton, Rating } from '@mui/material'
import { red } from '@mui/material/colors'
import React from 'react'

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>
      <Grid container spacing={9}>
        <Grid size={{ xs: 1}}>
          <Box>
            <Avatar className='text=white' sx={{width:56, height:56, bgcolor:"#9155FD"}}>
              N
            </Avatar>
          </Box>
        </Grid>
        <Grid size={{ xs: 9 }}>
          <div className='space-y-2'>
            <div>
              <p className='font-semibold text-lg'>
                Nazar
              </p>
              <p className='opacity-70'>
                2024-09-27T23:16:07.478333
              </p>
            </div>
          </div>
          <Rating readOnly value={4} precision={1}/>
          <p>Value for money product, great purchase</p>

          <div>
            <img className='mt-2 w-24 h-24 object-cover' src="https://media-assets.grailed.com/prd/listing/temp/23e88e40520b4f4681ae0b8e7aeb3d54"/>
          </div>
        </Grid>
      </Grid>
      <div>
        <IconButton>
          <Delete sx={{color:red[700]}}/>
        </IconButton>
      </div>
    </div>
  )
}

export default ReviewCard