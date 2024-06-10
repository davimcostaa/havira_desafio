import React from 'react';
import { useSelector } from 'react-redux';
import Input from './Input';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Form = () => {

  const isOpen = useSelector((state) => state.form.isOpen);

  if (!isOpen) return null;

  
  const schema = yup.object({
    name: yup.string().required().min(5),
    phone: yup.string().required().min(5),
    email: yup.string().email().required(),
    street: yup.string().required(),
    number: yup.string().required(),
    city: yup.string().required(),
    zip: yup.string().required(),

  }).required();

  const { register, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = data => console.log(data);

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-primaryGray bg-opacity-50'>
      <div className='bg-secondaryGray w-2/6 h-5/6 text-white p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-4'>Cadastro de usuários</h2>
       
        <form className='flex flex-col h-full gap-3' onSubmit={handleSubmit(onSubmit)}>

              <Input label='Nome completo' name='name' register={register} error={errors.name}  />
              <Input label='Email' type='email' register={register} name='email' error={errors.email}  />
              <Input label='Telefone' register={register} name='phone' error={errors.phone}  />

              <div className='flex w-full justify-between'>
                  <Input label='Rua' register={register} name='street' error={errors.street} />
                  <Input label='Número' small register={register} name='number' error={errors.number}  />
              </div>

              <div className='flex w-full justify-between'>
                  <Input label='Cidade' register={register} name='city'  error={errors.city}  />
                  <Input label='Código postal' small register={register} name='zip' error={errors.zip}  />
              </div>


              <button 
                  className='bg-primaryGray w-44 p-2 rounded-lg'
                  type='submit'
                  > 
                Adicionar
              </button>

        </form>

      </div>
    </div>
  );
};

export default Form;
