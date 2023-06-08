import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CustomDivider from '../../components/helpers/CustomDivider'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import { Typography } from '@mui/material'
import Loader from '../../components/Loader'

const TVChannelVideos = () => {
    const { category, tvChannel } = useParams()
    const { APPNAME, BACKEND_URL } = useStateContext()
    document.title = (APPNAME+tvChannel+'-'+category).toUpperCase()
    const [loader, setLoader] = useState()
    const [tvChannelVideo, setTVChannelVideo] = useState([])
    const [tvChannels, setTVChannels] = useState([])
    const getTVChannelVideoList = () => {
        setLoader(true);
        AxiosClient.get(`/get_tv_channel_video_lists/${category}/${tvChannel}`)
        .then(({data})=>{
            setLoader(false)
            setTVChannelVideo(data.videos)
            setTVChannels(data.tvChannels)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getTVChannelVideoList()},[category, tvChannel])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='px-5 py-4'>
                    <div className='flex flex-col-reverse md:flex-row gap-2 md:gap-6'>
                        <div className='w-full md:w-[78%]'>
                            <CustomDivider content={category.replace('-',' ')+' - '+tvChannel.replace('-', ' ')}/>
                            <div className='my-4'>
                                {tvChannelVideo.length > 0 ? (
                                    <div className='grid grid-cols-3 md:grid-cols-5 gap-3 md:gap-6'>
                                        {tvChannelVideo.map((data,id)=>{
                                            return(<Fragment key={id}>
                                                <Link to={`/${category}/videos/${data.tv_shows}`} className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                    <img src={BACKEND_URL+'assets/images/TVShows/'+data.tv_shows_image} className='w-full h-60' alt='vide_poster'/>
                                                </Link>
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
                        <div className='w-full md:w-[22%]'>
                            <CustomDivider content={'Search '+category+' By'}/>
                            <div className='bg-white rounded-md p-3 my-4'>
                                <h1 className='text-center font-bold tracking-wider mb-2 uppercase text-sm'>TV Channels</h1>
                                <div className='grid grid-cols-3 md:grid-cols-2 gap-3'>
                                    {tvChannels.map((data, id)=>{
                                        return(<Fragment key={id}>
                                            {tvChannel !== data.tv_channel_slug && (
                                                <Link to={`/${category}/tv-channel/${data.tv_channel_slug}`} className={'border border-gray-300 p-2 rounded-md shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-150 flex items-center justify-center '+(tvChannel === data.tv_channel_slug ? 'bg-primaryColor text-white' : 'bg-white')}>{data.tv_channel_name}</Link>
                                            )}
                                        </Fragment>)
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default TVChannelVideos