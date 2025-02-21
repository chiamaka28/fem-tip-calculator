'use client';
import { Formik, Form, Field } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import * as Yup from 'yup';

interface FormValues {
  billAmount: number;
  tip: string;
  numberOfPeople: number;
}

const Card = () => {
  const [selectedTip, setSelectedTip] = useState('');

  return (
    <div className='h-full flex flex-col justify-center items-center'>
      <div>
        <Image src='/logo.svg' alt='logo' width={80} height={80} />
      </div>
      <main className='bg-white w-full rounded-xl mt-12 px-7 py-4 md:w-[740px] '>
        <Formik
          initialValues={{
            billAmount: 0,
            tip: '',
            numberOfPeople: 0,
          }}
          validationSchema={Yup.object({
            billAmount: Yup.number()
              .positive('Must be greater than zero')
              .required('Required'),
            tip: Yup.string().test(
              'is-valid-tip',
              'Please select a valid tip percentage',
              (value) => {
                if (!value) return false;
                if (['5', '10', '15', '25', '50'].includes(value)) return true;
                return (
                  !isNaN(Number(value)) &&
                  Number(value) >= 1 &&
                  Number(value) <= 100
                );
              }
            ),
            numberOfPeople: Yup.number()
              .positive('Must be at least 1')
              .integer('Must be a whole number')
              .required('Required'),
          })}
          onSubmit={(values) => {
            console.log('Tip Selected:', values.tip);
          }}
        >
          {({ values, handleChange, handleBlur, setFieldValue, resetForm }) => {
            const handleTipSelect = (value: string) => {
              setFieldValue('tip', value);
              setSelectedTip(value);
            };

            return (
              <Form className='sm:flex sm:gap-8'>
                <div className='sm:w-1/2'>
                  <div className='my-4'>
                    <label
                      htmlFor='billAmount'
                      className='text-dark-grayish-cyan my-1'
                    >
                      Bill
                    </label>
                    <div className='relative'>
                      <img
                        src='/icon-dollar.svg'
                        alt='dollar icon'
                        className='absolute top-4 left-4'
                      />
                      <Field
                        type='number'
                        name='billAmount'
                        placeholder='0'
                        className='w-full h-10 px-4 my-1 rounded-md bg-very-light-grayish-cyan text-dark-cyan text-2xl text-right focus:outline-strong-cyan'
                      />
                    </div>
                  </div>
                  <div>
                    <label className='text-dark-grayish-cyan my-1'>
                      Select Tip %
                    </label>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 my-4'>
                      {['5', '10', '15', '25', '50'].map((tip) => (
                        <button
                          key={tip}
                          type='button'
                          className={`h-12 text-2xl rounded-[5px] ${
                            selectedTip === tip
                              ? 'bg-strong-cyan text-dark-cyan'
                              : 'bg-dark-cyan text-white'
                          }`}
                          onClick={() => handleTipSelect(tip)}
                        >
                          {tip}%
                        </button>
                      ))}
                      <div className='items-stretch'>
                        <Field
                          type='number'
                          name='tip'
                          placeholder='Custom'
                          className={`bg-very-light-grayish-cyan px-1 w-[202px] sm:w-[97.6px] text-right text-dark-cyan h-12 text-2xl rounded-[5px] focus:outline-strong-cyan ${
                            values.tip &&
                            !['5', '10', '15', '25', '50'].includes(values.tip)
                              ? 'border border-red-500'
                              : ''
                          }`}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setSelectedTip(''); // Reset button selection
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='my-4'>
                    <label
                      htmlFor='numberOfPeople'
                      className='text-dark-grayish-cyan my-1'
                    >
                      Number of People
                    </label>
                    <div className='relative'>
                      <img
                        src='/icon-person.svg'
                        alt='people-icon'
                        className='absolute top-3 left-4'
                      />
                      <Field
                        type='number'
                        name='numberOfPeople'
                        placeholder='0'
                        className='w-full h-10 px-4 my-1 rounded-md bg-very-light-grayish-cyan text-dark-cyan text-2xl text-right focus:outline-strong-cyan'
                      />
                    </div>
                  </div>
                </div>

                <div className='bg-dark-cyan rounded-xl sm:flex sm:flex-col sm:justify-between px-6 py-6 sm:w-1/2'>
                  <div>
                    <div className='flex justify-between items-center my-4'>
                      <div>
                        <p className='text-white'>Tip Amount</p>
                        <span className='text-grayish-cyan text-xs'>
                          / person
                        </span>
                      </div>
                      <div>
                        <p className='text-strong-cyan text-4xl'>
                          $
                          {values.billAmount &&
                          values.tip &&
                          values.numberOfPeople
                            ? (
                                (Number(values.billAmount) *
                                  (Number(values.tip) / 100)) /
                                Number(values.numberOfPeople)
                              ).toFixed(2)
                            : '0.00'}
                        </p>
                      </div>
                    </div>

                    <div className='flex justify-between items-center my-4'>
                      <div>
                        <p className='text-white'>Total</p>
                        <span className='text-grayish-cyan text-xs'>
                          / person
                        </span>
                      </div>
                      <div>
                        <p className='text-strong-cyan text-4xl'>
                          $
                          {values.billAmount &&
                          values.tip &&
                          values.numberOfPeople
                            ? (
                                (Number(values.billAmount) +
                                  Number(values.billAmount) *
                                    (Number(values.tip) / 100)) /
                                Number(values.numberOfPeople)
                              ).toFixed(2)
                            : '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RESET Button */}
                  <button
                    type='button'
                    onClick={() => {
                      resetForm();
                      setSelectedTip(''); // Reset selected tip state
                    }}
                    className='w-full bg-strong-cyan text-dark-cyan text-lg py-2 mt-4 rounded-[5px]'
                  >
                    RESET
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
};

export default Card;
