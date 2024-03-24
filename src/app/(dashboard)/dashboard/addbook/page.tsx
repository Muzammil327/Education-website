'use client'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function QuizQuestionForm() {
  const router = useRouter()

  const [data, setData] = useState({
    title: '',
    descripton: '',
  })

  const SubmitHandle = async (e: any) => {
    e.preventDefault()
    const { title, descripton } = data

    const URL = `http://localhost:8000/api/post/mcqs/book`
    try {
      const res = await axios.post(URL, data)

      if (res.data.error) {
        toast.error(res.data.error)
        console.log(res.data.error)
      } else {
        toast.success(res.data.message)
        setData({
          title: '',
          descripton: '',
        })
        router.push('/dashboard')
      }
    } catch (error) {
      console.log(error)
      toast.warning('Error during Task Update')
    }
  }

  return (
    <div className="mb-8 mt-20">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Book Add Here
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          If any question answer is tick incorrect plz comment.
        </p>
      </div>
      <form onSubmit={SubmitHandle} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2.5">
              <input
                placeholder="Title"
                value={data.title}
                type="text"
                onChange={(e) => setData({ ...data, title: e.target.value })}
                autoFocus
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                placeholder="Descripton"
                value={data.descripton}
                onChange={(e) =>
                  setData({ ...data, descripton: e.target.value })
                }
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit Here
          </button>
        </div>
      </form>
    </div>
  )
}