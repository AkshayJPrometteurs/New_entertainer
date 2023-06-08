import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider';
import AxiosClient from '../../components/AxiosClient';
import Loader from '../../components/Loader';
import CustomDivider from '../../components/helpers/CustomDivider';
import { PlayCircle } from '@mui/icons-material';

const CategoryVideos = () => {
    const { category } = useParams();
    const { APPNAME, BACKEND_URL } = useStateContext();
    document.title = (APPNAME+category).toUpperCase();
    const [loader, setLoader] = useState(false);
    const [forTitle, setForTitle] = useState('');
    const [categories, setCategories] = useState([]);
    const [tvChannels, setTVChannels] = useState([]);
    const [latestVideos, setLatestVideos] = useState([]);
    const [popularVideos, setPopularVideos] = useState([]);
    const [trendingVideos, setTrendingVideos] = useState([]);
    const getCategoryWiseData = () => {
        setLoader(true)
        AxiosClient.get(`/get_category_wise_data/${category}`)
        .then(({data})=>{
            setLoader(false)
            setForTitle(data.data.forTitle)
            setCategories(data.data.categories)
            setTVChannels(data.data.tvChannels)
            setLatestVideos(data.data.latestVideos)
            setPopularVideos(data.data.popularVideos)
            setTrendingVideos(data.data.trendingVideos)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{getCategoryWiseData()},[category])
    return (
        <Fragment>
            {loader ? (<Loader/>) : (
                <div className='px-5 py-4'>
                    <div className='flex flex-col md:flex-row gap-6'>
                        <div className='w-full md:w-[77%]'>
                            <div>
                                <CustomDivider content={`Latest ${forTitle && forTitle.category_name}`}/>
                                <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 my-4'>
                                    {latestVideos.map((data,id)=>{
                                        return(<Fragment key={id}>
                                            {data.seasons === null ? (
                                                <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                    <div className='px-4 pt-2 pb-1'>
                                                        <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                        <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                            <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                            <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                        </div>
                                                    </div>
                                                    <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-32' alt='vide_poster'/>
                                                    <div className={'p-3'}>
                                                        <Link to={`/movies/${data.sub_category_slug}/${data.video_slug}`}>
                                                            <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Link to={`/${category}/videos/${data.tv_shows}`} className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                    <img src={BACKEND_URL+'assets/images/AllShows/'+data.shows_image} className='w-full h-60 rounded-md' alt='vide_poster'/>
                                                </Link>
                                            )}
                                        </Fragment>)
                                    })}
                                </div>
                            </div>
                            {(popularVideos.length > 0) && (
                                <div>
                                    <CustomDivider content={`Popular ${forTitle && forTitle.category_name}`}/>
                                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 my-4'>
                                        {popularVideos.map((data,id)=>{
                                            return(<Fragment key={id}>
                                                {data.seasons === null ? (
                                                    <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                        <div className='px-4 pt-2 pb-1'>
                                                            <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                            <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                            </div>
                                                        </div>
                                                        <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-32' alt='vide_poster'/>
                                                        <div className={'p-3'}>
                                                            <Link to={`/movies/${data.sub_category_slug}/${data.video_slug}`}>
                                                                <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link to={`/${category}/videos/${data.tv_shows}`} className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                        <img src={BACKEND_URL+'assets/images/AllShows/'+data.shows_image} className='w-full h-60 rounded-md' alt='vide_poster'/>
                                                    </Link>
                                                )}
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                            )}
                            {(trendingVideos.length > 0) && (
                                <div>
                                    <CustomDivider content={`Trending ${forTitle && forTitle.category_name}`}/>
                                    <div className='grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-6 my-4'>
                                        {trendingVideos.map((data,id)=>{
                                            return(<Fragment key={id}>
                                                {data.seasons === null ? (
                                                    <div className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                        <div className='px-4 pt-2 pb-1'>
                                                            <h1 className='font-bold text-center tracking-wider h-6 overflow-hidden'>{data.video_title}</h1>
                                                            <div className='flex items-center justify-center w-full gap-3 my-2'>
                                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white whitespace-nowrap bg-gray-200 rounded-md py-1'>{data.duration}</h1>
                                                                <h1 className='text-xs px-2 uppercase text-black group-hover:bg-white bg-gray-200 rounded-md py-1'>{data.language}</h1>
                                                            </div>
                                                        </div>
                                                        <img src={BACKEND_URL+'assets/images/posters/'+data.poster} className='w-full h-32' alt='vide_poster'/>
                                                        <div className={'p-3'}>
                                                            <Link to={`/movies/${data.sub_category_slug}/${data.video_slug}`}>
                                                                <div className='tracking-wider text-center bg-primaryColor text-white shadow-md rounded-md py-1.5 text-sm group-hover:bg-white group-hover:text-primaryColor flex items-center gap-2 justify-center' fullWidth><PlayCircle/> Watch Now!</div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <Link to={`/${category}/videos/${data.tv_shows}`} className='hover:scale-105 hover:transition-all hover:delay-300 cursor-pointer border border-gray-300 hover:bg-primaryColor hover:text-white group rounded-md shadow-md bg-white'>
                                                        <img src={BACKEND_URL+'assets/images/AllShows/'+data.shows_image} className='w-full h-60 rounded-md' alt='vide_poster'/>
                                                    </Link>
                                                )}
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='w-full md:w-[23%]'>
                            <CustomDivider content={`Search ${(forTitle && forTitle.category_name)} By`}/>
                            <div className='bg-white rounded-md p-3 my-4'>
                                <h1 className='text-center uppercase text-sm font-bold tracking-wider mb-2'>Categories</h1>
                                <div className='grid grid-cols-3 md:grid-cols-2 gap-3'>
                                    {categories.map((data, id)=>{
                                        return(<Fragment key={id}>
                                            <Link to={`/${category}/${data.sub_category_slug}`} className='bg-white border border-gray-300 p-2 rounded-md shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-150 flex items-center justify-center'>{data.sub_category_name}</Link>
                                        </Fragment>)
                                    })}
                                </div>
                            </div>
                            {(category && category === 'tv-shows') && (
                                <div className='bg-white rounded-md p-3 my-4'>
                                    <h1 className='text-center uppercase text-sm font-bold tracking-wider mb-2'>TV Channels</h1>
                                    <div className='grid grid-cols-3 md:grid-cols-2 gap-3'>
                                        {tvChannels.map((data, id)=>{
                                            return(<Fragment key={id}>
                                                <Link to={`/${category}/tv-channel/${data.tv_channel_slug}`} className='bg-white border border-gray-300 p-2 rounded-md shadow-md hover:bg-primaryColor hover:border-none cursor-pointer hover:text-white uppercase tracking-widest text-xs text-center transition-all delay-150 flex items-center justify-center'>{data.tv_channel_name}</Link>
                                            </Fragment>)
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default CategoryVideos