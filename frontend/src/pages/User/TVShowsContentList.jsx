import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomDivider from '../../components/helpers/CustomDivider'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import { Button, Typography } from '@mui/material'
import { PlayCircle } from '@mui/icons-material'
import Loader from '../../components/Loader'

const TVShowsContentList = () => {
    const { category, tvShows } = useParams()
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = (APPNAME+tvShows+'-'+category).toUpperCase()
    const [loader, setLoader] = useState()
    const [tvChannelVideo, setTVChannelVideo] = useState([])
    const [seasons, setSeasons] = useState([])
    const [forTitle, setForTitle] = useState('')
    const [latestVideo, setLatestVideo] = useState('')
    const getTVChannelVideoList = () => {
        setLoader(true);
        AxiosClient.get(`/get_tv_shows_video_lists/${category}/${tvShows}`)
        .then(({data})=>{
            setLoader(false)
            setTVChannelVideo(data.videos)
            setSeasons(data.seasons)
            setForTitle(data.forTitle)
            setLatestVideo(data.latestVideo)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getTVChannelVideoList()},[category, tvShows])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='py-4 px-6'>
                    <div className='flex flex-col-reverse md:flex-row gap-6'>
                        <div className='w-full'>
                            <CustomDivider content={(forTitle && forTitle.category_name)+' - '+(forTitle && forTitle.tv_shows_name)}/>
                            <div className='my-4'>
                                <div className='flex flex-col md:flex-row gap-4 bg-white p-3 rounded-md shadow-md'>
                                    <div className='w-full md:w-[30%]'>
                                        <h1 className='text-base md:text-xl tracking-wider font-bold mb-3 uppercase text-center'>Watch Latest Episode</h1>
                                    </div>
                                    <div className='w-full md:w-[70%]'>
                                        {(latestVideo && latestVideo.upload_video) ? (
                                            <video className='w-full md:h-96 object-cover border border-gray-300 rounded-md' poster={BACKEND_URL+'assets/images/posters/'+latestVideo.poster} controls controlsList="download">
                                                <source src={BACKEND_URL+'assets/videos/'+latestVideo.upload_video}/>
                                            </video>
                                        ) : (
                                            <iframe title={latestVideo.video_title} className='w-full md:h-96 rounded-md' src={latestVideo.upload_video_url}></iframe>  
                                        )}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 md:grid-cols-6 gap-4 my-3.5 bg-white p-2 rounded-md shadow'>
                                    {seasons.map((data,id)=>{
                                        return(<Fragment key={id}>
                                            <Link to={`/${category}/${tvShows}/season/${data.seasons}`}><Button variant="contained" fullWidth startIcon={<PlayCircle/>}>Season {data.seasons}</Button></Link>
                                        </Fragment>)
                                    })}
                                </div>
                                {tvChannelVideo.length > 0 ? (
                                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 rounded-md shadow-md'>
                                        {tvChannelVideo.map((data,id)=>{
                                            return(<Fragment key={id}>
                                                <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                    <div className='px-4 pt-2 pb-1'>
                                                        <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                        <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                            <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                            <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                        </div>
                                                    </div>
                                                    <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full md:h-44' alt='vide_poster'/>
                                                    <div className={'p-3'}>
                                                        <Link to={`/${category}/${data.sub_category_slug}/${data.video_slug}`}>
                                                            <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-xs md:text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Fragment>)
                                        })}
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center h-[80vh]'>
                                        <Typography variant='h3' className='uppercase tracking-wider font-bold'>Sorry! No Vidos Found</Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default TVShowsContentList