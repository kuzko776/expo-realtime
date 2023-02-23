import Image from 'next/image'
import { Inter } from '@next/font/google'
import qr from '../img/qr.png'
import React, { useState, useEffect } from 'react';

import { getDatabase, ref, onChildAdded, onChildChanged, onChildRemoved } from "firebase/database";
import database from '../firebase'

const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const usersRef = ref(database, 'users')

  // const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [present, setPresent] = useState(0);
  const [latest, setLatest] = useState(null);


  useEffect(() => {
    const local = []

    const cal = () => {
      var counter = 0;
      local.forEach((user) => {
        if (user.val().checked_in)
          counter++
      })

      setCount(local.length)
      setPresent(counter)

    }

    onChildAdded(usersRef, (data) => {

      local.push(data)
      //setUsers(local)
      cal()
    });

    onChildChanged(usersRef, (data) => {
      const index = local.findIndex((user) => user.key == data.key);
      local[index] = data

      setLatest(data)
      //setUsers(local)

      cal()
    })
  }, [])



  return (
    <>
      <section className="h-auto bg-white">
        <div className="px-10 py-4 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-center">
            <h1 className="mb-6 text-5xl font-extrabold leading-none max-w-5xl mx-auto tracking-normal text-gray-900 sm:text-6xl md:text-6xl lg:text-7xl md:tracking-tight">
              {" "}
              امسح{" "}
              <span className="w-full text-transparent pr-1 bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 lg:inline">
                وأربح
              </span>{" "}
              مع
              <br className="block " /> DARVET دارفيت{" "}
            </h1>
            <p className="px-0 mb-6 text-lg text-gray-600 md:text-xl lg:px-24">
              {" "}
              قم بمسح الرمز بكاميرا الجوال والتسجيل لربح جوائز قيمة من شركة دارفيت{" "}
            </p>
          </div>
        </div>
      </section>
      {/* Section 2 */}
      <section className="box-border  leading-7 text-gray-900 bg-white border-0 border-gray-200 border-solid ">
        <div className="box-border max-w-6xl px-4 pb-12 mx-auto border-solid sm:px-6 md:px-6 lg:px-4">
          <div className="flex flex-col items-center leading-7 text-center text-gray-900">
            <h2 className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl">
              مرحباً بك
            </h2>
            <p className="box-border mt-4 text-6xl leading-normal text-gray-900 border-solid">
              {latest?.val().name}
            </p>
          </div>
          <div className="grid max-w-md mx-auto mt-6 overflow-hidden leading-7 text-gray-900 border border-b-4 border-gray-300 border-blue-600 rounded-xl md:max-w-lg lg:max-w-none sm:mt-10 lg:grid-cols-3">
            <div className="box-border px-4 py-8 mb-6 text-center bg-white border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                الحضور في جناح دارفيت
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                عدد الحاضرين الذين استلموا جوائز
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  {present}
                </p>
              </div>
            </div>
            <div className="box-border px-4 py-8 mb-6 text-center bg-gray-100 border border-gray-300 border-solid lg:mb-0 sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                سجل الآن
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                قم بمسح الرمز بكاميرا الجوال والتسجيل لربح جوائز قيمة من شركة دارفيت
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <Image src={qr} alt='QR' />

              </div>
            </div>
            <div className="box-border px-4 py-8 text-center bg-white border-solid sm:px-4 sm:py-8 md:px-8 md:py-12 lg:px-10">
              <h3 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-solid sm:text-3xl md:text-4xl">
                عدد المشتركين
              </h3>
              <p className="mt-3 leading-7 text-gray-900 border-0 border-solid">
                عدد المسجلين في الجائزة الكبرى
              </p>
              <div className="flex items-center justify-center mt-6 leading-7 text-gray-900 border-0 border-solid sm:mt-8">
                <p className="box-border m-0 text-6xl font-semibold leading-normal text-center border-0 border-gray-200">
                  {count}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
