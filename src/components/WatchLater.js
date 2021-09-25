import React from 'react'
import { Sidebar } from './Sidebar'
import { Nav } from './nav'
import { useData } from '../Contexts/dataContext'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {Link} from 'react-router-dom';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: "18rem",
      textAlign:"center",
      height: "24rem",
      margin:"1rem",
      float: "left",
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    para:{
        color:"black"
    }
  }));
  
export function WatchLater() {
    const classes = useStyles();
    const {state:{watchLater}} = useData();
    const isWatchLaterEmpty= watchLater.length===0
    return (
        <>
        <Nav/>
        <div className="video-grid">
            <div>
                <Sidebar/>
            </div>
            <div>
                {isWatchLaterEmpty? <div><h1>There Is No Video In WatchLater Yet</h1> <Link to = "/videos" style= {{textDecoration: 'none'}}> <Button  variant="contained" color="secondary" size="large">Back TO SWIFTFLIX</Button></Link></div> : watchLater.map(video=>
                    <Link to = {`/videos/${video.playId}`}>
                    <Card className={classes.root} key={video.playId}>
                    <CardHeader
                    avatar={
                    <Avatar >
                        <img src={video.image} style={{width:"4rem",height:"2.5rem"}} alt="channel"/>
                    </Avatar>
                    }
                    title={video.channel}
                />
                    <img src={video.thumbnail} style={{width: "186px",height:"112px"}} alt="thumbnail"/>
                    <CardContent>
                    <Typography  paragraph>
                    {video.title}
                    </Typography>
                    <Typography paragraph>{video.timestamp}</Typography>
                    </CardContent>
                    </Card>
                    </Link>
                )}
            </div>
        </div>
        </>
    )
}

