import { DoNotDisturb, Upgrade } from '@mui/icons-material'
import { Button, Chip, Divider, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { useStateContext } from '../../contexts/ContextProvider'
import AxiosClient from '../../components/AxiosClient'
import flasher from '@flasher/flasher'
import Swal from 'sweetalert2'
import { MdWorkspacePremium } from 'react-icons/md';
import CustomDivider from '../../components/CustomDivider'

const Profile = () => {
    const { APPNAME, currentUser, BACKEND_URL, FRONTEND_URL } = useStateContext()
    document.title = APPNAME+'Profile'
    const [loader, setLoader] = useState(false)
    const [errors, setErrors] = useState([])
    const [formInfo, setFormInfo] = useState({
        user_id : currentUser.id || '',
        name : currentUser.name || '',
        email : currentUser.email || '',
        gender : currentUser.gender || '',
        mobile : currentUser.mobile || '',
        dob : currentUser.dob || '',
    })
    const handleProfileChange = (e) => {setFormInfo({...formInfo, [e.target.name]:e.target.value})}
    const [profileImage, setProfileImage] = useState(currentUser.profile_image);
    const handleProfileImageChange = (e) =>{setProfileImage(e.target.files[0])}
    const handleProfileSubmit = async(e) => {
        e.preventDefault()
        setLoader(true)
        const formData = new FormData();
        formData.append('user_id', formInfo.user_id)
        formData.append('name', formInfo.name)
        formData.append('email', formInfo.email)
        formData.append('gender', formInfo.gender)
        formData.append('mobile', formInfo.mobile)
        formData.append('dob', formInfo.dob)
        formData.append('profile_image', profileImage)
        await AxiosClient.post('profile_update', formData)
        .then(({data})=>{
            setLoader(false)
            flasher.success(data.msg)
        })
        .catch(({response})=>{
            setLoader(false)
            setErrors(response.data.errors)
        })
    }
    const handleSubscriptionCancel = () =>{
        Swal.fire({
            title: 'Do you want to cancel subscription?',
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: 'Yes, Sure',
            confirmButtonColor: '#1a56db',
            cancelButtonColor: 'red',
            cancelButtonText: 'No, Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                
            }
        })
    }
    return (
        <Fragment>
            <div className='p-8 flex flex-col justify-center items-center md:h-screen md:flex-row gap-6'>
                <Paper className='w-full md:w-[30%] md:h-[28rem] px-6 pt-4 pb-6' sx={{ backgroundColor: "primary.paperBG" }}>
                    <Divider sx={{"&::before, &::after": {borderColor: "secondary.main"}}}><Chip color='secondary' label="Subscription Details" /></Divider>
                    <div className='text-center tracking-wider md:my-4 text-white'>
                        <MdWorkspacePremium color='#fff' className='text-7xl md:text-8xl w-full mb-4'/>
                        <h1 className='text-base md:text-xl uppercase font-bold mb-1 md:mb-5'>Entertainer</h1>
                        <h1 className='text-2xl md:text-4xl uppercase font-bold tracking-widest mb-2 md:mb-5'>Premium</h1>
                        <div className='grid grid-cols-2 gap-2 text-sm uppercase font-bold tracking-widest my-5 md:my-10'>
                            <div>
                                <h1>Registered No</h1>
                                <h1 className='mt-0.5'>{currentUser && currentUser.mobile}</h1>
                            </div>
                            <div>
                                <h1>Expired On</h1>
                                <h1 className='mt-0.5'>12-12-2025</h1>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <Button variant='contained' color='secondary' className='flex items-center gap-2'>
                                <Upgrade/>
                                <span className='tracking-wider'>Upgrade</span>
                            </Button>
                            <Button onClick={handleSubscriptionCancel} variant='contained' color='secondary' className='flex items-center gap-2'>
                                <DoNotDisturb/>
                                <span className='tracking-wider'>Cancel</span>
                            </Button>
                        </div>
                    </div>
                </Paper>
                <Paper className='w-full md:w-2/5 md:h-[28rem] px-6 py-6 pt-4'>
                    <CustomDivider content={'Profile Details'}/>
                    <form onSubmit={handleProfileSubmit} className='mt-6'>
                        <div className='flex flex-col md:flex-row text-sm md:text-base gap-4 mb-4 md:mb-6'>
                            <div className='w-full md:w-[50%] flex flex-col gap-5 md:gap-6'>
                                <TextField size='small' label="Name" type='text' name='name' id='name' value={formInfo.name} fullWidth onChange={handleProfileChange} error={errors.name && true}/>
                                <div>
                                    <TextField size='small' label="Email" type='email' name='email' id='email' value={formInfo.email} fullWidth onChange={handleProfileChange} error={errors.email && true}/>
                                    {(errors && errors.email) && (<p className='mt-1 text-sm text-red-600'>{errors.email}</p>)}
                                </div>
                                <div>
                                    <FormControl fullWidth>
                                        <InputLabel id="gender" size='small' error={errors.gender && true}>Gender</InputLabel>
                                        <Select displayEmpty fullWidth size='small' labelId="gender" label="Gender" name='gender' value={formInfo.gender} onChange={handleProfileChange} error={errors.gender && true}>
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div>
                                    <TextField size='small' label="Mobile No." type='text' name='mobile' id='mobile' InputLabelProps={{ maxLength : 10 }} value={formInfo.mobile} fullWidth onChange={handleProfileChange} error={errors.mobile && true}/>
                                    {(errors && errors.mobile) && (<p className='mt-1 text-sm text-red-600'>{errors.mobile}</p>)}
                                </div>
                                <TextField size='small' label="Birth Date" type='date' name='dob' id='dob' value={formInfo.dob} fullWidth InputLabelProps={{ shrink: true }} onChange={handleProfileChange} error={errors.dob && true}/>
                            </div>
                            <div className='w-full md:w-[50%]'>
                                <img src={
                                    profileImage ? (
                                        profileImage.name ? (
                                            URL.createObjectURL(profileImage)
                                        ) : (
                                            BACKEND_URL+'assets/images/ProfileImages/'+currentUser.profile_image
                                        )
                                    ) : (
                                        FRONTEND_URL+'assets/images/noimage.png'
                                    )
                                } alt="profile-img" className='w-full rounded h-60 mb-2' />
                                <TextField fullWidth size='small' inputProps={{
                                    style: {
                                        fontSize: 14,
                                        padding : '6px 6px 12px 7px'
                                    }
                                }} type='file' onChange={handleProfileImageChange}/>
                            </div>
                        </div>
                        <Button type='submit' fullWidth variant='contained'>Update Profile</Button>
                    </form>
                </Paper>
            </div>
        </Fragment>
    )
}

export default Profile