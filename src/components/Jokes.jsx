import React, { useState } from 'react';
import { getJokesRandom } from '../services/AxiosService';
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import IconButton from '@mui/material/IconButton';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const Jokes = () => {
    const [Joke, setJokes] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    //const [JokeImg, setJokeImg] = useState(null);

    const obtainJokes = () => {
        getJokesRandom()
            .then((res) => {
                if (res.status === 200) {
                    //console.log(res)
                    console.log(res.data)
                    setJokes(res.data.value);
                }
                //setJokeImg(res.data.icon_url)
            })
            .catch((err) => {
                alert(`Something went wrong: ${err}`);
            })
    }

    const Like = () => {
        setLikes(likes + 1);
    }
    const DisLike = () => {
        setDislikes(dislikes + 1)
    }
    return (
        <div className='container'>
            <div style={{'display': 'flex', 'flexDirection': 'row'}}>
                <h3>Random Jokes</h3>
                <Button style={{'marginLeft': 'auto'}} variant="contained" onClick={obtainJokes}>Jokes</Button>
            </div>

            {/* {
                likes === 0 & dislikes === 0 ?
                    null :
                    (<div style={{ 'display': 'flex' }}>
                        <p style={{ 'color': '#5DADE2' }}>Likes: {likes}</p>
                        <p style={{ 'color': 'tomato', 'marginLeft': '10px' }}>Dislikes: {dislikes}</p>
                    </div>)
            } */}
            <div>
                {Joke != null ?
                    (<ThemeProvider theme={darkTheme}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image='https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png'
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Random Jokes
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {Joke}
                                </Typography>
                                <div style={{ 'display': 'flex', 'flexDirection': 'row', 'justifyContent': 'right', 'alignItems': 'right' }}>
                                    <p style={{ 'color': '#5DADE2' }}>Likes: {likes}</p>
                                    <p style={{ 'color': 'tomato', 'marginLeft': '10px' }}>Dislikes: {dislikes}</p>
                                </div>
                            </CardContent>

                            
                            <CardActions>
                                <IconButton aria-label="like">
                                    <ThumbUpOffAltIcon onClick={Like} />
                                </IconButton>
                                <IconButton aria-label="dislike">
                                    <ThumbDownOffAltIcon onClick={DisLike} />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </ThemeProvider>) :
                    (<div>
                        <h5>Create a Random Joke</h5>
                    </div>)
                }
            </div>

        </div>
    );
}

export default Jokes;
