'use client';
import { Formik, Form, Field } from 'formik';
import Image from 'next/image';
import { useState } from 'react';
import * as Yup from 'yup';

interface FormValues {
  billAmount: number;
  billAmountNumeric: number | '';
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
        <Formik<FormValues>
          initialValues={{
            billAmount: 0,
            billAmountNumeric: 0,
            tip: '',
            numberOfPeople: 0,
          }}
          validationSchema={Yup.object({
            billAmountNumeric: Yup.number()
              .typeError('Please enter a valid number')
              .min(1, 'Amount must be at least 1')
              .max(1000000, 'Amount is too high')
              .required('Bill amount is required'),
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
              .typeError('Please enter a valid number')
              .min(1, "Can't be zero")
              .required('Required'),
          })}
          onSubmit={(values) => {
            console.log('Tip Selected:', values.tip);
          }}
        >
          {({
            values,
            handleChange,
            errors,
            setTouched,
            touched,
            setFieldValue,
            resetForm,
          }) => {
            const handleTipSelect = (value: string) => {
              setFieldValue('tip', value);
              setSelectedTip(value);
            };

            return (
              <Form className='sm:flex sm:gap-8'>
                <div className='sm:w-1/2'>
                  <div className='my-4'>
                    <div className='flex justify-between items-center'>
                      <label
                        htmlFor='billAmount'
                        className='text-dark-grayish-cyan my-1'
                      >
                        Bill
                      </label>
                      <div>
                        {touched.billAmountNumeric &&
                          errors.billAmountNumeric && (
                            <p className='text-red-500 text-sm mt-1'>
                              {errors.billAmountNumeric}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='relative'>
                      <img
                        src='/icon-dollar.svg'
                        alt='dollar icon'
                        className='absolute top-4 left-4'
                      />
                      <Field
                        type='text'
                        name='billAmount'
                        placeholder='0'
                        className='w-full h-10 px-4 my-1 rounded-md bg-very-light-grayish-cyan text-dark-cyan text-2xl text-right focus:outline-strong-cyan'
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const rawValue = e.target.value.replace(/\D/g, '');
                          const numericValue = rawValue ? Number(rawValue) : 0;
                          const formattedValue = numericValue
                            ? new Intl.NumberFormat().format(numericValue)
                            : '';

                          setFieldValue('billAmount', formattedValue);
                          setFieldValue('billAmountNumeric', numericValue);
                          setTouched({ billAmountNumeric: true });
                        }}
                      />
                    </div>
                  </div>
                  <div className='mb-5'>
                    <label className='text-dark-grayish-cyan my-1'>
                      Select Tip %
                    </label>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 mb-2'>
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
                          type='text'
                          name='tip'
                          placeholder='Custom'
                          className={`bg-very-light-grayish-cyan px-1 w-full max-w-[202px] sm:w-[97.6px] text-right text-dark-cyan h-12 text-2xl rounded-[5px] focus:outline-strong-cyan ${
                            errors.tip ? 'border border-red-500 ' : ''
                          }`}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setSelectedTip('');
                            handleChange(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className='h-2 mb-4'>
                      {touched.tip && errors.tip && (
                        <span className='text-red-500 text-sm '>
                          {errors.tip}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className='my-4'>
                    <div className='flex justify-between items-center'>
                      <label
                        htmlFor='numberOfPeople'
                        className='text-dark-grayish-cyan my-1'
                      >
                        Number of People
                        {}
                      </label>
                      <div>
                        {touched.numberOfPeople && errors.numberOfPeople && (
                          <span className='text-red-500 text-sm mt-1'>
                            {errors.numberOfPeople}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className='relative'>
                      <img
                        src='/icon-person.svg'
                        alt='people-icon'
                        className='absolute top-4 left-4'
                      />
                      <Field
                        type='text'
                        name='numberOfPeople'
                        placeholder='0'
                        className={`w-full h-10 px-4 my-1 rounded-md bg-very-light-grayish-cyan text-dark-cyan text-2xl text-right  focus:outline-strong-cyan ${
                          errors.numberOfPeople ? 'border border-red-500 ' : ''
                        }`}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const inputValue = e.target.value;
                          const formattedValue = inputValue.replace(/\D/g, '');

                          setFieldValue('numberOfPeople', formattedValue);
                        }}
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
                                (Number(values.billAmountNumeric) *
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
                                (Number(values.billAmountNumeric) +
                                  Number(values.billAmountNumeric) *
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
                    className='w-full bg-strong-cyan  text-dark-cyan text-lg py-2 mt-4 rounded-[5px]'
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
