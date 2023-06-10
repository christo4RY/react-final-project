import React, { useState } from 'react'
import { PasswordInput, TextInput, Button, Loader } from '@mantine/core'
import { MdAlternateEmail } from "react-icons/md"
import { Si1Password } from "react-icons/si"
import { FcBusinessContact } from "react-icons/fc"
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import InputError from '../../components/errors/InputError'
import { useGetUserMutation } from '../../store/api/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAuth } from '../../store/slices/authSlice'

const schema = yup.object({
    email:yup.string().required(),
    password:yup.string().min(6).required()
})
const SignUp = () => {
    const [getUser,{isLoading}] = useGetUserMutation()
    const dispatch = useDispatch()
    const [error,setError] = useState('')

    const nav = useNavigate()
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver:yupResolver(schema)
    })
    const onSubmit = async (data) => {
        const {data:res} = await getUser(data)
        if(res.success){
          dispatch(addAuth(res))
          nav('/dashboard')
        }else{
          setError(res.message)
        }
    }
  return (
    <div>
      <h1 className='text-purple-600 mb-3 text-2xl uppercase text-center font-bold'>Sign Up</h1>
      <div className='w-full p-6 py-7 rounded  md:w-1/2 lg:w-1/3 mx-auto shadow-lg'>
        <form onSubmit={handleSubmit(onSubmit)} className=' flex flex-col'>
            <TextInput {...register('email')}  label="Email" placeholder='email' icon={<MdAlternateEmail size="0.8rem"/>}/>
            <InputError message={errors.email?.message ?? error}/>
            <PasswordInput {...register('password')} className='mt-3' label="Password" placeholder='password' icon={<Si1Password size="0.8rem"/>}/>
            <InputError message={errors.password?.message}/>
            { isLoading && <Loader size="sm" className="mt-2 self-end  hover:bg-purple-500 duration-100 transition-colors hover:border-0 hover:text-white border-purple-600 text-purple-600  text-sm" variant="bars" />
            }
            {
              !isLoading &&
              <Button type='submit' variant="outline" size='xs' className='mt-2 self-end  hover:bg-purple-500 duration-100 transition-colors hover:border-0 hover:text-white border-purple-600 text-purple-600  text-sm' leftIcon={<FcBusinessContact size="1.3rem" />}>
               Sign Up
              </Button>
            }
        </form>
      </div>
    </div>
  )
}

export default SignUp
