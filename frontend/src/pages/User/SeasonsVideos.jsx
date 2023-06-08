import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomDivider from '../../components/helpers/CustomDivider'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import { Button, Typography } from '@mui/material'
import { PlayCircle } from '@mui/icons-material'
import Loader from '../../components/Loader'

const SeasonsVideos = () => {
    const { category, tvShows, season } = useParams()
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = (APPNAME+tvShows+'-'+category).toUpperCase()
    const [loader, setLoader] = useState()
    const [tvChannelVideo, setTVChannelVideo] = useState([])
    const [seasons, setSeasons] = useState([])
    const [forTitle, setForTitle] = useState('')
    const getTVChannelVideoList = () => {
        setLoader(true);
        AxiosClient.get(`/get_season_tv_shows/${category}/${tvShows}/${season}`)
        .then(({data})=>{
            setLoader(false)
            setTVChannelVideo(data.videos)
            setSeasons(data.seasons)
            setForTitle(data.forTitle)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getTVChannelVideoList()},[category, tvShows, season])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='py-4 px-6'>
                    <CustomDivider content={(forTitle && forTitle.category_name)+' - '+(forTitle && forTitle.tv_shows_name)}/>
                    <div className='my-4'>
                        {tvChannelVideo.length > 0 ? (
                            <Fragment>
                                <div className='grid grid-cols-2 md:grid-cols-6 gap-4 my-3.5 bg-white p-2 rounded-md shadow-md'>
                                    {seasons.map((data,id)=>{
                                        return(<Fragment key={id}>
                                            <Link to={`/${category}/${tvShows}/season/${data.seasons}`}><Button variant="contained" fullWidth startIcon={<PlayCircle/>}>Season {data.seasons}</Button></Link>
                                        </Fragment>)
                                    })}
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6'>
                                    {tvChannelVideo.map((data,id)=>{
                                        return(<Fragment key={id}>
                                            <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group bg-white rounded-md shadow-md'>
                                                <div className='px-4 pt-2 pb-1'>
                                                    <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                    <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                        <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                        <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                    </div>
                                                </div>
                                                <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-40' alt='vide_poster'/>
                                                <div className={'p-3'}>
                                                    <Link to={`/${category}/${data.sub_category_slug}/${data.video_slug}`}>
                                                        <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Fragment>)
                                    })}
                                </div>
                            </Fragment>
                        ) : (
                            <div className='flex justify-center items-center h-[80vh]'>
                                <Typography variant='h3' className='uppercase tracking-wider font-bold'>Sorry! No Vidos Found</Typography>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default SeasonsVideos