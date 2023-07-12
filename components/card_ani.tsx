'use client'
import React, { useState } from 'react';
import { Card, Button, CardActions, CardMedia, CardContent, Typography, Pagination, Stack } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded';

export default function CardAnime({ value }: any) {
    return (
        <>
            {value.map((data: any, index: any) => (
                <Card key={`${data.id}-${index}`} sx={{ maxWidth: 345 }} className='rounded-xl'>
                    <CardMedia
                        component="img"
                        height=""
                        image={data.attributes.posterImage.medium}
                        alt={data.attributes.titles.en}
                    />
                    <CardContent>
                        <Typography gutterBottom className='text-sm lg:text-xl'>
                            {data.attributes.titles.en}
                        </Typography>
                        <Rating
                            value={Number(data.attributes.averageRating) * 5 / 100}
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        <Stack direction="row" spacing={1}>
                            <Chip icon={<MilitaryTechIcon />} label={data.attributes.ratingRank} color="secondary" variant="outlined" size="small" />
                            {data.attributes.status == 'finished' ? (
                                <Chip icon={<CheckCircleRoundedIcon />} label={data.attributes.status} color="error" variant="outlined" size="small" />
                            ) : (
                                <Chip icon={<ScheduleRoundedIcon />} label={data.attributes.status} color="success" variant="outlined" size="small" />
                            )}
                        </Stack>
                    </CardContent>
                    <CardActions className='flex justify-end'>
                        <ModalBox title={data.attributes.titles.en} description={data.attributes.description} image={data.attributes.posterImage.original}/>
                    </CardActions>
                </Card>
            ))}
        </>
    )
}

function ModalBox(props: any) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen} className='lg:text-base text-xs'>
                info
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {props.titles}
                </DialogTitle>
                <DialogContent>
                    <CardMedia
                        component="img"
                        height=""
                        image={props.image}
                        alt={props.title}
                    />
                    <DialogContentText id="alert-dialog-description">
                        {props.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}